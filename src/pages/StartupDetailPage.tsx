import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Startup } from '../types/Startup';
import { usePortfolio } from '../context/PortfolioContext';
import InvestmentModal from '../components/InvestmentModal';
import { fetchYCCompanies } from '../services/ycService';
import './StartupDetailPage.css';

const StartupDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { isInPortfolio, addToPortfolio, removeFromPortfolio } = usePortfolio();
  const [startup, setStartup] = useState<Startup | null>(null);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStartup = async () => {
      if (id) {
        try {
          setLoading(true);
          const ycCompanies = await fetchYCCompanies();
          const foundStartup = ycCompanies.find(s => s.id === id);
          setStartup(foundStartup || null);
        } catch (error) {
          console.error('Failed to load startup:', error);
          setStartup(null);
        } finally {
          setLoading(false);
        }
      }
    };

    loadStartup();
  }, [id]);

  const handleInvestmentComplete = (amount: number) => {
    if (startup) {
      const updatedStartup = {
        ...startup,
        currentFunding: startup.currentFunding + amount
      };
      setStartup(updatedStartup);
      addToPortfolio(updatedStartup, amount);
    }
  };

  const handleSellInvestment = () => {
    if (startup) {
      removeFromPortfolio(startup.id);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressPercentage = () => {
    if (!startup) return 0;
    return Math.min((startup.currentFunding / startup.fundingGoal) * 100, 100);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading startup details...</p>
      </div>
    );
  }

  if (!startup) {
    return (
      <div className="error-container">
        <h2>Startup not found</h2>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Browse
        </button>
      </div>
    );
  }

  return (
    <motion.div
      className="startup-detail-page"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button onClick={() => navigate('/')} className="back-button">
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
        Back to Browse
      </button>

      <div className="startup-hero">
        <div className="startup-image-container">
          <img src={startup.image} alt={startup.name} className="startup-image" />
          <div className="category-badge">{startup.category}</div>
        </div>
        
        <div className="startup-info">
          <h1 className="startup-name">{startup.name}</h1>
          <p className="startup-tagline">{startup.tagline}</p>
          
          <div className="funding-section">
            <div className="progress-bar-container">
              <div className="progress-labels">
                <span>Raised: {formatCurrency(startup.currentFunding)}</span>
                <span>Goal: {formatCurrency(startup.fundingGoal)}</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
              <div className="progress-percentage">
                {getProgressPercentage().toFixed(0)}% funded
              </div>
            </div>
            
            {isInPortfolio(startup.id) ? (
              <button 
                className="sell-button"
                onClick={handleSellInvestment}
              >
                Sell Investment
              </button>
            ) : (
              <button 
                className="invest-button"
                onClick={() => setShowInvestmentModal(true)}
              >
                Invest Now
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="startup-content">
        <div className="description-section">
          <h2>About This Startup</h2>
          <p className="startup-description">{startup.description}</p>
        </div>

        <div className="founders-section">
          <h2>Meet the Founders</h2>
          <div className="founders-list">
            {startup.founders.map((founder, index) => (
              <div key={index} className="founder-card">
                <h3>{founder.name}</h3>
                <p className="founder-role">{founder.role}</p>
                <div className="founder-contact">
                  <a href={`mailto:${founder.email}`} className="contact-link">
                    {founder.email}
                  </a>
                  {founder.linkedin && (
                    <a 
                      href={founder.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="investment-info">
          <h2>Investment Details</h2>
          <div className="investment-details">
            <div className="detail-item">
              <span className="label">Minimum Investment:</span>
              <span className="value">{formatCurrency(startup.minimumInvestment)}</span>
            </div>
            <div className="detail-item">
              <span className="label">Maximum Investment:</span>
              <span className="value">{formatCurrency(startup.maximumInvestment)}</span>
            </div>
            <div className="detail-item">
              <span className="label">Funding Goal:</span>
              <span className="value">{formatCurrency(startup.fundingGoal)}</span>
            </div>
          </div>
        </div>
      </div>

      {showInvestmentModal && (
        <InvestmentModal
          startup={startup}
          onClose={() => setShowInvestmentModal(false)}
          onInvestmentComplete={handleInvestmentComplete}
        />
      )}
    </motion.div>
  );
};

export default StartupDetailPage;