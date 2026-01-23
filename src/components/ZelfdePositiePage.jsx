import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { API_ENDPOINTS } from '../config/api';

function ZelfdePositiePage() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2024);
  const navigate = useNavigate();

  // Generate years from 2001 to 2024 (need previous year data, so start from 2001)
  const availableYears = [];
  for (let year = 2024; year >= 2001; year--) {
    availableYears.push(year);
  }

  useEffect(() => {
    fetchSongs();
  }, [selectedYear]);

  const fetchSongs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const url = API_ENDPOINTS.statistics.samePosition(selectedYear);
      console.log('Fetching zelfde positie from:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Dit endpoint bestaat nog niet op de backend. Neem contact op met de backend developers om /api/statistics/zelfde-positie/{year} te implementeren.');
        }
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
        console.error('API Error:', errorMessage);
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Zelfde positie data received:', data.length, 'songs');
      setSongs(data);
    } catch (err) {
      console.error('Error fetching songs:', err);
      setError(`Failed to load statistics: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getSongSlug = (title) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  };

  if (loading) {
    return (
      <div className="statistics-container">
        <header className="header">
          <Link to="/" className="logo" style={{ textDecoration: 'none' }}>TOP 2000</Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/statistics" className="nav-link active">Statistieken</Link>
          </nav>
        </header>
        <main className="main-content">
          <div className="loading">Statistiek laden...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="statistics-container">
        <header className="header">
          <Link to="/" className="logo" style={{ textDecoration: 'none' }}>TOP 2000</Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/statistics" className="nav-link active">Statistieken</Link>
          </nav>
        </header>
        <main className="main-content">
          <div className="error">
            <p>{error}</p>
            <button onClick={() => fetchSongs()} className="retry-button">
              Opnieuw proberen
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="statistics-container">
      <header className="header">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>TOP 2000</Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/statistics" className="nav-link active">Statistieken</Link>
        </nav>
      </header>

      <main className="main-content">
        <div className="statistics-header">
          <h1 className="statistics-title">Zelfde Positie</h1>
          <p className="statistics-description">
            Nummers die op dezelfde positie zijn gebleven ten opzichte van het vorige jaar
          </p>
          
          <div className="year-selector">
            <label htmlFor="year-select">Selecteer jaar:</label>
            <select 
              id="year-select"
              value={selectedYear} 
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              className="year-dropdown"
            >
              {availableYears.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {songs.length === 0 ? (
          <div className="no-data">
            <h2>Geen liedjes gevonden voor {selectedYear}</h2>
            <p>Dit kan betekenen:</p>
            <ul>
              <li>Geen nummers bleven op dezelfde positie dit jaar</li>
              <li>Geen data beschikbaar voor {selectedYear - 1} of {selectedYear}</li>
              <li>Database heeft mogelijk geen historische data</li>
            </ul>
          </div>
        ) : (
          <section className="table-section">
            <div className="table-header-bar">
              <h3>Liedjes op dezelfde positie in {selectedYear} ({songs.length} nummers)</h3>
            </div>
            <div className="table-container">
              <table className="statistics-table">
                <thead>
                  <tr>
                    <th>POSITIE</th>
                    <th>TITEL</th>
                    <th>ARTIEST</th>
                    <th>UITGIFTEJAAR</th>
                  </tr>
                </thead>
                <tbody>
                  {songs.map((song) => (
                    <tr key={song.positie}>
                      <td className="rank-cell">#{song.positie}</td>
                      <td className="title-cell">
                        <Link 
                          to={`/song/${getSongSlug(song.titel)}`}
                          className="song-title-link"
                        >
                          {song.titel}
                        </Link>
                      </td>
                      <td className="artist-cell">{song.artiestNaam}</td>
                      <td className="year-cell">{song.uitgifteJaar || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <div className="statistics-footer">
          <button onClick={() => navigate('/statistics')} className="back-button">
            ? Terug naar Statistieken
          </button>
        </div>
      </main>
    </div>
  );
}

export default ZelfdePositiePage;
