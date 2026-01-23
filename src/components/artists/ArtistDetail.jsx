import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Navbar from '../Navbar'; 
import './ArtistDetail.css';
import { API_ENDPOINTS } from '../../config/api';

function ArtistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_ENDPOINTS.artists.detail(id))
      .then(res => {
        if (!res.ok) throw new Error("Artist not found");
        return res.json();
      })
      .then(data => {
        setArtist(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading-spinner">Laden...</div>;
  if (!artist) return <div className="error-message">Artiest niet gevonden.</div>;

  return (
    <div className="artist-detail-container">
      <Navbar />
      
      <div className="artist-content-wrapper">
        <button onClick={() => navigate(-1)} className="back-link" style={{ marginTop: '20px', cursor: 'pointer' }}>
          ← Terug
        </button>

        <div className="artist-header-card">
          <div className="artist-photo-frame">
            {artist.photoUrl ? (
              <img src={artist.photoUrl} alt={artist.name} />
            ) : (
              <div className="artist-photo-placeholder">🎤</div>
            )}
          </div>
          
          <div className="artist-info-section">
            <h1>{artist.name}</h1>
            <p className="artist-bio-text">
              {artist.biography || "Geen biografie beschikbaar."}
            </p>
            
            <div className="artist-links">
              {artist.wikiUrl && (
                <a href={artist.wikiUrl} target="_blank" rel="noreferrer" className="artist-link-btn wiki">
                  Wikipedia
                </a>
              )}
              {artist.websiteUrl && (
                <a href={artist.websiteUrl} target="_blank" rel="noreferrer" className="artist-link-btn website">
                  Website
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="artist-songs-list">
          <h2>Bekende Nummers in de Top 2000</h2>
          <div className="songs-grid-layout">
            {artist.songs && artist.songs.map(song => (
              <Link to={`/song/${song.titel}`} key={song.songId} className="mini-song-card">
                <h3 style={{margin: '0 0 5px 0'}}>{song.titel}</h3>
                <span style={{color: '#999', fontSize: '0.9rem'}}>
                    {song.releaseYear > 0 ? song.releaseYear : ''}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArtistDetail;