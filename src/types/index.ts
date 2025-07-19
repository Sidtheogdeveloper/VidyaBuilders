export interface Project {
  id: string;
  name: string;
  location: string;
  type: 'completed' | 'ongoing' | 'upcoming';
  image: string;
  images: string[];
  description: string;
  launchDate?: string;
  completionDate?: string;
  reraNumber?: string;
  amenities: string[];
  unitTypes: UnitType[];
  specifications: Specification[];
  price?: string;
  status: string;
  progress?: number;
  mapUrl: string;
  modelUrl?: string;
}

export interface UnitType {
  type: string;
  area: string;
  price: string;
  floorPlan: string;
}

export interface Specification {
  category: string;
  details: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  preferences: {
    newsletter: boolean;
    promotions: boolean;
    projectUpdates: boolean;
  };
  appointments: Appointment[];
  ownedUnits?: OwnedUnit[];
}

export interface Appointment {
  id: string;
  userId: string;
  date: string;
  time: string;
  type: 'video' | 'office';
  status: 'scheduled' | 'completed' | 'cancelled';
  projectId?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  notes?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  projectInterest?: string;
}

export interface OwnedUnit {
  id: string;
  projectId: string;
  projectName: string;
  unitType: string;
  unitNumber: string;
  floorNumber: number;
  purchaseDate: string;
  expectedCompletion: string;
  currentProgress: number;
  milestones: ProjectMilestone[];
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  completedDate?: string;
  isCompleted: boolean;
  images?: string[];
  order: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishDate: string;
  category: 'news' | 'market-insights' | 'construction-updates' | 'company-news';
  featuredImage: string;
  tags: string[];
  readTime: number;
}

export interface EMICalculation {
  loanAmount: number;
  interestRate: number;
  tenure: number;
  emi: number;
  totalAmount: number;
  totalInterest: number;
}