
import { Service } from './types';

export const SERVICES: Service[] = [
  {
    id: 'business_automation',
    title: 'AI Business Automation Systems',
    description: 'End-to-end automation systems that remove repetitive work across sales, support, operations, and internal workflows — built specifically for how your business runs.',
    capabilities: [
      'Lead capture → qualification → CRM sync',
      'Customer support automation',
      'Internal ops automation',
      'Tool-to-tool integrations'
    ],
    visualType: 'chatbot',
    ctaText: 'View Automation Use-Cases',
    deployments: [
      {
        title: 'Enterprise CRM Synchronization Layer',
        description: 'Bilateral sync system for multi-channel sales data.',
        built: 'Custom middleware connecting HubSpot, Salesforce, and Outreach.',
        outcome: 'Reduced manual entry by 40hrs/week per rep.'
      },
      {
        title: 'Automated Lead Qualification Engine',
        description: 'Instant lead scoring and routing system.',
        built: 'Real-time enrichment pipeline with Clearbit & OpenAI.',
        outcome: '3x increase in qualified demos booked.'
      },
      {
        title: 'Support Ticket Triaging Agent',
        description: 'Level 1 support layer for high-volume SaaS.',
        built: 'Fine-tuned classifier for Intercom & Zendesk.',
        outcome: '70% of tickets resolved resolved autonomously.'
      },
      {
        title: 'Internal Ops Command Center',
        description: 'Slack-based operations controller.',
        built: ' Slack bot for approval flows and inventory checks.',
        outcome: 'Instant cross-department approvals.'
      }
    ]
  },
  {
    id: 'workflows',
    title: 'AI Workflows & Process Systems',
    description: 'Structured, multi-step AI workflows that execute tasks reliably — from lead handling to post-sale operations — without human bottlenecks.',
    capabilities: [
      'Multi-step AI workflows',
      'Sales follow-ups & scheduling',
      'AI + human handoff systems',
      'Error-handling & fallback logic'
    ],
    visualType: 'voice',
    ctaText: 'Explore Workflow Systems',
    deployments: [
      {
        title: 'Cold Outreach Reactivation Flow',
        description: 'Autonomous stale-lead revival system.',
        built: 'Multi-touch email & LinkedIn sequence generator.',
        outcome: '12% conversion rate from dead leads.'
      },
      {
        title: 'Client Onboarding Orchestrator',
        description: 'Zero-touch account setup and provisioning.',
        built: 'Sequential workflow triggering Stripe, AWS, and Notion.',
        outcome: 'Onboarding time reduced from 3 days to 4 minutes.'
      },
      {
        title: 'Dynamic Scheduling Assistant',
        description: 'Context-aware meeting coordinator.',
        built: 'Calendar logic handling timezones and priority routing.',
        outcome: 'Zero friction booking experience.'
      },
      {
        title: 'Invoice Processing Pipeline',
        description: 'End-to-end AP/AR automation.',
        built: 'OCR + LLM extraction for non-standard invoices.',
        outcome: '99% extraction accuracy at scale.'
      }
    ]
  },
  {
    id: 'custom_agents',
    title: 'Custom AI & Voice Agents',
    description: 'Purpose-built AI agents trained on your business logic — deployed across chat, voice, and internal tools to work like a real team member.',
    capabilities: [
      'Custom GPT-style agents',
      'Voice agents for calls',
      'Memory, context & tool-calling',
      'Secure, private deployments'
    ],
    visualType: 'agent',
    ctaText: 'Build Your AI Agent',
    deployments: [
      {
        title: 'Legal Discovery Analyst Agent',
        description: 'Context-heavy document review assistant.',
        built: 'RAG system over 50,000+ case files.',
        outcome: 'Review speed increased by 20x.'
      },
      {
        title: 'Outbound Sales Voice Agent',
        description: 'Human-parity calling for lead qualification.',
        built: 'Low-latency VAPI integration with custom voice clone.',
        outcome: '24/7 lead coverage without headcount.'
      },
      {
        title: 'Technical Support Copilot',
        description: 'Real-time debug assistant for dev teams.',
        built: 'Agent trained on internal docs and GitHub issues.',
        outcome: '50% reduction in mean time to resolution.'
      },
      {
        title: 'Executive Briefing Agent',
        description: 'Personalized market intelligence synthesiser.',
        built: 'Daily reporter aggregating news, memos, and KPIs.',
        outcome: 'Executives save 1hr/day on reading.'
      }
    ]
  },
  {
    id: 'websites_apps',
    title: 'AI-Powered Websites & Applications',
    description: 'Websites and apps designed with AI at the core — not bolted on later — enabling automation, personalization, and intelligent user experiences.',
    capabilities: [
      'AI-enabled websites',
      'Internal dashboards & admin tools',
      'SaaS MVPs with embedded AI',
      'Scalable, production-ready builds'
    ],
    visualType: 'app',
    ctaText: 'See AI Web & App Builds',
    deployments: [
      {
        title: 'Gen-AI E-commerce Sytlist',
        description: 'Personalized shopping experience.',
        built: 'Visual search and recommendation engine.',
        outcome: '35% increase in average order value.'
      },
      {
        title: 'Real-time Logistics Dashboard',
        description: 'Predictive supply chain visualization.',
        built: 'React dashboard with forecasting models.',
        outcome: 'Proactive delay prevention.'
      },
      {
        title: 'AI-Native SaaS MVP',
        description: 'Vertical AI platform for real estate.',
        built: 'Next.js app with embedded property analysis.',
        outcome: 'Launched in 4 weeks, acquired 500 users.'
      },
      {
        title: 'Dynamic Landing Page Generator',
        description: 'Self-optimizing marketing sites.',
        built: 'System generating programmatic SEO pages.',
        outcome: '400% organic traffic growth.'
      }
    ]
  },
  {
    id: 'strategy',
    title: 'AI Strategy & System Architecture',
    description: 'Strategic AI planning and system design for businesses that want clarity before building — and scalability after launch.',
    capabilities: [
      'AI roadmap & use-case identification',
      'System architecture & tool selection',
      'Cost optimization & scaling strategy',
      'Long-term automation planning'
    ],
    visualType: 'crm',
    ctaText: 'Book AI Strategy Call',
    deployments: [
      {
        title: 'Enterprise AI Roadmap',
        description: '3-year transformation plan for FinTech.',
        built: 'Comprehensive audit and phased implementation plan.',
        outcome: 'Clear path to $10M operational savings.'
      },
      {
        title: 'Scalable RAG Architecture Design',
        description: 'Blueprint for secure knowledge retrieval.',
        built: 'Vector database and privacy-first infrastructure spec.',
        outcome: 'SOC2 compliant ready design.'
      },
      {
        title: 'Tool Stack Consolidation Strategy',
        description: 'Optimization of fragmented software spend.',
        built: 'Audit of 50+ SaaS tools and AI replacement plan.',
        outcome: 'Projected 30% reduction in software costs.'
      },
      {
        title: 'AI Governance Framework',
        description: 'Safety and compliance protocols.',
        built: 'Guidelines for human-in-the-loop and data privacy.',
        outcome: 'Risk-free AI adoption.'
      }
    ]
  }
];

export const BRAND_COLORS = {
  primary: '#00ffff', // Neon Cyan
  secondary: '#7b61ff', // Violet
  accent: '#ff00ff', // Electric Magenta
  bg: '#050505',
};
