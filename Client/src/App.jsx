import { useState } from 'react';
import api from './services/api';
import './App.css';

function App() {
  const [bericht, setBericht] = useState('');
  const [error, setError] = useState('');

  const testVerbinding = async () => {
    setBericht('Verbinding maken...');
    setError('');

    try {
      // We proberen in te loggen met onzin-gegevens.
      // Als de backend antwoordt met "401 Unauthorized" of "400 Bad Request",
      // dan weten we dat de verbinding WERKT!
      await api.post('/auth/login', {
        email: "test@test.nl",
        password: "foutwachtwoord"
      });
      
    } catch (err) {
      if (err.response) {
        // GOED NIEUWS: De server heeft geantwoord!
        // (Ook al is het een foutmelding, de verbinding is er)
        setBericht(`Succes! Verbonden met backend. Server zegt: ${err.response.status} ${err.response.statusText}`);
      } else if (err.request) {
        // SLECHT NIEUWS: Geen antwoord ontvangen
        setError('Fout: Geen contact met server. Draait de backend wel op poort 7003?');
      } else {
        setError(`Fout: ${err.message}`);
      }
    }
  };

  return (
    <div className="card">
      <h1>Frontend & Backend Test</h1>
      
      <button onClick={testVerbinding}>
        Test de verbinding
      </button>

      {bericht && <div style={{marginTop: '20px', color: 'green', fontWeight: 'bold'}}>{bericht}</div>}
      {error && <div style={{marginTop: '20px', color: 'red', fontWeight: 'bold'}}>{error}</div>}
    </div>
  );
}

export default App;