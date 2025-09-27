import { Startup } from '../types/Startup';

export const mockStartups: Startup[] = [
  {
    id: '1',
    name: 'EcoTech Solutions',
    tagline: 'Revolutionizing renewable energy storage',
    description: 'EcoTech Solutions is developing next-generation battery technology that makes renewable energy storage 50% more efficient and 30% more cost-effective. Our proprietary lithium-silicon composite batteries can store solar and wind energy for extended periods, making clean energy accessible 24/7. With partnerships already secured with major solar installation companies, we\'re positioned to capture significant market share in the rapidly growing renewable energy sector. Our team of MIT-trained engineers has already developed working prototypes and secured key patents in the energy storage space.',
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Clean Energy',
    fundingGoal: 2000000,
    currentFunding: 850000,
    minimumInvestment: 1000,
    maximumInvestment: 100000,
    founders: [
      {
        name: 'Dr. Sarah Chen',
        role: 'CEO & Co-Founder',
        email: 'sarah@ecotech.com',
        linkedin: 'https://linkedin.com/in/sarahchen'
      },
      {
        name: 'Michael Rodriguez',
        role: 'CTO & Co-Founder',
        email: 'michael@ecotech.com',
        linkedin: 'https://linkedin.com/in/mrodriguez'
      }
    ],
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'HealthAI',
    tagline: 'AI-powered personalized medicine platform',
    description: 'HealthAI is transforming healthcare through artificial intelligence and personalized medicine. Our platform analyzes genetic data, lifestyle factors, and medical history to provide personalized treatment recommendations that improve patient outcomes by 40%. We\'ve partnered with leading hospitals and have already processed over 10,000 patient profiles with remarkable success rates. Our AI algorithms can predict disease risks years in advance and suggest preventive measures, potentially saving millions in healthcare costs while improving quality of life. The platform is currently being used by 15 medical centers across the country.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Healthcare',
    fundingGoal: 5000000,
    currentFunding: 2100000,
    minimumInvestment: 2500,
    maximumInvestment: 250000,
    founders: [
      {
        name: 'Dr. James Watson',
        role: 'CEO & Founder',
        email: 'james@healthai.com',
        linkedin: 'https://linkedin.com/in/jameswatson'
      },
      {
        name: 'Lisa Park',
        role: 'Head of AI Research',
        email: 'lisa@healthai.com',
        linkedin: 'https://linkedin.com/in/lisapark'
      }
    ],
    createdAt: '2024-02-01'
  },
  {
    id: '3',
    name: 'FoodieBot',
    tagline: 'Autonomous restaurant delivery robots',
    description: 'FoodieBot is revolutionizing food delivery with our fleet of autonomous delivery robots. Our robots can navigate city streets, sidewalks, and buildings to deliver food faster and more cost-effectively than traditional delivery methods. With advanced AI navigation, our bots avoid obstacles, follow traffic rules, and provide secure contactless delivery. We\'ve already deployed 50 robots across 3 major cities with 99.2% successful delivery rates. Restaurants using our service report 35% faster delivery times and 25% reduced delivery costs. Our technology is scalable and we\'re ready to expand to 10 more cities within the next 12 months.',
    image: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Robotics',
    fundingGoal: 3500000,
    currentFunding: 1200000,
    minimumInvestment: 500,
    maximumInvestment: 75000,
    founders: [
      {
        name: 'Alex Kim',
        role: 'CEO & Co-Founder',
        email: 'alex@foodiebot.com',
        linkedin: 'https://linkedin.com/in/alexkim'
      },
      {
        name: 'Rachel Torres',
        role: 'Head of Engineering',
        email: 'rachel@foodiebot.com',
        linkedin: 'https://linkedin.com/in/racheltorres'
      }
    ],
    createdAt: '2024-01-20'
  },
  {
    id: '4',
    name: 'EduVerse',
    tagline: 'Virtual reality education platform',
    description: 'EduVerse is creating immersive educational experiences through virtual reality technology. Students can explore ancient Rome, walk through the human circulatory system, or conduct virtual chemistry experiments in our safe, engaging VR environment. Our platform increases student engagement by 80% and improves learning retention by 65% compared to traditional teaching methods. We\'ve partnered with over 200 schools and have developed curriculum for subjects ranging from history and science to art and languages. Teachers report significant improvements in student participation and test scores. Our content library includes over 500 immersive lessons across multiple grade levels.',
    image: 'https://images.unsplash.com/photo-1560472355-109703aa3edc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Education',
    fundingGoal: 4000000,
    currentFunding: 1800000,
    minimumInvestment: 1000,
    maximumInvestment: 150000,
    founders: [
      {
        name: 'Maria Gonzalez',
        role: 'CEO & Founder',
        email: 'maria@eduverse.com',
        linkedin: 'https://linkedin.com/in/mariagonzalez'
      },
      {
        name: 'David Liu',
        role: 'Head of Product',
        email: 'david@eduverse.com',
        linkedin: 'https://linkedin.com/in/davidliu'
      }
    ],
    createdAt: '2024-01-05'
  },
  {
    id: '5',
    name: 'FinSecure',
    tagline: 'Blockchain-based financial security platform',
    description: 'FinSecure is building the next generation of financial security using blockchain technology and advanced cryptography. Our platform provides banks and financial institutions with quantum-resistant security solutions that protect against cyber threats while enabling faster, more secure transactions. We\'ve developed proprietary algorithms that reduce transaction processing time by 70% while increasing security by 300%. Major banks are already piloting our technology, with early results showing zero security breaches and significantly improved customer satisfaction. Our solution addresses the growing need for financial institutions to modernize their security infrastructure in an increasingly digital world.',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'FinTech',
    fundingGoal: 8000000,
    currentFunding: 3200000,
    minimumInvestment: 5000,
    maximumInvestment: 500000,
    founders: [
      {
        name: 'Robert Johnson',
        role: 'CEO & Co-Founder',
        email: 'robert@finsecure.com',
        linkedin: 'https://linkedin.com/in/robertjohnson'
      },
      {
        name: 'Dr. Priya Patel',
        role: 'Chief Security Officer',
        email: 'priya@finsecure.com',
        linkedin: 'https://linkedin.com/in/priyapatel'
      }
    ],
    createdAt: '2024-02-10'
  },
  {
    id: '6',
    name: 'GreenGrow',
    tagline: 'Vertical farming automation systems',
    description: 'GreenGrow is revolutionizing agriculture with automated vertical farming systems that produce 95% more food per square foot while using 90% less water than traditional farming. Our AI-controlled growing environments optimize light, temperature, nutrients, and humidity for maximum crop yields year-round. We\'ve developed modular farming units that can be installed in urban areas, bringing fresh produce closer to consumers and reducing transportation costs. Our systems are already producing crops for major grocery chains, with harvest cycles 3x faster than traditional farming. Each unit pays for itself within 18 months through reduced operating costs and premium pricing for locally-grown produce.',
    image: 'https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'AgTech',
    fundingGoal: 6000000,
    currentFunding: 2800000,
    minimumInvestment: 1500,
    maximumInvestment: 200000,
    founders: [
      {
        name: 'Jennifer Wong',
        role: 'CEO & Founder',
        email: 'jennifer@greengrow.com',
        linkedin: 'https://linkedin.com/in/jenniferwong'
      },
      {
        name: 'Mark Thompson',
        role: 'Head of Automation',
        email: 'mark@greengrow.com',
        linkedin: 'https://linkedin.com/in/markthompson'
      }
    ],
    createdAt: '2024-01-25'
  },
  {
    id: '7',
    name: 'SpaceLogistics',
    tagline: 'Satellite-based cargo delivery network',
    description: 'SpaceLogistics is developing a revolutionary satellite-based cargo delivery system that can transport packages anywhere on Earth within 30 minutes. Using reusable launch vehicles and orbital platforms, we can bypass traditional ground transportation bottlenecks and deliver urgent medical supplies, electronics, and other high-value goods at unprecedented speeds. Our system is particularly valuable for emergency response, remote area deliveries, and time-critical business shipments. We\'ve successfully completed three test flights and secured contracts with major logistics companies. The technology has applications for both civilian and government customers, representing a multi-billion dollar market opportunity.',
    image: 'https://images.unsplash.com/photo-1614728263952-84ea256f9679?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Aerospace',
    fundingGoal: 15000000,
    currentFunding: 6500000,
    minimumInvestment: 10000,
    maximumInvestment: 1000000,
    founders: [
      {
        name: 'Captain Sarah Mitchell',
        role: 'CEO & Co-Founder',
        email: 'sarah@spacelogistics.com',
        linkedin: 'https://linkedin.com/in/sarahmitchell'
      },
      {
        name: 'Dr. Ryan Cooper',
        role: 'Chief Technology Officer',
        email: 'ryan@spacelogistics.com',
        linkedin: 'https://linkedin.com/in/ryancooper'
      }
    ],
    createdAt: '2024-02-15'
  },
  {
    id: '8',
    name: 'MindfulAI',
    tagline: 'AI-powered mental health support platform',
    description: 'MindfulAI is transforming mental health care through AI-powered therapy and support systems. Our platform provides 24/7 mental health assistance using advanced natural language processing to offer personalized therapy sessions, mood tracking, and crisis intervention. Licensed therapists oversee AI interactions and provide human support when needed. We\'ve helped over 25,000 users improve their mental health outcomes, with 85% reporting reduced anxiety and depression symptoms. Our platform addresses the growing mental health crisis by making therapy more accessible and affordable. We\'re working with healthcare systems and insurance companies to integrate our services into standard care protocols.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Healthcare',
    fundingGoal: 3000000,
    currentFunding: 1400000,
    minimumInvestment: 750,
    maximumInvestment: 100000,
    founders: [
      {
        name: 'Dr. Amanda Foster',
        role: 'CEO & Founder',
        email: 'amanda@mindfulai.com',
        linkedin: 'https://linkedin.com/in/amandafoster'
      },
      {
        name: 'Kevin Zhang',
        role: 'Head of AI Development',
        email: 'kevin@mindfulai.com',
        linkedin: 'https://linkedin.com/in/kevinzhang'
      }
    ],
    createdAt: '2024-01-30'
  },
  {
    id: '9',
    name: 'QuantumNet',
    tagline: 'Quantum-secured internet infrastructure',
    description: 'QuantumNet is building the world\'s first quantum-encrypted internet infrastructure, providing unbreakable cybersecurity for businesses and governments. Our quantum key distribution network ensures that all data transmitted through our platform is theoretically impossible to hack, even by quantum computers. We\'ve already secured partnerships with three major telecommunications companies and have deployed pilot networks in 5 cities. Our technology addresses the growing threat of quantum computing to current encryption methods, positioning us at the forefront of next-generation cybersecurity. Major tech companies are already expressing interest in licensing our quantum protocols.',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Cybersecurity',
    fundingGoal: 12000000,
    currentFunding: 4800000,
    minimumInvestment: 10000,
    maximumInvestment: 1000000,
    founders: [
      {
        name: 'Dr. Elena Vasquez',
        role: 'CEO & Co-Founder',
        email: 'elena@quantumnet.com',
        linkedin: 'https://linkedin.com/in/elenavasquez'
      },
      {
        name: 'Prof. Zhang Wei',
        role: 'Chief Quantum Officer',
        email: 'zhang@quantumnet.com',
        linkedin: 'https://linkedin.com/in/zhangwei'
      }
    ],
    createdAt: '2024-02-20'
  },
  {
    id: '10',
    name: 'NeuroPilot',
    tagline: 'Brain-computer interfaces for paralyzed patients',
    description: 'NeuroPilot is developing revolutionary brain-computer interface technology that allows paralyzed patients to control devices, computers, and prosthetics using only their thoughts. Our non-invasive neural sensors can decode motor intentions from brain signals with 95% accuracy, giving patients unprecedented independence. We\'ve successfully completed trials with 50 patients, enabling them to control wheelchairs, type messages, and even play games using their minds. Our technology represents a breakthrough in neuroplasticity research and has applications beyond paralysis, including treating depression, anxiety, and cognitive disorders. We\'re working with leading hospitals and have FDA fast-track designation.',
    image: 'https://images.unsplash.com/photo-1587613991119-fbbe8e90531d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'BioTech',
    fundingGoal: 25000000,
    currentFunding: 8900000,
    minimumInvestment: 5000,
    maximumInvestment: 500000,
    founders: [
      {
        name: 'Dr. Marcus Reed',
        role: 'CEO & Founder',
        email: 'marcus@neuropilot.com',
        linkedin: 'https://linkedin.com/in/marcusreed'
      },
      {
        name: 'Dr. Sarah Kim',
        role: 'Head of Neuroscience',
        email: 'sarah@neuropilot.com',
        linkedin: 'https://linkedin.com/in/sarahkim'
      }
    ],
    createdAt: '2024-01-10'
  },
  {
    id: '11',
    name: 'OceanHarvest',
    tagline: 'Sustainable seaweed farming for climate solutions',
    description: 'OceanHarvest is revolutionizing ocean agriculture through large-scale seaweed farming that simultaneously produces sustainable food, biofuels, and carbon credits. Our floating farm platforms can be deployed in open ocean areas, requiring no freshwater, fertilizer, or arable land. Seaweed grows 30 times faster than land-based crops and absorbs massive amounts of CO2 from the atmosphere and ocean. We\'ve developed proprietary cultivation techniques that increase yield by 200% while maintaining ecosystem health. Our harvested seaweed is processed into high-protein food ingredients, biodegradable packaging materials, and advanced biofuels. Major food corporations and governments are partnering with us to scale sustainable ocean farming globally.',
    image: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Climate Tech',
    fundingGoal: 18000000,
    currentFunding: 7200000,
    minimumInvestment: 2500,
    maximumInvestment: 750000,
    founders: [
      {
        name: 'Captain Marina Santos',
        role: 'CEO & Co-Founder',
        email: 'marina@oceanharvest.com',
        linkedin: 'https://linkedin.com/in/marinasantos'
      },
      {
        name: 'Dr. Kai Nakamura',
        role: 'Chief Marine Biologist',
        email: 'kai@oceanharvest.com',
        linkedin: 'https://linkedin.com/in/kainakamura'
      }
    ],
    createdAt: '2024-01-28'
  },
  {
    id: '12',
    name: 'MetaForge',
    tagline: 'AI-powered 3D content creation platform',
    description: 'MetaForge is democratizing 3D content creation through AI that can generate photorealistic 3D models, environments, and animations from simple text descriptions or 2D images. Our platform reduces 3D content creation time from weeks to minutes, making it accessible to game developers, filmmakers, architects, and e-commerce businesses. Using advanced machine learning and neural radiance fields, our AI understands spatial relationships, physics, and artistic style to create production-ready 3D assets. We\'ve processed over 1 million 3D model generations and work with major gaming studios, VR companies, and metaverse platforms. Our technology is becoming essential infrastructure for the growing virtual economy and digital twin applications.',
    image: 'https://images.unsplash.com/photo-1518709414372-5c29e02cd2ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'AI/ML',
    fundingGoal: 15000000,
    currentFunding: 6100000,
    minimumInvestment: 1000,
    maximumInvestment: 400000,
    founders: [
      {
        name: 'Alex Chen',
        role: 'CEO & Co-Founder',
        email: 'alex@metaforge.ai',
        linkedin: 'https://linkedin.com/in/alexchen3d'
      },
      {
        name: 'Dr. Yuki Tanaka',
        role: 'Head of AI Research',
        email: 'yuki@metaforge.ai',
        linkedin: 'https://linkedin.com/in/yukitanaka'
      }
    ],
    createdAt: '2024-02-05'
  },
  {
    id: '13',
    name: 'SkyMobility',
    tagline: 'Urban air mobility with electric flying vehicles',
    description: 'SkyMobility is developing electric vertical takeoff and landing (eVTOL) aircraft for urban transportation, offering a revolutionary solution to traffic congestion in major cities. Our autonomous flying vehicles can transport passengers between rooftops, helipads, and designated sky ports, reducing commute times by up to 80%. We\'ve completed over 500 test flights and received conditional approval from aviation authorities in 3 countries. Our aircraft features redundant safety systems, quiet electric propulsion, and AI-powered flight control systems. We\'re building the infrastructure for aerial ride-sharing services and have pre-orders from ride-sharing companies and luxury transportation services. The urban air mobility market is expected to reach $1 trillion by 2040.',
    image: 'https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Transportation',
    fundingGoal: 50000000,
    currentFunding: 18500000,
    minimumInvestment: 25000,
    maximumInvestment: 2000000,
    founders: [
      {
        name: 'Captain James Wright',
        role: 'CEO & Co-Founder',
        email: 'james@skymobility.com',
        linkedin: 'https://linkedin.com/in/jameswright'
      },
      {
        name: 'Dr. Lisa Rodriguez',
        role: 'Chief Technology Officer',
        email: 'lisa@skymobility.com',
        linkedin: 'https://linkedin.com/in/lisarodriguez'
      }
    ],
    createdAt: '2024-02-25'
  },
  {
    id: '14',
    name: 'CryptoShield',
    tagline: 'Decentralized identity and privacy protection',
    description: 'CryptoShield is building a decentralized identity platform that gives users complete control over their personal data while enabling secure, privacy-preserving interactions online. Our zero-knowledge proof technology allows identity verification without revealing sensitive information, solving the privacy paradox of the digital age. Users can prove their age, location, or credentials without exposing actual data to third parties. We\'ve partnered with major social media platforms, financial institutions, and government agencies to implement privacy-first identity solutions. Our platform reduces identity theft by 99% compared to traditional systems and ensures compliance with global privacy regulations. The decentralized identity market is growing rapidly as data privacy becomes a fundamental human right.',
    image: 'https://images.unsplash.com/photo-1563207153-f403bf289096?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Blockchain',
    fundingGoal: 8000000,
    currentFunding: 3400000,
    minimumInvestment: 1500,
    maximumInvestment: 300000,
    founders: [
      {
        name: 'Dr. Amara Okafor',
        role: 'CEO & Founder',
        email: 'amara@cryptoshield.io',
        linkedin: 'https://linkedin.com/in/amaraokafor'
      },
      {
        name: 'Viktor Petrov',
        role: 'Lead Cryptographer',
        email: 'viktor@cryptoshield.io',
        linkedin: 'https://linkedin.com/in/viktorpetrov'
      }
    ],
    createdAt: '2024-01-15'
  },
  {
    id: '15',
    name: 'BioRegenix',
    tagline: '3D bioprinting for organ transplantation',
    description: 'BioRegenix is pioneering 3D bioprinting technology to create functional human organs for transplantation, addressing the critical shortage of donor organs worldwide. Using a patient\'s own stem cells, we can bioprint personalized organs that are immunologically compatible, eliminating rejection risks. Our proprietary bio-inks and printing processes have successfully created functional kidney, liver, and heart tissue that integrates with existing vasculature. We\'ve completed successful animal trials and are preparing for human clinical trials. Over 100,000 people die annually waiting for organ transplants - our technology could save millions of lives while reducing healthcare costs by billions. We\'re working with leading hospitals and have breakthrough therapy designation for our bioprinted kidneys.',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'BioTech',
    fundingGoal: 35000000,
    currentFunding: 12800000,
    minimumInvestment: 10000,
    maximumInvestment: 1500000,
    founders: [
      {
        name: 'Dr. Isabella Martinez',
        role: 'CEO & Co-Founder',
        email: 'isabella@bioregenix.com',
        linkedin: 'https://linkedin.com/in/isabellamartinez'
      },
      {
        name: 'Dr. Robert Chen',
        role: 'Chief Scientific Officer',
        email: 'robert@bioregenix.com',
        linkedin: 'https://linkedin.com/in/robertchen'
      }
    ],
    createdAt: '2024-02-12'
  },
  {
    id: '16',
    name: 'DataVault',
    tagline: 'Personal data monetization marketplace',
    description: 'DataVault is creating a secure marketplace where individuals can monetize their personal data while maintaining complete privacy and control. Our platform uses advanced encryption and blockchain technology to allow users to selectively share anonymized data insights with researchers, marketers, and AI companies in exchange for direct compensation. Users earn money from their browsing habits, purchase history, location data, and preferences without revealing their identity. We\'ve built partnerships with major consumer brands and research institutions who need high-quality, ethically-sourced data for market research and AI training. Our platform gives people ownership of their digital footprint and creates a fair economy around personal data, which is currently exploited by big tech companies for free.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    category: 'Data Economy',
    fundingGoal: 10000000,
    currentFunding: 4200000,
    minimumInvestment: 500,
    maximumInvestment: 250000,
    founders: [
      {
        name: 'Emma Thompson',
        role: 'CEO & Co-Founder',
        email: 'emma@datavault.io',
        linkedin: 'https://linkedin.com/in/emmathompson'
      },
      {
        name: 'Dr. Hassan Ali',
        role: 'Chief Privacy Officer',
        email: 'hassan@datavault.io',
        linkedin: 'https://linkedin.com/in/hassanali'
      }
    ],
    createdAt: '2024-01-22'
  }
];