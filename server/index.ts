import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { createClient } from '@libsql/client';
import jobsRouter from './routes/jobs';
import applicationsRouter from './routes/applications';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: process.env.NODE_ENV === 'production'
        ? true
        : ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true
}));
app.use(express.json());

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../dist')));
}

// Initialize Turso client
export const tursoClient = createClient({
    url: process.env.TURSO_DB_URL || '',
    authToken: process.env.TURSO_AUTH_TOKEN || '',
});

// Initialize database tables
async function initializeDatabase() {
    try {
        // Create jobs table
        await tursoClient.execute(`
            CREATE TABLE IF NOT EXISTS jobs (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                department TEXT NOT NULL,
                location TEXT NOT NULL,
                type TEXT NOT NULL,
                description TEXT NOT NULL,
                requirements TEXT NOT NULL,
                responsibilities TEXT,
                salary_range TEXT,
                is_active INTEGER DEFAULT 1,
                posted_date TEXT DEFAULT (datetime('now')),
                updated_date TEXT DEFAULT (datetime('now'))
            )
        `);

        // Create applications table
        await tursoClient.execute(`
            CREATE TABLE IF NOT EXISTS applications (
                id TEXT PRIMARY KEY,
                job_id TEXT NOT NULL,
                applicant_name TEXT NOT NULL,
                applicant_email TEXT NOT NULL,
                applicant_phone TEXT NOT NULL,
                resume_url TEXT NOT NULL,
                cover_letter TEXT,
                status TEXT DEFAULT 'pending',
                applied_date TEXT DEFAULT (datetime('now')),
                FOREIGN KEY (job_id) REFERENCES jobs(id)
            )
        `);

        console.log('Database tables initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

// Routes
app.use('/api/jobs', jobsRouter);
app.use('/api/applications', applicationsRouter);

// Admin authentication endpoint
app.post('/api/admin/login', (req, res) => {
    const { password } = req.body;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (password === adminPassword) {
        res.json({ success: true, message: 'Login successful' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid password' });
    }
});

// Health check
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Serve React app for all other routes in production (SPA catch-all)
if (process.env.NODE_ENV === 'production') {
    app.get('*', (_req, res) => {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    });
}

// Start server
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await initializeDatabase();
});
