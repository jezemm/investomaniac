import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Startup } from '../types/Startup';
import './InvestmentModal.css';

interface InvestmentModalProps {
  startup: Startup;
  onClose: () => void;
  onInvestmentComplete: (amount: number) => void;
}

const InvestmentModal: React.FC<InvestmentModalProps> = ({
  startup,
  onClose,
  onInvestmentComplete
}) => {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');
  const [investorName, setInvestorName] = useState('');
  const [investorEmail, setInvestorEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const presetAmounts = [100, 500, 1000, 2500, 5000, 10000];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getInvestmentAmount = () => {
    return selectedAmount || parseFloat(customAmount) || 0;
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    const amount = getInvestmentAmount();

    if (!investorName.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!investorEmail.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(investorEmail)) {
      newErrors.email = 'Email is invalid';
    }

    if (amount <= 0) {
      newErrors.amount = 'Please select or enter an investment amount';
    } else if (amount < startup.minimumInvestment) {
      newErrors.amount = `Minimum investment is ${formatCurrency(startup.minimumInvestment)}`;
    } else if (amount > startup.maximumInvestment) {
      newErrors.amount = `Maximum investment is ${formatCurrency(startup.maximumInvestment)}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      onInvestmentComplete(getInvestmentAmount());
      
      setTimeout(() => {
        onClose();
      }, 2000);
    }, 1500);
  };

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
    if (errors.amount) {
      setErrors({ ...errors, amount: '' });
    }
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    if (errors.amount) {
      setErrors({ ...errors, amount: '' });
    }
  };

  if (showSuccess) {
    return (
      <div className="modal-overlay">
        <motion.div
          className="modal-content success-modal"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="success-icon">✓</div>
          <h2>Investment Successful!</h2>
          <p>Thank you for investing {formatCurrency(getInvestmentAmount())} in {startup.name}</p>
          <p>You'll receive a confirmation email shortly.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence>
      <div 
        className="modal-overlay" 
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <motion.div
          className="modal-content investment-modal"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="modal-header">
            <h2 id="modal-title">Invest in {startup.name}</h2>
            <button 
              className="close-button" 
              onClick={onClose}
              aria-label="Close investment modal"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="investment-form" noValidate>
            <div className="startup-summary" id="modal-description">
              <img src={startup.image} alt={`${startup.name} company logo`} className="modal-startup-image" />
              <div>
                <h3>{startup.name}</h3>
                <p>{startup.tagline}</p>
                <div className="investment-range" aria-label={`Investment range from ${formatCurrency(startup.minimumInvestment)} to ${formatCurrency(startup.maximumInvestment)}`}>
                  Investment Range: {formatCurrency(startup.minimumInvestment)} - {formatCurrency(startup.maximumInvestment)}
                </div>
              </div>
            </div>

            <div className="form-section">
              <label className="form-label" id="amount-label">Investment Amount</label>
              <div className="amount-selection">
                <div className="preset-amounts" role="group" aria-labelledby="amount-label">
                  {presetAmounts.map(amount => (
                    <button
                      key={amount}
                      type="button"
                      className={`preset-amount ${selectedAmount === amount ? 'selected' : ''}`}
                      onClick={() => handleAmountSelect(amount)}
                      disabled={amount < startup.minimumInvestment || amount > startup.maximumInvestment}
                      aria-pressed={selectedAmount === amount}
                      aria-label={`Select ${formatCurrency(amount)} investment amount`}
                    >
                      {formatCurrency(amount)}
                    </button>
                  ))}
                </div>
                
                <div className="custom-amount">
                  <label htmlFor="custom-amount-input" className="visually-hidden">Enter custom investment amount</label>
                  <input
                    id="custom-amount-input"
                    type="number"
                    placeholder="Custom amount"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    className={`custom-amount-input ${errors.amount ? 'error' : ''}`}
                    min={startup.minimumInvestment}
                    max={startup.maximumInvestment}
                    aria-describedby={errors.amount ? 'amount-error' : undefined}
                    aria-invalid={!!errors.amount}
                  />
                </div>
              </div>
              {errors.amount && (
                <div className="error-message" id="amount-error" role="alert" aria-live="polite">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  {errors.amount}
                </div>
              )}
            </div>

            <div className="form-section">
              <label className="form-label">Your Information</label>
              <label htmlFor="investor-name" className="visually-hidden">Full Name</label>
              <input
                id="investor-name"
                type="text"
                placeholder="Full Name"
                value={investorName}
                onChange={(e) => setInvestorName(e.target.value)}
                className={`form-input ${errors.name ? 'error' : ''}`}
                aria-describedby={errors.name ? 'name-error' : undefined}
                aria-invalid={!!errors.name}
                required
              />
              {errors.name && (
                <div className="error-message" id="name-error" role="alert" aria-live="polite">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  {errors.name}
                </div>
              )}
              
              <label htmlFor="investor-email" className="visually-hidden">Email Address</label>
              <input
                id="investor-email"
                type="email"
                placeholder="Email Address"
                value={investorEmail}
                onChange={(e) => setInvestorEmail(e.target.value)}
                className={`form-input ${errors.email ? 'error' : ''}`}
                aria-describedby={errors.email ? 'email-error' : undefined}
                aria-invalid={!!errors.email}
                required
              />
              {errors.email && (
                <div className="error-message" id="email-error" role="alert" aria-live="polite">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="15" y1="9" x2="9" y2="15"/>
                    <line x1="9" y1="9" x2="15" y2="15"/>
                  </svg>
                  {errors.email}
                </div>
              )}
            </div>

            <div className="investment-summary">
              <div className="summary-row">
                <span>Investment Amount:</span>
                <span className="amount">{formatCurrency(getInvestmentAmount())}</span>
              </div>
              <div className="summary-row">
                <span>Processing Fee:</span>
                <span className="amount">$0</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span className="amount">{formatCurrency(getInvestmentAmount())}</span>
              </div>
            </div>

            <button
              type="submit"
              className="invest-submit-button"
              disabled={isSubmitting}
              aria-describedby="submit-description"
            >
              {isSubmitting ? 'Processing...' : `Invest ${formatCurrency(getInvestmentAmount())}`}
            </button>
            <div id="submit-description" className="visually-hidden">
              {isSubmitting ? 'Processing your investment request' : `Submit investment of ${formatCurrency(getInvestmentAmount())} in ${startup.name}`}
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default InvestmentModal;