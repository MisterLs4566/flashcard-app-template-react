import { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/api/flashcard_list')
      .then(response => response.json())
      .then(result => {
        console.log('API-Antwort:', result); // Zur Überprüfung
        setData(result.rows); // Setzen Sie data auf das rows-Array
      })
      .catch(error => console.error('Fehler beim Abrufen der Daten:', error));
  }, []);

  return (
    <div>
      <h1>My Flashcard Lists</h1>
      {data && data.length > 0 ? (
        <ul>
          {data.map(item => (
            <li key={item.flashcard_list_id}>{item.title}</li>
          ))}
        </ul>
      ) : (
        <p>Laden der Daten...</p>
      )}
    </div>
  );
}

export default App;
