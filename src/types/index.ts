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
}

export interface Appointment {
  id: string;
  date: string;
  time: string;
  type: 'video' | 'office';
  status: 'scheduled' | 'completed' | 'cancelled';
  projectId?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
  projectInterest?: string;
}