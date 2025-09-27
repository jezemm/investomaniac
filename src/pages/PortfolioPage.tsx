import React from 'react';
import { useNavigate } from 'react-router-dom';
import { usePortfolio } from '../context/PortfolioContext';
import StartupCard from '../components/StartupCard';
import PortfolioChart from '../components/PortfolioChart';
import './PortfolioPage.css';

const PortfolioPage: React.FC = () => {
  const { portfolioStartups, getTotalPortfolioValue, getTotalInvested } = usePortfolio();
  const navigate = useNavigate();

  const handleStartupClick = (startupId: string) => {
    navigate(`/startup/${startupId}`);
  };

  return (
    <main className="portfolio-page" role="main" aria-labelledby="portfolio-title">
      <div className="portfolio-header">
        <h1 className="portfolio-title">My Investment Portfolio</h1>
        <p className="portfolio-subtitle">
          Track your investments and manage your startup portfolio
        </p>
      </div>

      {portfolioStartups.length === 0 ? (
        <div className="empty-portfolio">
          <div className="empty-icon">💼</div>
          <h2>Your portfolio is empty</h2>
          <p>Start investing in innovative startups to build your portfolio</p>
          <button 
            className="browse-button"
            onClick={() => navigate('/')}
          >
            Browse Startups
          </button>
        </div>
      ) : (
        <>
          <PortfolioChart />
          
          <div className="portfolio-stats">
            <div className="stat-card">
              <div className="stat-value">{portfolioStartups.length}</div>
              <div className="stat-label">Active Investments</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                ${getTotalInvested().toLocaleString()}
              </div>
              <div className="stat-label">Total Invested</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                ${getTotalPortfolioValue().toLocaleString()}
              </div>
              <div className="stat-label">Portfolio Value</div>
            </div>
            <div className="stat-card">
              <div className="stat-value">
                {portfolioStartups.length > 0 ? 
                  Math.round(portfolioStartups.reduce((total, startup) => 
                    total + (startup.currentFunding / startup.fundingGoal * 100), 0) / portfolioStartups.length
                  ) : 0}%
              </div>
              <div className="stat-label">Average Progress</div>
            </div>
          </div>

          <div className="portfolio-grid">
            {portfolioStartups.map(startup => (
              <StartupCard
                key={startup.id}
                startup={startup}
                onClick={() => handleStartupClick(startup.id)}
              />
            ))}
          </div>
        </>
      )}
    </main>
  );
};

export default PortfolioPage;