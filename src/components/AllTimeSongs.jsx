import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import API_BASE_URL, { API_ENDPOINTS } from '../config/api';
import './AllTimeSongs.css';

function AllTimeSongs() {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAllTimeSongs();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchAllTimeSongs = async () => {
        const url = API_ENDPOINTS.statistics.allTime();
        try {
            setLoading(true);
            setError(null);

            console.log('Fetching all-time statistics from:', url);

            const response = await fetch(url);

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const errorMessage = errorData?.message || `HTTP ${response.status}: ${response.statusText}`;
                console.error('API Error:', errorMessage);
                setError(`Failed to load statistics: ${errorMessage} (URL: ${url})`);
                setSongs([]);
                return;
            }

            const data = await response.json();
            console.log('All-time statistics data received:', Array.isArray(data) ? data.length : 'unknown');
            setSongs(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error('Error fetching all-time songs:', err);
            setError(`Failed to load statistics: ${err.message} (URL: ${API_ENDPOINTS.statistics.allTime()})`);
            setSongs([]);
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
                        <p>Check backend route and API base URL in <code>src/config/api.js</code>.</p>
                        <button onClick={() => fetchAllTimeSongs()} className="retry-button">
                            Retry
                        </button>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="statistics-container alltime-page">
            <Navbar />

            <main className="main-content">
                <div className="statistics-header">
                    <h1 className="statistics-title">Alle nummers ooit in de Top 2000</h1>
                    <p className="statistics-description">
                        Een overzicht van alle nummers die ooit in de Top 2000 hebben gestaan
                    </p>
                </div>

                {songs.length === 0 ? (
                    <div className="no-data">
                        <h2>No songs found</h2>
                        <p>There are no results for the all-time statistics endpoint.</p>
                    </div>
                ) : (
                    <section className="table-section alltime-section">
                        <div className="table-header-bar">
                            <h3>All-time entries ({songs.length} songs)</h3>
                        </div>
                        <div className="table-container">
                            <table className="alltime-table">
                                <thead>
                                    <tr>
                                        <th>TITLE</th>
                                        <th>ARTIST</th>
                                        <th>YEAR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {songs.map((song, index) => (
                                        <tr key={song.songId || `${song.titel}-${index}`}>
                                            <td className="title-cell">
                                                <Link
                                                    to={`/song/${getSongSlug(song.titel)}`}
                                                    className="song-title-link"
                                                >
                                                    {song.titel}
                                                </Link>
                                            </td>
                                            <td className="artist-cell">{song.artistName}</td>
                                            <td className="year-cell">{song.firstYear || song.releaseYear || song.lastYear || '–'}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}

                <div className="statistics-footer">
                    <button onClick={() => navigate('/')} className="back-button">
                        ← Back to Homepage
                    </button>
                </div>
            </main>
        </div>
    );
}

export default AllTimeSongs;