import { Job, JobFormData, Application, ApplicationFormData } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// ============ Jobs API ============

export const getActiveJobs = async (): Promise<Job[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/jobs/active`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        return response.json();
    } catch (error) {
        console.error('Error fetching active jobs:', error);
        return [];
    }
};

export const getAllJobs = async (): Promise<Job[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/jobs`);
        if (!response.ok) throw new Error('Failed to fetch jobs');
        return response.json();
    } catch (error) {
        console.error('Error fetching all jobs:', error);
        return [];
    }
};

export const getJobById = async (id: string): Promise<Job | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
        if (!response.ok) throw new Error('Failed to fetch job');
        return response.json();
    } catch (error) {
        console.error('Error fetching job:', error);
        return null;
    }
};

export const createJob = async (data: JobFormData): Promise<Job | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/jobs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to create job');
        return response.json();
    } catch (error) {
        console.error('Error creating job:', error);
        return null;
    }
};

export const updateJob = async (id: string, data: JobFormData): Promise<Job | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Failed to update job');
        return response.json();
    } catch (error) {
        console.error('Error updating job:', error);
        return null;
    }
};

export const toggleJobActive = async (id: string): Promise<Job | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/jobs/${id}/toggle`, {
            method: 'PATCH',
        });
        if (!response.ok) throw new Error('Failed to toggle job status');
        return response.json();
    } catch (error) {
        console.error('Error toggling job status:', error);
        return null;
    }
};

export const deleteJob = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
            method: 'DELETE',
        });
        return response.ok;
    } catch (error) {
        console.error('Error deleting job:', error);
        return false;
    }
};

// ============ Applications API ============

export const getAllApplications = async (): Promise<Application[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/applications`);
        if (!response.ok) throw new Error('Failed to fetch applications');
        return response.json();
    } catch (error) {
        console.error('Error fetching applications:', error);
        return [];
    }
};

export const getApplicationsByJob = async (jobId: string): Promise<Application[]> => {
    try {
        const response = await fetch(`${API_BASE_URL}/applications/job/${jobId}`);
        if (!response.ok) throw new Error('Failed to fetch applications');
        return response.json();
    } catch (error) {
        console.error('Error fetching applications for job:', error);
        return [];
    }
};

export const createApplication = async (data: ApplicationFormData): Promise<Application | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/applications`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to submit application');
        }
        return response.json();
    } catch (error) {
        console.error('Error creating application:', error);
        throw error;
    }
};

export const updateApplicationStatus = async (
    id: string,
    status: Application['status']
): Promise<Application | null> => {
    try {
        const response = await fetch(`${API_BASE_URL}/applications/${id}/status`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status }),
        });
        if (!response.ok) throw new Error('Failed to update application status');
        return response.json();
    } catch (error) {
        console.error('Error updating application status:', error);
        return null;
    }
};

export const deleteApplication = async (id: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/applications/${id}`, {
            method: 'DELETE',
        });
        return response.ok;
    } catch (error) {
        console.error('Error deleting application:', error);
        return false;
    }
};

export const getApplicationCountsByJob = async (): Promise<Record<string, number>> => {
    try {
        const response = await fetch(`${API_BASE_URL}/applications/count/by-job`);
        if (!response.ok) throw new Error('Failed to fetch application counts');
        return response.json();
    } catch (error) {
        console.error('Error fetching application counts:', error);
        return {};
    }
};

// ============ Admin Authentication ============

export const adminLogin = async (password: string): Promise<boolean> => {
    try {
        const response = await fetch(`${API_BASE_URL}/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });
        const data = await response.json();
        return data.success;
    } catch (error) {
        console.error('Error during admin login:', error);
        return false;
    }
};
