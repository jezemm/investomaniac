import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Startup } from '../types/Startup';

interface ComparisonContextType {
  comparedStartups: Startup[];
  addToComparison: (startup: Startup) => void;
  removeFromComparison: (startupId: string) => void;
  clearComparison: () => void;
  isInComparison: (startupId: string) => boolean;
  canAddMore: boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};

interface ComparisonProviderProps {
  children: ReactNode;
}

export const ComparisonProvider: React.FC<ComparisonProviderProps> = ({ children }) => {
  const [comparedStartups, setComparedStartups] = useState<Startup[]>([]);
  const MAX_COMPARISONS = 3;

  const addToComparison = (startup: Startup) => {
    setComparedStartups(prev => {
      if (prev.length >= MAX_COMPARISONS || prev.find(s => s.id === startup.id)) {
        return prev;
      }
      return [...prev, startup];
    });
  };

  const removeFromComparison = (startupId: string) => {
    setComparedStartups(prev => prev.filter(s => s.id !== startupId));
  };

  const clearComparison = () => {
    setComparedStartups([]);
  };

  const isInComparison = (startupId: string) => {
    return comparedStartups.some(s => s.id === startupId);
  };

  const canAddMore = comparedStartups.length < MAX_COMPARISONS;

  return (
    <ComparisonContext.Provider value={{
      comparedStartups,
      addToComparison,
      removeFromComparison,
      clearComparison,
      isInComparison,
      canAddMore
    }}>
      {children}
    </ComparisonContext.Provider>
  );
};