import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { ComparisonProvider } from './context/ComparisonContext';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import StartupDetailPage from './pages/StartupDetailPage';
import PortfolioPage from './pages/PortfolioPage';
import ComparisonPage from './pages/ComparisonPage';
import ComparisonPanel from './components/ComparisonPanel';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <PortfolioProvider>
        <ComparisonProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="startup/:id" element={<StartupDetailPage />} />
                <Route path="portfolio" element={<PortfolioPage />} />
                <Route path="compare" element={<ComparisonPage />} />
              </Route>
            </Routes>
            <ComparisonPanel />
          </Router>
        </ComparisonProvider>
      </PortfolioProvider>
    </ThemeProvider>
  );
}

export default App;
