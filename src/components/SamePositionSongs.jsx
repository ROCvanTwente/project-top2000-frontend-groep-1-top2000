import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import API_BASE_URL from '../config/api';
import './Statistics.css';

function SamePositionSongs() {
  const [samePositionSongs, setSamePositionSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState(2024);
  const navigate = useNavigate();

  // Generate years from 2001 to 2025 (need previous year data)
  const availableYears = [];
  for (let year = 2025; year >= 2001; year--) {
    availableYears.push(year);
  }

  useEffect(() => {
    fetchSamePositionSongs();
  }, [selectedYear]);

  const fetchSamePositionSongs = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const url = `${API_BASE_URL}/statistics/zelfde-positie/${selectedYear}`;
      console.log('Fetching same position songs from:', url);
      
      const response = await fetch(url);
      
      if (!response.ok) {
        // Try to get error message from response
        const errorData = await response.json().catch(() => null);
        const errorMessage = errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
        console.error('API Error:', errorMessage);
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      console.log('Same position songs data received:', data.length, 'songs');
      setSamePositionSongs(data);
    } catch (err) {
      console.error('Error fetching same position songs:', err);
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
        <Navbar />
        <main className="main-content">
          <div className="loading">Statistieken laden...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="statistics-container">
        <Navbar />
        <main className="main-content">
          <div className="error">
            <p>{error}</p>
            <button onClick={() => fetchSamePositionSongs()} className="retry-button">
              Retry
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="statistics-container">
      <Navbar />

      <main className="main-content">
        <div className="statistics-header">
          <h1 className="statistics-title">Zelfde Positie</h1>
          <p className="statistics-description">
            Nummers die op dezelfde positie zijn blijven staan ten opzichte van het vorige jaar
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

        {samePositionSongs.length === 0 ? (
          <div className="no-data">
            <h2>Geen nummers gevonden voor {selectedYear}</h2>
            <p>Dit kan betekenen:</p>
            <ul>
              <li>Geen nummers bleven op dezelfde positie dit jaar</li>
              <li>Geen gegevens beschikbaar voor {selectedYear - 1} of {selectedYear}</li>
              <li>Database heeft mogelijk geen historische gegevens</li>
            </ul>
          </div>
        ) : (
          <section className="table-section">
            <div className="table-header-bar">
              <h3>Nummers op Dezelfde Positie in {selectedYear} ({samePositionSongs.length} nummers)</h3>
            </div>
            <div className="table-container">
              <table className="statistics-table">
                <thead>
                  <tr>
                    <th>RANK</th>
                    <th>POSITIE</th>
                    <th>TITLE</th>
                    <th>ARTIST</th>
                    <th>UITGIFTEJAAR</th>
                  </tr>
                </thead>
                <tbody>
                  {samePositionSongs.map((song, index) => (
                    <tr key={index}>
                      <td className="rank-cell">{index + 1}</td>
                      <td className="position-cell same-position">#{song.positie}</td>
                      <td className="title-cell">
                        <Link 
                          to={`/song/${getSongSlug(song.titel)}`}
                          className="song-title-link"
                        >
                          {song.titel}
                        </Link>
                      </td>
                      <td className="artist-cell">{song.artiestNaam}</td>
                      <td className="year-cell">{song.uitgifteJaar || '–'}</td>
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

export default SamePositionSongs;
