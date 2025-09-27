import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Startup } from '../types/Startup';
import StartupCard from '../components/StartupCard';
import SearchFilters from '../components/SearchFilters';
import { mockStartups } from '../data/mockData';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setStartups(mockStartups);
      setFilteredStartups(mockStartups);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    let filtered = startups;

    if (searchTerm) {
      filtered = filtered.filter(startup =>
        startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
        startup.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(startup =>
        startup.category === selectedCategory
      );
    }

    setFilteredStartups(filtered);
  }, [startups, searchTerm, selectedCategory]);

  const handleStartupClick = (startupId: string) => {
    navigate(`/startup/${startupId}`);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading amazing startups...</p>
      </div>
    );
  }

  return (
    <main className="home-page" role="main" aria-label="Startup investment platform">
      <section className="hero-section" role="banner">
        <h1>Discover the Next Big Thing</h1>
        <p>Invest in innovative startups and help shape the future</p>
      </section>

      <section className="search-section" aria-labelledby="search-heading">
        <h2 id="search-heading" className="visually-hidden">Search and Filter Startups</h2>
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={Array.from(new Set(startups.map(s => s.category)))}
        />
      </section>

      <section className="results-section" aria-labelledby="results-heading">
        <div className="results-header">
          <h2 id="results-heading">
            {filteredStartups.length} Startup{filteredStartups.length !== 1 ? 's' : ''} Available
          </h2>
        </div>

        <div 
          className="startups-grid" 
          role="grid" 
          aria-label="Available startups for investment"
          aria-rowcount={Math.ceil(filteredStartups.length / 3)}
        >
          {filteredStartups.map((startup, index) => (
            <div 
              key={startup.id}
              role="gridcell"
              aria-rowindex={Math.floor(index / 3) + 1}
              aria-colindex={(index % 3) + 1}
            >
              <StartupCard
                startup={startup}
                onClick={() => handleStartupClick(startup.id)}
              />
            </div>
          ))}
        </div>

        {filteredStartups.length === 0 && (
          <div className="no-results" role="status" aria-live="polite">
            <h3>No startups found</h3>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default HomePage;