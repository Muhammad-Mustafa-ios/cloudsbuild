import { Project, Client, Workflow, AiAgent, TaskItem, InvoiceItem, MessageItem, TeamMember } from '../types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    name: 'NeuralFlow AI Customer Support',
    clientName: 'Apex Logistics Corp',
    category: 'AI Automation',
    status: 'In Progress',
    progress: 78,
    deadline: '2026-10-15',
    budget: '$34,000',
    description: 'Autonomous multi-lingual customer support agent connected to Zendesk and enterprise inventory databases.',
    team: ['Samira Khan', 'Alex Rivera', 'David Chen'],
    tasksCount: 16,
    completedTasksCount: 12
  },
  {
    id: 'proj-2',
    name: 'OmniStore High-Performance E-Commerce',
    clientName: 'Luxe Apparel Global',
    category: 'E-Commerce',
    status: 'Completed',
    progress: 100,
    deadline: '2026-08-30',
    budget: '$48,000',
    description: 'Headless Shopify plus custom Next.js frontend with lightning-fast load times and AI product recommendations.',
    team: ['Samira Khan', 'Elena Rostova'],
    tasksCount: 24,
    completedTasksCount: 24
  },
  {
    id: 'proj-3',
    name: 'FinSync Automated Invoice Processor',
    clientName: 'Vanguard Capital Partners',
    category: 'Business Software',
    status: 'In Progress',
    progress: 45,
    deadline: '2026-11-01',
    budget: '$28,000',
    description: 'OCR document extraction pipeline that parses unstructured PDF invoices and syncs directly with QuickBooks.',
    team: ['Marcus Thorne', 'Alex Rivera'],
    tasksCount: 10,
    completedTasksCount: 4
  },
  {
    id: 'proj-4',
    name: 'SmartPulse Real-Time Analytics Dashboard',
    clientName: 'Nexus Health Technologies',
    category: 'Web Development',
    status: 'Review',
    progress: 90,
    deadline: '2026-09-25',
    budget: '$52,000',
    description: 'HIPAA-compliant data visualization portal displaying patient metrics and operational hospital flow.',
    team: ['David Chen', 'Elena Rostova', 'Samira Khan'],
    tasksCount: 20,
    completedTasksCount: 18
  },
  {
    id: 'proj-5',
    name: 'OmniChat Lead Gen Bot',
    clientName: 'Veridian Real Estate',
    category: 'AI Chatbot',
    status: 'In Progress',
    progress: 60,
    deadline: '2026-10-10',
    budget: '$18,000',
    description: 'WhatsApp & Web AI agent that pre-qualifies property buyers and automatically books viewings in CRM.',
    team: ['Marcus Thorne'],
    tasksCount: 8,
    completedTasksCount: 5
  }
];

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cli-1',
    name: 'Jonathan Vance',
    company: 'Apex Logistics Corp',
    email: 'j.vance@apexlogistics.io',
    phone: '+1 (555) 382-9102',
    status: 'Active',
    projectsCount: 2,
    totalSpent: '$58,000',
    lastActivity: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'cli-2',
    name: 'Sophia Laurent',
    company: 'Luxe Apparel Global',
    email: 'sophia@luxeapparel.com',
    phone: '+1 (555) 492-8192',
    status: 'Active',
    projectsCount: 3,
    totalSpent: '$112,000',
    lastActivity: '1 day ago',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'cli-3',
    name: 'Michael Sterling',
    company: 'Vanguard Capital Partners',
    email: 'm.sterling@vanguardcap.com',
    phone: '+1 (555) 912-3841',
    status: 'Active',
    projectsCount: 1,
    totalSpent: '$28,000',
    lastActivity: '3 days ago',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'cli-4',
    name: 'Dr. Aris Thorne',
    company: 'Nexus Health Technologies',
    email: 'aris@nexushealth.org',
    phone: '+1 (555) 839-2011',
    status: 'Pending',
    projectsCount: 1,
    totalSpent: '$52,000',
    lastActivity: '5 hours ago',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_WORKFLOWS: Workflow[] = [
  {
    id: 'wf-1',
    name: 'Customer Support Auto-Router',
    status: 'Running',
    trigger: 'Webhook / Incoming Ticket',
    lastRun: '2 mins ago',
    successRate: '99.4%',
    actionsCount: 6
  },
  {
    id: 'wf-2',
    name: 'Invoice OCR & ERP Sync',
    status: 'Running',
    trigger: 'Email Attachment / S3 Upload',
    lastRun: '14 mins ago',
    successRate: '98.1%',
    actionsCount: 8
  },
  {
    id: 'wf-3',
    name: 'Lead Qualification & Enrichment',
    status: 'Completed',
    trigger: 'New Form Submission',
    lastRun: '1 hour ago',
    successRate: '100%',
    actionsCount: 5
  },
  {
    id: 'wf-4',
    name: 'Inventory Low-Stock Alert & PO Gen',
    status: 'Waiting',
    trigger: 'Database Schedule (Hourly)',
    lastRun: '1 hour ago',
    successRate: '97.5%',
    actionsCount: 7
  },
  {
    id: 'wf-5',
    name: 'Weekly Executive Report Synthesizer',
    status: 'Failed',
    trigger: 'Cron Job (Monday 8AM)',
    lastRun: 'Yesterday',
    successRate: '88.9%',
    actionsCount: 9
  }
];

export const INITIAL_AI_AGENTS: AiAgent[] = [
  {
    id: 'agent-1',
    name: 'CloudsBuilt Support Copilot',
    purpose: 'Handles tier-1 customer inquiries, ticket triage, and knowledge retrieval across 14 enterprise wikis.',
    status: 'Active',
    model: 'Gemini 2.5 Pro Enterprise',
    knowledgeBase: 'Company Docs v4.2 + Product Manuals',
    tools: ['Zendesk API', 'SQL Database', 'Slack Notifier'],
    lastActivity: 'Active 3m ago'
  },
  {
    id: 'agent-2',
    name: 'Sales Qualifier Pro',
    purpose: 'Engages inbound website visitors on WhatsApp, assesses budget & timeline, and schedules meetings.',
    status: 'Active',
    model: 'Gemini 2.5 Flash',
    knowledgeBase: 'Pricing Matrix & Case Studies',
    tools: ['Calendly API', 'HubSpot CRM', 'WhatsApp Business'],
    lastActivity: 'Active 12m ago'
  },
  {
    id: 'agent-3',
    name: 'Invoice Extractor AI',
    purpose: 'Parses scanned PDF invoices, matches purchase orders, and flags anomalies or duplicate charges.',
    status: 'Active',
    model: 'Gemini 2.5 Flash Vision',
    knowledgeBase: 'Accounting Rules & Tax Tables',
    tools: ['QuickBooks API', 'AWS S3', 'Email Client'],
    lastActivity: 'Active 1h ago'
  },
  {
    id: 'agent-4',
    name: 'Code Review & Security Guardian',
    purpose: 'Scans pull requests for vulnerability patterns, security flaws, and adherence to company architecture standards.',
    status: 'Training',
    model: 'Gemini 2.5 Pro',
    knowledgeBase: 'OWASP Top 10 & Repo Standards',
    tools: ['GitHub Webhook', 'SonarQube API'],
    lastActivity: 'Training (Epoch 4/10)'
  }
];

export const INITIAL_TASKS: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Configure Gemini API rate limits and retry logic',
    project: 'NeuralFlow AI Customer Support',
    dueDate: '2026-09-12',
    priority: 'High',
    status: 'In Progress',
    assignee: 'Alex Rivera'
  },
  {
    id: 'task-2',
    title: 'Optimize Postgres indexing for invoice line items',
    project: 'FinSync Automated Invoice Processor',
    dueDate: '2026-09-15',
    priority: 'Medium',
    status: 'Todo',
    assignee: 'Marcus Thorne'
  },
  {
    id: 'task-3',
    title: 'Deploy production staging environment on AWS ECS',
    project: 'SmartPulse Real-Time Analytics Dashboard',
    dueDate: '2026-09-10',
    priority: 'High',
    status: 'Done',
    assignee: 'David Chen'
  },
  {
    id: 'task-4',
    title: 'Client acceptance sign-off meeting for checkout flow',
    project: 'OmniStore High-Performance E-Commerce',
    dueDate: '2026-09-08',
    priority: 'Low',
    status: 'Done',
    assignee: 'Samira Khan'
  }
];

export const INITIAL_INVOICES: InvoiceItem[] = [
  {
    id: 'inv-1',
    invoiceNumber: 'INV-2026-089',
    client: 'Apex Logistics Corp',
    amount: '$17,000.00',
    date: '2026-09-01',
    dueDate: '2026-10-01',
    status: 'Pending'
  },
  {
    id: 'inv-2',
    invoiceNumber: 'INV-2026-088',
    client: 'Luxe Apparel Global',
    amount: '$48,000.00',
    date: '2026-08-15',
    dueDate: '2026-09-15',
    status: 'Paid'
  },
  {
    id: 'inv-3',
    invoiceNumber: 'INV-2026-087',
    client: 'Vanguard Capital Partners',
    amount: '$14,000.00',
    date: '2026-08-01',
    dueDate: '2026-09-01',
    status: 'Overdue'
  }
];

export const INITIAL_MESSAGES: MessageItem[] = [
  {
    id: 'msg-1',
    sender: 'Jonathan Vance',
    company: 'Apex Logistics Corp',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'The staging bot handled the test queries remarkably well. When can we push to production?',
    time: '10:42 AM',
    unread: true
  },
  {
    id: 'msg-2',
    sender: 'Sophia Laurent',
    company: 'Luxe Apparel Global',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Thanks Sam! Conversion rates are up 28% since the new store launch.',
    time: 'Yesterday',
    unread: false
  },
  {
    id: 'msg-3',
    sender: 'Michael Sterling',
    company: 'Vanguard Capital',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    lastMessage: 'Reviewing the OCR document schema now. Will send feedback by tomorrow morning.',
    time: 'Sep 5',
    unread: false
  }
];

export const INITIAL_TEAM: TeamMember[] = [
  {
    id: 'tm-1',
    name: 'Samira Khan',
    role: 'Founder & Chief Technology Officer',
    email: 'samira@samstacksolution.com',
    department: 'Executive & Architecture',
    status: 'Online',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'tm-2',
    name: 'Alex Rivera',
    role: 'Lead AI & Automation Engineer',
    email: 'alex@samstacksolution.com',
    department: 'AI Systems',
    status: 'Online',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'tm-3',
    name: 'David Chen',
    role: 'Senior Full-Stack Architect',
    email: 'david@samstacksolution.com',
    department: 'Engineering',
    status: 'In Meeting',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'tm-4',
    name: 'Elena Rostova',
    role: 'UI/UX Design Director',
    email: 'elena@samstacksolution.com',
    department: 'Design',
    status: 'Offline',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  }
];

export const ANALYTICS_REVENUE_DATA = [
  { month: 'Apr', revenue: 42000, projects: 4, automationRuns: 12500 },
  { month: 'May', revenue: 58000, projects: 6, automationRuns: 18400 },
  { month: 'Jun', revenue: 74000, projects: 8, automationRuns: 24200 },
  { month: 'Jul', revenue: 89000, projects: 10, automationRuns: 31000 },
  { month: 'Aug', revenue: 112000, projects: 13, automationRuns: 45000 },
  { month: 'Sep', revenue: 138000, projects: 16, automationRuns: 58900 },
];
