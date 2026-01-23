import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar'; 
import '../NieuweBinnenkomers.css';

function Top2000Lijst() {
  const [year, setYear] = useState(2023);
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://localhost:7003/api/statistics/full-list/${year}`);
        if(response.ok) {
            const data = await response.json();
            setEntries(data);
        }
      } catch(e) { console.error(e); }
      finally { setLoading(false); }
    };
    fetchList();
  }, [year]);

  // Filter logica
  const filteredEntries = entries.filter(entry => 
    entry.artistName.toLowerCase().includes(filter.toLowerCase()) ||
    entry.songTitle.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="nieuwe-binnenkomers-page">
      <Navbar />
      <main className="stats-container">
        <div className="stats-header">
           <h1>De Lijst der Lijsten</h1>
           <p>De complete Top 2000 van {year}</p>
        </div>

        <div className="filter-section" style={{flexDirection: 'column', gap: '20px'}}>
            {/* Jaar Selectie */}
            <div>
              <label style={{marginRight: '10px'}}>Kies Jaar:</label>
              <select value={year} onChange={e => setYear(e.target.value)} className="year-select">
                {Array.from({ length: 25 }, (_, i) => 2023 - i).map(y => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            
            {/* Zoekbalk */}
            <div style={{width: '100%', maxWidth: '500px'}}>
                <input 
                    type="text" 
                    placeholder="🔍 Zoek op artiest of titel..." 
                    value={filter}
                    onChange={e => setFilter(e.target.value)}
                    style={{
                        width: '100%', padding: '12px', borderRadius: '8px', 
                        border: '1px solid #444', backgroundColor: '#000', color: '#fff',
                        fontSize: '1rem'
                    }}
                />
            </div>
        </div>

        {loading ? <div className="loading-spinner">Laden...</div> : (
          <div className="table-responsive">
            <table className="stats-table">
              <thead>
                <tr>
                  <th className="col-pos">Positie</th>
                  <th className="col-title">Titel</th>
                  <th className="col-artist">Artiest</th>
                  <th className="col-year">Jaar</th>
                </tr>
              </thead>
              <tbody>
                {filteredEntries.slice(0, 1000).map(entry => ( 
                  <tr key={entry.position}>
                    <td style={{ textAlign: 'center', width: '80px', fontWeight: 'bold', color: '#d4af37' }}>
                        {entry.position}
                    </td>
                    <td className="title-cell">
                        <Link to={`/song/${entry.songTitle}`} style={{color: '#fff', textDecoration: 'none'}}>
                            {entry.songTitle}
                        </Link>
                    </td>
                    <td>
                        <Link to={`/artist/${entry.artistId}`} style={{color: '#ddd', textDecoration: 'underline'}}>
                            {entry.artistName}
                        </Link>
                    </td>
                    <td>{entry.releaseYear}</td>
                  </tr>
                ))}
                {filteredEntries.length === 0 && (
                    <tr><td colSpan="4" className="no-data">Geen resultaten gevonden.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default Top2000Lijst;