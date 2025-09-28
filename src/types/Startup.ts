export interface Founder {
  name: string;
  role: string;
  email: string;
  linkedin?: string;
}

export interface Startup {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  category: string;
  fundingGoal: number;
  currentFunding: number;
  minimumInvestment: number;
  maximumInvestment: number;
  founders: Founder[];
  createdAt: string;
  website?: string;
}

export interface Investment {
  id: string;
  startupId: string;
  amount: number;
  investorName: string;
  investorEmail: string;
  timestamp: string;
}