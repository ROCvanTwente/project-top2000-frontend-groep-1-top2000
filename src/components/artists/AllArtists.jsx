import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import '../NieuweBinnenkomers.css'; 

function AllArtists() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // PAGINATION STATE
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(20); 

  useEffect(() => {
    fetch('https://localhost:7003/api/artists/all-with-counts')
      .then(res => res.json())
      .then(data => { 
          setArtists(data); 
          setLoading(false); 
      })
      .catch(err => {
          console.error(err);
          setLoading(false);
      });
  }, []);

  // BEREKENINGEN VOOR PAGINATIE
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentArtists = artists.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(artists.length / itemsPerPage);

  // Navigatie functies
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    window.scrollTo(0, 0); // Scroll naar boven
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div className="nieuwe-binnenkomers-page">
      <Navbar />
      <main className="stats-container">
        <div className="stats-header">
            <h1>Alle Artiesten</h1>
            <p>Iedereen die ooit in de lijst stond, gesorteerd op aantal noteringen.</p>
        </div>

        {loading ? <div className="loading-spinner">Laden...</div> : (
          <>
            <div className="table-responsive">
              <table className="stats-table">
                  <thead>
                      <tr>
                          <th style={{textAlign: 'center', width:'80px'}}>#</th>
                          <th>Artiest</th>
                          <th>Aantal Noteringen</th>
                      </tr>
                  </thead>
                  <tbody>
                      {/* We mappen nu over currentArtists ipv alle artists */}
                      {currentArtists.map((a, index) => (
                          <tr key={a.artistId}>
                              <td style={{textAlign: 'center', color: '#666', fontWeight:'bold'}}>
                                  {/* De juiste rang berekenen o.b.v. pagina */}
                                  {indexOfFirstItem + index + 1}
                              </td>
                              <td className="title-cell">
                                  <Link to={`/artist/${a.artistId}`} style={{color: '#fff', textDecoration:'none'}}>
                                      {a.name}
                                  </Link>
                              </td>
                              <td style={{color: '#ff0000', fontWeight: 'bold'}}>
                                  {a.songCount}
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
            </div>

            {/* PAGINATION CONTROLS */}
            <div className="pagination-controls">
                <button 
                    onClick={goToPrevPage} 
                    disabled={currentPage === 1}
                    className="pagination-btn"
                >
                    ← Vorige
                </button>
                
                <span className="pagination-info">
                    Pagina <span style={{color: '#ff0000', fontWeight: 'bold'}}>{currentPage}</span> van {totalPages}
                </span>

                <button 
                    onClick={goToNextPage} 
                    disabled={currentPage === totalPages}
                    className="pagination-btn"
                >
                    Volgende →
                </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
export default AllArtists;