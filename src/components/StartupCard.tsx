import React from 'react';
import { motion } from 'framer-motion';
import { Startup } from '../types/Startup';
import { usePortfolio } from '../context/PortfolioContext';
import { useComparison } from '../context/ComparisonContext';
import './StartupCard.css';

interface StartupCardProps {
  startup: Startup;
  onClick: () => void;
}

const StartupCard: React.FC<StartupCardProps> = ({ startup, onClick }) => {
  const { isInPortfolio } = usePortfolio();
  const { addToComparison, removeFromComparison, isInComparison, canAddMore } = useComparison();
  const isInvested = isInPortfolio(startup.id);
  const isCompared = isInComparison(startup.id);
  
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getProgressPercentage = () => {
    return Math.min((startup.currentFunding / startup.fundingGoal) * 100, 100);
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCompared) {
      removeFromComparison(startup.id);
    } else {
      addToComparison(startup);
    }
  };

  return (
    <motion.div
      className={`startup-card ${isInvested ? 'invested' : ''}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${startup.name}`}
      whileHover={{ y: -8, boxShadow: "0 20px 40px rgba(0,0,0,0.15)" }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="card-image-container">
        <img src={startup.image} alt={startup.name} className="card-image" />
        <div className="category-badge">{startup.category}</div>
        {isInvested && (
          <div className="invested-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
            Invested
          </div>
        )}
        <button
          className={`compare-button ${isCompared ? 'active' : ''}`}
          onClick={handleCompareClick}
          disabled={!isCompared && !canAddMore}
          aria-label={isCompared ? `Remove ${startup.name} from comparison` : `Add ${startup.name} to comparison`}
          title={isCompared ? 'Remove from comparison' : 'Add to comparison'}
        >
          {isCompared ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              <span>Remove</span>
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 12l2 2 4-4"/>
                <path d="M21 12c-1 0-3-1-3-3s2-3 3-3 3 1 3 3-2 3-3 3"/>
                <path d="M3 12c1 0 3-1 3-3s-2-3-3-3-3 1-3 3 2 3 3 3"/>
                <path d="M12 3v6m0 6v6"/>
              </svg>
              <span>Compare</span>
            </>
          )}
        </button>
      </div>
      
      <div className="card-content">
        <h3 className="card-title">{startup.name}</h3>
        <p className="card-tagline">{startup.tagline}</p>
        
        <div className="funding-progress">
          <div className="progress-info">
            <span className="raised-amount">{formatCurrency(startup.currentFunding)} raised</span>
            <span className="goal-amount">of {formatCurrency(startup.fundingGoal)}</span>
          </div>
          <div className="progress-bar" role="progressbar" aria-valuenow={getProgressPercentage()} aria-valuemin={0} aria-valuemax={100} aria-label={`Funding progress: ${getProgressPercentage().toFixed(0)}% of goal reached`}>
            <div 
              className="progress-fill" 
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
          <div className="progress-percentage">
            {getProgressPercentage().toFixed(0)}% funded
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default StartupCard;