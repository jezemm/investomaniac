const fs = require('fs');
const https = require('https');

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

const generateFundingData = (teamSize, industry) => {
  const baseGoal = teamSize * 50000;
  const industryMultiplier = industry.toLowerCase().includes('ai') ? 3 :
                            industry.toLowerCase().includes('biotech') ? 4 :
                            industry.toLowerCase().includes('fintech') ? 2.5 : 2;

  const fundingGoal = Math.round(baseGoal * industryMultiplier);
  const currentFunding = Math.round(fundingGoal * (0.2 + Math.random() * 0.6));

  return {
    fundingGoal,
    currentFunding,
    minimumInvestment: Math.max(500, Math.round(fundingGoal * 0.001)),
    maximumInvestment: Math.round(fundingGoal * 0.1)
  };
};

const generateFounders = (companyName) => {
  const firstNames = ['Alex', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'Ryan', 'Maria', 'James', 'Lisa'];
  const lastNames = ['Chen', 'Smith', 'Johnson', 'Rodriguez', 'Kim', 'Patel', 'Zhang', 'Brown', 'Wilson', 'Davis'];

  const founderCount = Math.floor(Math.random() * 2) + 1;
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

const getBatchDate = (batch) => {
  const batchDates = {
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

const fetchYCData = () => {
  return new Promise((resolve, reject) => {
    const url = 'https://yc-oss.github.io/api/companies/all.json';

    https.get(url, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        try {
          const companies = JSON.parse(data);
          resolve(companies);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
};

const processCompanies = (companies) => {
  // Filter for active companies with meaningful data from recent batches
  const recentBatches = [
    'Winter 2020', 'Summer 2020', 'Winter 2021', 'Summer 2021',
    'Winter 2022', 'Summer 2022', 'Winter 2023', 'Summer 2023',
    'Winter 2024', 'Summer 2024', 'Winter 2025'
  ];

  const activeCompanies = companies.filter(company =>
    company.status === 'Active' &&
    company.one_liner &&
    company.long_description &&
    company.team_size > 0 &&
    recentBatches.includes(company.batch)
  );

  // Sort alphabetically and take up to 200 companies
  const sortedCompanies = activeCompanies.sort((a, b) => a.name.localeCompare(b.name));

  const transformedCompanies = sortedCompanies.slice(0, 200).map((company, index) => {
    const funding = generateFundingData(company.team_size, company.industry);

    return {
      id: company.slug,
      name: company.name,
      tagline: company.one_liner,
      description: company.long_description || `${company.name} is a ${company.industry.toLowerCase()} company focused on ${company.one_liner.toLowerCase()}. Based in ${company.location}, they are part of the ${company.batch} Y Combinator batch and have grown to a team of ${company.team_size} people.`,
      image: company.small_logo_thumb_url && !company.small_logo_thumb_url.includes('missing.png')
        ? company.small_logo_thumb_url
        : UNSPLASH_TECH_IMAGES[index % UNSPLASH_TECH_IMAGES.length],
      category: company.subindustry || company.industry,
      fundingGoal: funding.fundingGoal,
      currentFunding: funding.currentFunding,
      minimumInvestment: funding.minimumInvestment,
      maximumInvestment: funding.maximumInvestment,
      founders: generateFounders(company.name),
      createdAt: getBatchDate(company.batch),
      website: company.website
    };
  });

  return transformedCompanies;
};

const generateDatabaseFile = (startups) => {
  const databaseContent = `import { Startup } from '../types/Startup';

// Auto-generated Y Combinator startup database
// Generated on: ${new Date().toISOString()}
// Total companies: ${startups.length}

export const startupsDatabase: Startup[] = ${JSON.stringify(startups, null, 2)};

// Cache for the startup database
let cachedStartups: Startup[] | null = null;

export const getAllStartups = (): Startup[] => {
  if (!cachedStartups) {
    cachedStartups = [...startupsDatabase];
  }
  return cachedStartups;
};

export const getStartupById = (id: string): Startup | undefined => {
  return getAllStartups().find(startup => startup.id === id);
};

export const getStartupsByCategory = (category: string): Startup[] => {
  return getAllStartups().filter(startup =>
    startup.category.toLowerCase().includes(category.toLowerCase())
  );
};

export const searchStartups = (query: string): Startup[] => {
  const lowercaseQuery = query.toLowerCase();
  return getAllStartups().filter(startup =>
    startup.name.toLowerCase().includes(lowercaseQuery) ||
    startup.tagline.toLowerCase().includes(lowercaseQuery) ||
    startup.description.toLowerCase().includes(lowercaseQuery)
  );
};`;

  fs.writeFileSync('./src/data/startupsDatabase.ts', databaseContent);
  console.log(`✅ Generated database with ${startups.length} startups`);
};

// Main execution
const main = async () => {
  try {
    console.log('🚀 Fetching Y Combinator data...');
    const companies = await fetchYCData();
    console.log(`📊 Fetched ${companies.length} total companies`);

    console.log('🔄 Processing and filtering companies...');
    const processedStartups = processCompanies(companies);
    console.log(`✨ Processed ${processedStartups.length} active startups`);

    console.log('💾 Generating database file...');
    generateDatabaseFile(processedStartups);

    console.log('🎉 Database generation complete!');
  } catch (error) {
    console.error('❌ Error generating database:', error);
    process.exit(1);
  }
};

main();