import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { usePortfolio } from '../context/PortfolioContext';
import './PortfolioChart.css';

const PortfolioChart: React.FC = () => {
  const { portfolioValueHistory, portfolioEntries } = usePortfolio();

  // Generate mock historical data for demonstration
  const chartData = useMemo(() => {
    if (portfolioValueHistory.length === 0) {
      return [];
    }

    // If we have real data, use it, otherwise generate mock data for better visualization
    if (portfolioValueHistory.length < 5) {
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 6);
      
      const mockData = [];
      const totalCurrentValue = portfolioValueHistory[portfolioValueHistory.length - 1]?.value || 0;
      
      // Generate 6 months of mock data leading up to current value
      for (let i = 0; i < 180; i += 7) { // Weekly data points
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        
        // Simulate portfolio growth with some volatility
        const progress = i / 180;
        const baseGrowth = totalCurrentValue * progress;
        const volatility = Math.sin(i * 0.1) * (totalCurrentValue * 0.1) * Math.random();
        const value = Math.max(0, baseGrowth + volatility);
        
        mockData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: Math.round(value),
          fullDate: date.toISOString().split('T')[0]
        });
      }
      
      // Add current real data point
      portfolioValueHistory.forEach(point => {
        const date = new Date(point.date);
        mockData.push({
          date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          value: point.value,
          fullDate: point.date
        });
      });
      
      return mockData.sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime());
    }
    
    return portfolioValueHistory.map(point => {
      const date = new Date(point.date);
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        value: point.value,
        fullDate: point.date
      };
    });
  }, [portfolioValueHistory]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  if (portfolioEntries.length === 0) {
    return (
      <div className="portfolio-chart-container">
        <h3 className="chart-title">Portfolio Value Over Time</h3>
        <div className="empty-chart">
          <div className="empty-chart-icon">📈</div>
          <p>Your portfolio chart will appear here once you make your first investment</p>
        </div>
      </div>
    );
  }

  return (
    <div className="portfolio-chart-container">
      <h3 className="chart-title">Portfolio Value Over Time</h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--text-secondary)"
              fontSize={12}
              tickLine={false}
            />
            <YAxis 
              stroke="var(--text-secondary)"
              fontSize={12}
              tickLine={false}
              tickFormatter={formatCurrency}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '12px',
                backdropFilter: 'blur(20px)',
                color: 'var(--text-primary)'
              }}
              labelStyle={{ color: 'var(--text-secondary)' }}
              formatter={(value: number) => [formatCurrency(value), 'Portfolio Value']}
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="url(#portfolioGradient)" 
              strokeWidth={3}
              dot={false}
              activeDot={{ 
                r: 6, 
                stroke: 'var(--accent-primary)', 
                strokeWidth: 2,
                fill: 'var(--bg-primary)'
              }}
            />
            <defs>
              <linearGradient id="portfolioGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--accent-primary)" />
                <stop offset="100%" stopColor="var(--accent-blue)" />
              </linearGradient>
            </defs>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PortfolioChart;