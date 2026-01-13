import { Router } from 'express';
import { tursoClient } from '../index';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get all active jobs (public)
router.get('/active', async (req, res) => {
    try {
        const result = await tursoClient.execute(
            'SELECT * FROM jobs WHERE is_active = 1 ORDER BY posted_date DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching active jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

// Get all jobs (admin)
router.get('/', async (req, res) => {
    try {
        const result = await tursoClient.execute(
            'SELECT * FROM jobs ORDER BY posted_date DESC'
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching all jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

// Get single job by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await tursoClient.execute({
            sql: 'SELECT * FROM jobs WHERE id = ?',
            args: [id]
        });

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching job:', error);
        res.status(500).json({ error: 'Failed to fetch job' });
    }
});

// Create new job
router.post('/', async (req, res) => {
    try {
        const {
            title,
            department,
            location,
            type,
            description,
            requirements,
            responsibilities,
            salary_range,
            is_active = true
        } = req.body;

        const id = uuidv4();
        const now = new Date().toISOString();

        await tursoClient.execute({
            sql: `INSERT INTO jobs (id, title, department, location, type, description, requirements, responsibilities, salary_range, is_active, posted_date, updated_date)
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            args: [id, title, department, location, type, description, requirements, responsibilities || null, salary_range || null, is_active ? 1 : 0, now, now]
        });

        const result = await tursoClient.execute({
            sql: 'SELECT * FROM jobs WHERE id = ?',
            args: [id]
        });

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ error: 'Failed to create job' });
    }
});

// Update job
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            department,
            location,
            type,
            description,
            requirements,
            responsibilities,
            salary_range,
            is_active
        } = req.body;

        const now = new Date().toISOString();

        await tursoClient.execute({
            sql: `UPDATE jobs SET
                    title = ?,
                    department = ?,
                    location = ?,
                    type = ?,
                    description = ?,
                    requirements = ?,
                    responsibilities = ?,
                    salary_range = ?,
                    is_active = ?,
                    updated_date = ?
                  WHERE id = ?`,
            args: [title, department, location, type, description, requirements, responsibilities || null, salary_range || null, is_active ? 1 : 0, now, id]
        });

        const result = await tursoClient.execute({
            sql: 'SELECT * FROM jobs WHERE id = ?',
            args: [id]
        });

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating job:', error);
        res.status(500).json({ error: 'Failed to update job' });
    }
});

// Toggle job active status
router.patch('/:id/toggle', async (req, res) => {
    try {
        const { id } = req.params;
        const now = new Date().toISOString();

        await tursoClient.execute({
            sql: `UPDATE jobs SET is_active = CASE WHEN is_active = 1 THEN 0 ELSE 1 END, updated_date = ? WHERE id = ?`,
            args: [now, id]
        });

        const result = await tursoClient.execute({
            sql: 'SELECT * FROM jobs WHERE id = ?',
            args: [id]
        });

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error toggling job status:', error);
        res.status(500).json({ error: 'Failed to toggle job status' });
    }
});

// Delete job
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // First delete related applications
        await tursoClient.execute({
            sql: 'DELETE FROM applications WHERE job_id = ?',
            args: [id]
        });

        // Then delete the job
        const result = await tursoClient.execute({
            sql: 'DELETE FROM jobs WHERE id = ?',
            args: [id]
        });

        res.json({ success: true, message: 'Job deleted successfully' });
    } catch (error) {
        console.error('Error deleting job:', error);
        res.status(500).json({ error: 'Failed to delete job' });
    }
});

export default router;
