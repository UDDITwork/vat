import { Router } from 'express';
import { tursoClient } from '../index';
import { v4 as uuidv4 } from 'uuid';

const router = Router();

// Get all applications with job titles (admin)
router.get('/', async (req, res) => {
    try {
        const result = await tursoClient.execute(`
            SELECT
                a.*,
                j.title as job_title,
                j.department as job_department
            FROM applications a
            LEFT JOIN jobs j ON a.job_id = j.id
            ORDER BY a.applied_date DESC
        `);
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching applications:', error);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});

// Get applications for a specific job
router.get('/job/:jobId', async (req, res) => {
    try {
        const { jobId } = req.params;
        const result = await tursoClient.execute({
            sql: `
                SELECT
                    a.*,
                    j.title as job_title,
                    j.department as job_department
                FROM applications a
                LEFT JOIN jobs j ON a.job_id = j.id
                WHERE a.job_id = ?
                ORDER BY a.applied_date DESC
            `,
            args: [jobId]
        });
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching applications for job:', error);
        res.status(500).json({ error: 'Failed to fetch applications' });
    }
});

// Get single application by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await tursoClient.execute({
            sql: `
                SELECT
                    a.*,
                    j.title as job_title,
                    j.department as job_department
                FROM applications a
                LEFT JOIN jobs j ON a.job_id = j.id
                WHERE a.id = ?
            `,
            args: [id]
        });

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching application:', error);
        res.status(500).json({ error: 'Failed to fetch application' });
    }
});

// Create new application (public - for job applicants)
router.post('/', async (req, res) => {
    try {
        const {
            job_id,
            applicant_name,
            applicant_email,
            applicant_phone,
            resume_url,
            cover_letter
        } = req.body;

        // Validate required fields
        if (!job_id || !applicant_name || !applicant_email || !applicant_phone || !resume_url) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Check if job exists and is active
        const jobCheck = await tursoClient.execute({
            sql: 'SELECT id, title FROM jobs WHERE id = ? AND is_active = 1',
            args: [job_id]
        });

        if (jobCheck.rows.length === 0) {
            return res.status(404).json({ error: 'Job not found or no longer accepting applications' });
        }

        const id = uuidv4();
        const now = new Date().toISOString();

        await tursoClient.execute({
            sql: `INSERT INTO applications (id, job_id, applicant_name, applicant_email, applicant_phone, resume_url, cover_letter, status, applied_date)
                  VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', ?)`,
            args: [id, job_id, applicant_name, applicant_email, applicant_phone, resume_url, cover_letter || null, now]
        });

        const result = await tursoClient.execute({
            sql: `
                SELECT
                    a.*,
                    j.title as job_title
                FROM applications a
                LEFT JOIN jobs j ON a.job_id = j.id
                WHERE a.id = ?
            `,
            args: [id]
        });

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating application:', error);
        res.status(500).json({ error: 'Failed to submit application' });
    }
});

// Update application status (admin)
router.patch('/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        // Validate status
        const validStatuses = ['pending', 'reviewed', 'shortlisted', 'rejected'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ error: 'Invalid status. Must be one of: ' + validStatuses.join(', ') });
        }

        await tursoClient.execute({
            sql: 'UPDATE applications SET status = ? WHERE id = ?',
            args: [status, id]
        });

        const result = await tursoClient.execute({
            sql: `
                SELECT
                    a.*,
                    j.title as job_title,
                    j.department as job_department
                FROM applications a
                LEFT JOIN jobs j ON a.job_id = j.id
                WHERE a.id = ?
            `,
            args: [id]
        });

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Application not found' });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating application status:', error);
        res.status(500).json({ error: 'Failed to update application status' });
    }
});

// Delete application (admin)
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        await tursoClient.execute({
            sql: 'DELETE FROM applications WHERE id = ?',
            args: [id]
        });

        res.json({ success: true, message: 'Application deleted successfully' });
    } catch (error) {
        console.error('Error deleting application:', error);
        res.status(500).json({ error: 'Failed to delete application' });
    }
});

// Get application count per job (for admin job list)
router.get('/count/by-job', async (req, res) => {
    try {
        const result = await tursoClient.execute(`
            SELECT job_id, COUNT(*) as application_count
            FROM applications
            GROUP BY job_id
        `);

        // Convert to object for easier lookup
        const counts: Record<string, number> = {};
        result.rows.forEach((row: any) => {
            counts[row.job_id] = Number(row.application_count);
        });

        res.json(counts);
    } catch (error) {
        console.error('Error fetching application counts:', error);
        res.status(500).json({ error: 'Failed to fetch application counts' });
    }
});

export default router;
