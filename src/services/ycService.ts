import { Startup } from '../types/Startup';
import { getAllStartups, getStartupById } from '../data/startupsDatabase';

interface YCCompany {
  name: string;
  slug: string;
  website: string;
  location: string;
  one_liner: string;
  long_description: string;
  industry: string;
  subindustry: string;
  batch: string;
  team_size: number;
  status: string;
  tags: string[];
  small_logo_thumb_url?: string;
}

const UNSPLASH_TECH_IMAGES = [
  'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1560472355-109703aa3edc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1587613991119-fbbe8e90531d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
];

const generateFundingData = (teamSize: number, industry: string) => {
  // Generate realistic funding based on team size and industry
  const baseGoal = teamSize * 50000; // $50k per team member as base
  const industryMultiplier = industry.toLowerCase().includes('ai') ? 3 :
                            industry.toLowerCase().includes('biotech') ? 4 :
                            industry.toLowerCase().includes('fintech') ? 2.5 : 2;

  const fundingGoal = Math.round(baseGoal * industryMultiplier);
  const currentFunding = Math.round(fundingGoal * (0.2 + Math.random() * 0.6)); // 20-80% funded

  return {
    fundingGoal,
    currentFunding,
    minimumInvestment: Math.max(500, Math.round(fundingGoal * 0.001)),
    maximumInvestment: Math.round(fundingGoal * 0.1)
  };
};

const generateFounders = (companyName: string): any[] => {
  const firstNames = ['Alex', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'Ryan', 'Maria', 'James', 'Lisa'];
  const lastNames = ['Chen', 'Smith', 'Johnson', 'Rodriguez', 'Kim', 'Patel', 'Zhang', 'Brown', 'Wilson', 'Davis'];

  const founderCount = Math.floor(Math.random() * 2) + 1; // 1-2 founders
  const founders = [];

  for (let i = 0; i < founderCount; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const roles = ['CEO', 'CTO', 'COO', 'Head of Product', 'Head of Engineering'];

    founders.push({
      name: `${firstName} ${lastName}`,
      role: i === 0 ? 'CEO & Founder' : roles[Math.floor(Math.random() * roles.length)],
      email: `${firstName.toLowerCase()}@${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
      linkedin: `https://linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}`
    });
  }

  return founders;
};

export const fetchYCCompanies = async (): Promise<Startup[]> => {
  try {
    // Return startups from our local database
    // This simulates an async operation for consistency with the existing interface
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getAllStartups());
      }, 100); // Small delay to simulate loading
    });
  } catch (error) {
    console.error('Error loading YC companies from database:', error);
    throw error;
  }
};

export const getYCCompanyById = async (id: string): Promise<Startup | undefined> => {
  try {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getStartupById(id));
      }, 50);
    });
  } catch (error) {
    console.error('Error loading YC company from database:', error);
    throw error;
  }
};

const getBatchDate = (batch: string): string => {
  const batchDates: { [key: string]: string } = {
    'Winter 2025': '2025-01-15',
    'Summer 2024': '2024-06-15',
    'Winter 2024': '2024-01-15',
    'Summer 2023': '2023-06-15',
    'Winter 2023': '2023-01-15',
    'Summer 2022': '2022-06-15',
    'Winter 2022': '2022-01-15',
    'Summer 2021': '2021-06-15',
    'Winter 2021': '2021-01-15',
    'Summer 2020': '2020-06-15',
    'Winter 2020': '2020-01-15',
  };

  return batchDates[batch] || '2024-01-15';
};