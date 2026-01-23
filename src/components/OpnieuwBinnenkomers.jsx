import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar'; 
import './NieuweBinnenkomers.css'; 
import { API_ENDPOINTS } from '../config/api';

function OpnieuwBinnenkomers() {
  const [year, setYear] = useState(2024); 
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchEntries = async (selectedYear) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(API_ENDPOINTS.statistics.reEntries(selectedYear));
      
      if (!response.ok) throw new Error('Fout bij ophalen gegevens');
      
      const data = await response.json();
      setEntries(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEntries(year);
  }, [year]);

  const handleYearChange = (e) => {
    setYear(parseInt(e.target.value));
  };

  return (
    <div className="nieuwe-binnenkomers-page">
      <Navbar />
      
      <main className="stats-container">
        <div className="stats-header">
          <Link to="/statistics" className="back-link">← Terug naar overzicht</Link>
          <h1>♻️ Opnieuw Binnen</h1>
          <p>Nummers die in {year} hun rentree maakten (stonden er in {year - 1} niet in, maar daarvoor wel).</p>
        </div>

        <div className="filter-section">
          <label htmlFor="year-select">Kies een jaar:</label>
          <select id="year-select" value={year} onChange={handleYearChange} className="year-select">
            {Array.from({ length: 26 }, (_, i) => 2024 - i).map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {error && <div className="error-message">Error: {error}</div>}
        
        {loading ? (
          <div className="loading-spinner">Gegevens laden...</div>
        ) : (
          <div className="table-responsive">
            <table className="stats-table">
              <thead>
                <tr>
                  <th className="col-pos">Positie</th>
                  <th className="col-title">Titel</th>
                  <th className="col-artist">Artiest</th>
                  <th className="col-year">Uitgiftejaar</th>
                </tr>
              </thead>
              <tbody>
                {entries && entries.length > 0 ? (
                  entries.map((entry, index) => (
                    <tr key={index}>
                      {/* Simpele weergave zonder badge */}
                      <td style={{ textAlign: 'center', width: '80px', fontWeight: 'bold', color: 'white' }}>
                         {entry.positie}
                      </td>
                      <td className="title-cell">{entry.titel}</td>
                      <td>{entry.artiestNaam}</td>
                      <td>{entry.uitgifteJaar}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="no-data">Geen re-entries gevonden voor {year}.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default OpnieuwBinnenkomers;