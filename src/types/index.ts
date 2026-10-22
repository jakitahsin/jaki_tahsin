export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: string;
  role: string;
  services: string;
  cats: string[];
  desc: string;
  challenge: string;
  approach: string;
  deliverables: string[];
  cover: string;
  gallery: string[];
  featured: boolean;
  published: boolean;
  tags?: string[];
  showcaseUrl?: string;
}

export interface Client {
  id: string;
  name: string;
  logo: string;
  relationship: string;
  url?: string;
  visible: boolean;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  deliverables: string[];
  suitedFor: string[];
  process: { step: string; title: string; desc: string }[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  service: string;
  budget?: string;
  timeline?: string;
  message: string;
}
