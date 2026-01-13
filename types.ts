
export interface Deployment {
  title: string;
  description: string;
  built: string;
  outcome: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  capabilities: string[];
  visualType: 'chatbot' | 'voice' | 'crm' | 'agent' | 'app';
  ctaText?: string;
  deployments?: Deployment[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export enum UISection {
  HERO = 'hero',
  SERVICES = 'services',
  PROOF = 'proof',
  CONTACT = 'contact'
}

// Job types for Carriers page
export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  description: string;
  requirements: string;
  responsibilities?: string;
  salary_range?: string;
  is_active: boolean;
  posted_date: string;
  updated_date: string;
}

export type JobFormData = Omit<Job, 'id' | 'posted_date' | 'updated_date'>;

// Application types for job applications
export interface Application {
  id: string;
  job_id: string;
  applicant_name: string;
  applicant_email: string;
  applicant_phone: string;
  resume_url: string;
  cover_letter?: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected';
  applied_date: string;
  job_title?: string;
  job_department?: string;
}

export type ApplicationFormData = Omit<Application, 'id' | 'applied_date' | 'status' | 'job_title' | 'job_department'>;
