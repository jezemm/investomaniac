import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Startup } from '../types/Startup';
import { mockStartups } from '../data/mockData';
import { usePortfolio } from '../context/PortfolioContext';
import InvestmentModal from '../components/InvestmentModal';
import './ComparisonPage.css';

const ComparisonPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [startups, setStartups] = useState<Startup[]>([]);
  const [showInvestmentModal, setShowInvestmentModal] = useState(false);
  const [selectedStartup, setSelectedStartup] = useState<Startup | null>(null);
  const { isInPortfolio, addToPortfolio } = usePortfolio();

  useEffect(() => {
    const ids = searchParams.get('ids')?.split(',') || [];
    const foundStartups = ids.map(id => mockStartups.find(s => s.id === id)).filter(Boolean) as Startup[];
    setStartups(foundStartups);
  }, [searchParams]);

  const handleInvest = (startup: Startup) => {
    setSelectedStartup(startup);
    setShowInvestmentModal(true);
  };

  const handleInvestmentComplete = (amount: number) => {
    if (selectedStartup) {
      addToPortfolio(selectedStartup, amount);
      setShowInvestmentModal(false);
      setSelectedStartup(null);
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

  const getProgressPercentage = (startup: Startup) => {
    return Math.min((startup.currentFunding / startup.fundingGoal) * 100, 100);
  };

  const getRiskLevel = (startup: Startup) => {
    const progress = getProgressPercentage(startup);
    if (progress > 70) return { level: 'Low', color: 'var(--accent-primary)' };
    if (progress > 40) return { level: 'Medium', color: 'var(--accent-blue)' };
    return { level: 'High', color: 'var(--accent-secondary)' };
  };

  if (startups.length === 0) {
    return (
      <main className="comparison-page">
        <div className="empty-comparison">
          <h1>No Startups to Compare</h1>
          <p>Please select startups from the browse page to compare them.</p>
          <button 
            className="browse-button"
            onClick={() => navigate('/')}
          >
            Browse Startups
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="comparison-page" role="main" aria-labelledby="comparison-title">
      <header className="comparison-header">
        <button 
          className="back-button"
          onClick={() => navigate('/')}
          aria-label="Back to browse startups"
        >
          ← Back
        </button>
        <h1 id="comparison-title">Startup Comparison</h1>
        <p>Compare {startups.length} selected startups side by side</p>
      </header>

      <div className="comparison-grid" role="grid" aria-label="Startup comparison table">
        <div className="comparison-row header-row">
          <div className="metric-label">Metric</div>
          {startups.map(startup => (
            <div key={startup.id} className="startup-header">
              <img src={startup.image} alt={startup.name} />
              <h3>{startup.name}</h3>
              <span className="category-badge">{startup.category}</span>
            </div>
          ))}
        </div>

        <div className="comparison-row">
          <div className="metric-label">Tagline</div>
          {startups.map(startup => (
            <div key={startup.id} className="metric-value">
              {startup.tagline}
            </div>
          ))}
        </div>

        <div className="comparison-row">
          <div className="metric-label">Funding Goal</div>
          {startups.map(startup => (
            <div key={startup.id} className="metric-value highlight">
              {formatCurrency(startup.fundingGoal)}
            </div>
          ))}
        </div>

        <div className="comparison-row">
          <div className="metric-label">Current Funding</div>
          {startups.map(startup => (
            <div key={startup.id} className="metric-value">
              <div className="funding-info">
                <span>{formatCurrency(startup.currentFunding)}</span>
                <span className="progress-text">
                  ({getProgressPercentage(startup).toFixed(0)}% funded)
                </span>
              </div>
              <div className="progress-bar-small">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getProgressPercentage(startup)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="comparison-row">
          <div className="metric-label">Investment Range</div>
          {startups.map(startup => (
            <div key={startup.id} className="metric-value">
              {formatCurrency(startup.minimumInvestment)} - {formatCurrency(startup.maximumInvestment)}
            </div>
          ))}
        </div>

        <div className="comparison-row">
          <div className="metric-label">Risk Level</div>
          {startups.map(startup => {
            const risk = getRiskLevel(startup);
            return (
              <div key={startup.id} className="metric-value">
                <span 
                  className="risk-badge"
                  style={{ color: risk.color, borderColor: risk.color }}
                >
                  {risk.level}
                </span>
              </div>
            );
          })}
        </div>

        <div className="comparison-row">
          <div className="metric-label">Founded</div>
          {startups.map(startup => (
            <div key={startup.id} className="metric-value">
              {new Date(startup.createdAt).toLocaleDateString()}
            </div>
          ))}
        </div>

        <div className="comparison-row">
          <div className="metric-label">Founders</div>
          {startups.map(startup => (
            <div key={startup.id} className="metric-value">
              <div className="founders-list">
                {startup.founders.map((founder, index) => (
                  <div key={index} className="founder-item">
                    <span className="founder-name">{founder.name}</span>
                    <span className="founder-role">{founder.role}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="comparison-row">
          <div className="metric-label">Investment Status</div>
          {startups.map(startup => (
            <div key={startup.id} className="metric-value">
              {isInPortfolio(startup.id) ? (
                <span className="invested-status">✓ Invested</span>
              ) : (
                <button 
                  className="invest-button"
                  onClick={() => handleInvest(startup)}
                >
                  Invest Now
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {showInvestmentModal && selectedStartup && (
        <InvestmentModal
          startup={selectedStartup}
          onClose={() => setShowInvestmentModal(false)}
          onInvestmentComplete={handleInvestmentComplete}
        />
      )}
    </main>
  );
};

export default ComparisonPage;