import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Startup } from '../types/Startup';

interface PortfolioEntry {
  startup: Startup;
  investmentAmount: number;
  investmentDate: string;
}

interface PortfolioValuePoint {
  date: string;
  value: number;
  totalInvestments: number;
}

interface PortfolioContextType {
  portfolioStartups: Startup[];
  portfolioEntries: PortfolioEntry[];
  portfolioValueHistory: PortfolioValuePoint[];
  addToPortfolio: (startup: Startup, amount?: number) => void;
  removeFromPortfolio: (startupId: string) => void;
  isInPortfolio: (startupId: string) => boolean;
  getTotalPortfolioValue: () => number;
  getTotalInvested: () => number;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

interface PortfolioProviderProps {
  children: ReactNode;
}

export const PortfolioProvider: React.FC<PortfolioProviderProps> = ({ children }) => {
  const [portfolioStartups, setPortfolioStartups] = useState<Startup[]>([]);
  const [portfolioEntries, setPortfolioEntries] = useState<PortfolioEntry[]>([]);
  const [portfolioValueHistory, setPortfolioValueHistory] = useState<PortfolioValuePoint[]>([]);

  const addToPortfolio = (startup: Startup, amount = 1000) => {
    setPortfolioStartups(prev => {
      if (!prev.find(s => s.id === startup.id)) {
        return [...prev, startup];
      }
      return prev;
    });

    setPortfolioEntries(prev => {
      if (!prev.find(e => e.startup.id === startup.id)) {
        const newEntry: PortfolioEntry = {
          startup,
          investmentAmount: amount,
          investmentDate: new Date().toISOString().split('T')[0]
        };
        const newEntries = [...prev, newEntry];
        
        // Update portfolio value history
        const totalValue = newEntries.reduce((sum, entry) => sum + entry.investmentAmount, 0);
        const totalInvestments = newEntries.length;
        
        setPortfolioValueHistory(prevHistory => [
          ...prevHistory,
          {
            date: new Date().toISOString().split('T')[0],
            value: totalValue,
            totalInvestments
          }
        ]);
        
        return newEntries;
      }
      return prev;
    });
  };

  const removeFromPortfolio = (startupId: string) => {
    setPortfolioStartups(prev => prev.filter(s => s.id !== startupId));
    setPortfolioEntries(prev => {
      const filtered = prev.filter(e => e.startup.id !== startupId);
      
      // Update portfolio value history
      const totalValue = filtered.reduce((sum, entry) => sum + entry.investmentAmount, 0);
      const totalInvestments = filtered.length;
      
      if (totalInvestments === 0) {
        setPortfolioValueHistory([]);
      } else {
        setPortfolioValueHistory(prevHistory => [
          ...prevHistory,
          {
            date: new Date().toISOString().split('T')[0],
            value: totalValue,
            totalInvestments
          }
        ]);
      }
      
      return filtered;
    });
  };

  const isInPortfolio = (startupId: string) => {
    return portfolioStartups.some(s => s.id === startupId);
  };

  const getTotalPortfolioValue = () => {
    return portfolioEntries.reduce((sum, entry) => sum + entry.investmentAmount, 0);
  };

  const getTotalInvested = () => {
    return portfolioEntries.reduce((sum, entry) => sum + entry.investmentAmount, 0);
  };

  return (
    <PortfolioContext.Provider value={{
      portfolioStartups,
      portfolioEntries,
      portfolioValueHistory,
      addToPortfolio,
      removeFromPortfolio,
      isInPortfolio,
      getTotalPortfolioValue,
      getTotalInvested
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};