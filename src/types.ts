export type PageView = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'projects' 
  | 'ai-automation' 
  | 'pricing' 
  | 'contact' 
  | 'auth'
  | 'dashboard';

export type DashboardTab = 
  | 'overview'
  | 'analytics'
  | 'projects'
  | 'project-detail'
  | 'clients'
  | 'client-detail'
  | 'ai-automation'
  | 'workflow-builder'
  | 'ai-agents'
  | 'messages'
  | 'tasks'
  | 'calendar'
  | 'invoices'
  | 'payments'
  | 'files'
  | 'team'
  | 'notifications'
  | 'reports'
  | 'settings'
  | 'profile'
  | 'testimonials-admin';

export interface Project {
  id: string;
  name: string;
  clientName: string;
  category: 'AI Automation' | 'Web Development' | 'E-Commerce' | 'Business Software' | 'AI Chatbot';
  status: 'In Progress' | 'Completed' | 'Review' | 'Planning';
  progress: number;
  deadline: string;
  budget: string;
  description: string;
  team: string[];
  tasksCount: number;
  completedTasksCount: number;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'Active' | 'Pending' | 'Completed';
  projectsCount: number;
  totalSpent: string;
  lastActivity: string;
  avatar: string;
}

export interface Workflow {
  id: string;
  name: string;
  status: 'Running' | 'Completed' | 'Waiting' | 'Failed';
  trigger: string;
  lastRun: string;
  successRate: string;
  actionsCount: number;
}

export interface AiAgent {
  id: string;
  name: string;
  purpose: string;
  status: 'Active' | 'Standby' | 'Training';
  model: string;
  knowledgeBase: string;
  tools: string[];
  lastActivity: string;
}

export interface TaskItem {
  id: string;
  title: string;
  project: string;
  dueDate: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Todo' | 'In Progress' | 'Done';
  assignee: string;
}

export interface InvoiceItem {
  id: string;
  invoiceNumber: string;
  client: string;
  amount: string;
  date: string;
  dueDate: string;
  status: 'Paid' | 'Pending' | 'Overdue';
}

export interface MessageItem {
  id: string;
  sender: string;
  company: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  department: string;
  status: 'Online' | 'Offline' | 'In Meeting';
  avatar: string;
}
