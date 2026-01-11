
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
