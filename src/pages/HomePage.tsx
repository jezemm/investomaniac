import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Startup } from '../types/Startup';
import StartupCard from '../components/StartupCard';
import SearchFilters from '../components/SearchFilters';
import Pagination from '../components/Pagination';
import { fetchYCCompanies } from '../services/ycService';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [startups, setStartups] = useState<Startup[]>([]);
  const [filteredStartups, setFilteredStartups] = useState<Startup[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'funding' | 'category'>('name');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 12;
  const navigate = useNavigate();

  useEffect(() => {
    const loadStartups = async () => {
      try {
        setLoading(true);
        const ycCompanies = await fetchYCCompanies();
        setStartups(ycCompanies);
        setFilteredStartups(ycCompanies);
      } catch (error) {
        console.error('Failed to load YC companies:', error);
        // You could add error handling here, maybe show a message
      } finally {
        setLoading(false);
      }
    };

    loadStartups();
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

    // Sort the filtered results
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'funding':
          return b.currentFunding - a.currentFunding;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    setFilteredStartups(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [startups, searchTerm, selectedCategory, sortBy]);

  const handleStartupClick = (startupId: string) => {
    navigate(`/startup/${startupId}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredStartups.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentStartups = filteredStartups.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading Y Combinator startups...</p>
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

        <div className="sort-controls">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="sort-select"
          >
            <option value="name">Name (A-Z)</option>
            <option value="funding">Funding (High to Low)</option>
            <option value="category">Category</option>
          </select>
        </div>
      </section>

      <section className="results-section" aria-labelledby="results-heading">
        <div className="results-header">
          <h2 id="results-heading">
            {filteredStartups.length} Startup{filteredStartups.length !== 1 ? 's' : ''} Available
          </h2>
        </div>

        {filteredStartups.length > 0 ? (
          <>
            <div
              className="startups-grid"
              role="grid"
              aria-label="Available startups for investment"
              aria-rowcount={Math.ceil(currentStartups.length / 3)}
            >
              {currentStartups.map((startup, index) => (
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

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={itemsPerPage}
                totalItems={filteredStartups.length}
              />
            )}
          </>
        ) : (
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