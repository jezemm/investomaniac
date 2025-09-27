import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useComparison } from '../context/ComparisonContext';
import './ComparisonPanel.css';

const ComparisonPanel: React.FC = () => {
  const { comparedStartups, removeFromComparison, clearComparison } = useComparison();
  const navigate = useNavigate();

  if (comparedStartups.length === 0) return null;

  const handleCompare = () => {
    const ids = comparedStartups.map(s => s.id).join(',');
    navigate(`/compare?ids=${ids}`);
  };

  return (
    <AnimatePresence>
      <motion.div 
        className="comparison-panel"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        role="region"
        aria-label="Startup comparison panel"
      >
        <div className="panel-header">
          <h3>Compare Startups ({comparedStartups.length}/3)</h3>
          <button 
            className="clear-button"
            onClick={clearComparison}
            aria-label="Clear all comparisons"
          >
            Clear All
          </button>
        </div>
        
        <div className="compared-startups">
          {comparedStartups.map(startup => (
            <div key={startup.id} className="comparison-item">
              <img src={startup.image} alt={startup.name} />
              <div className="startup-info">
                <span className="name">{startup.name}</span>
                <span className="category">{startup.category}</span>
              </div>
              <button 
                className="remove-button"
                onClick={() => removeFromComparison(startup.id)}
                aria-label={`Remove ${startup.name} from comparison`}
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        {comparedStartups.length >= 2 && (
          <button 
            className="compare-button"
            onClick={handleCompare}
          >
            Compare Selected ({comparedStartups.length})
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default ComparisonPanel;