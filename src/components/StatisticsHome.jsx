import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import './StatisticsHome.css';

function StatisticsHome() {
  // Statistics cards data
  const statisticsCards = [
    {
      id: 'dropped-songs',
      title: 'Grootste Dalingen',
      description: 'Nummers die het meest gedaald zijn in de lijst',
      icon: '📉',
      route: '/statistics/grootste-dalingen',
      available: true
    },
    {
      id: 'climbers',
      title: 'Grootste Stijgers',
      description: 'Nummers die het meest gestegen zijn in de lijst',
      icon: '📈',
      route: '/statistics/grootste-stijgers',
      available: false
    },
    {
      id: 'new-entries',
      title: 'Nieuwe Binnenkomers',
      description: 'Nummers die nieuw zijn in de Top 2000',
      icon: '🆕',
      route: '/statistics/nieuwe-binnenkomers',
      available: true
    },
    {
      id: 'lost-songs',
      title: 'Verdwenen Nummers',
      description: 'Nummers die uit de lijst zijn gevallen',
      icon: '👋', 
      route: '/statistics/verdwenen-nummers',
      available: true
      id: 'same-position',
      title: 'Zelfde Positie',
      description: 'Nummers die op dezelfde positie zijn blijven staan',
      icon: '🎯',
      route: '/statistics/zelfde-positie',
      available: true
    },
    {
      id: 'top-artists',
      title: 'Top Artiesten',
      description: 'Artiesten met de meeste nummers in de lijst',
      icon: '🎤',
      route: '/statistics/top-artiesten',
      available: false
    },
    {
      id: 're-entries',
      title: 'Opnieuw Binnen',
      description: 'Nummers die hun rentree maken in de lijst',
      icon: '♻️',
      route: '/statistics/opnieuw-binnenkomers',
      available: true
    },
    {
      id: 'all-time',
      title: 'All-Time Klassiekers',
      description: 'Nummers die altijd in de lijst staan',
      icon: '⭐',
      route: '/statistics/all-time',
      available: false
    }
  ];

  return (
    <div className="statistics-home-container">
      <Navbar />

      <main className="main-content">
        <div className="statistics-hero">
          <h1 className="statistics-hero-title">TOP 2000 Statistieken</h1>
          <p className="statistics-hero-description">
            Ontdek interessante feiten en trends uit de Top 2000
          </p>
        </div>

        <section className="statistics-grid">
          {statisticsCards.map((card) => (
            <Link
              key={card.id}
              to={card.available ? card.route : '#'}
              className={`statistics-card ${!card.available ? 'disabled' : ''}`}
              onClick={(e) => !card.available && e.preventDefault()}
            >
              <div className="card-icon">{card.icon}</div>
              <div className="card-content">
                <h3 className="card-title">{card.title}</h3>
                <p className="card-description">{card.description}</p>
                {!card.available && (
                  <span className="coming-soon-badge">Binnenkort beschikbaar</span>
                )}
              </div>
              {card.available && (
                <div className="card-arrow">→</div>
              )}
            </Link>
          ))}
        </section>

        <div className="statistics-footer">
          <Link to="/" className="back-button">
            ← Terug naar Home
          </Link>
        </div>
      </main>
    </div>
  );
}

export default StatisticsHome;
