export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
  year: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Technology {
  name: string;
  category: string;
}
