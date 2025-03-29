import { useEffect, useState } from 'react';

function App() {
    const [message, setMessage] = useState('Loading...');

    useEffect(() => {
        fetch('http://localhost:5000/')
            .then((res) => res.text())
            .then((data) => setMessage(data))
            .catch((err) => setMessage('Error connecting to backend'));
    }, []);

    return (
        <div style={{ padding: '2rem' }}>
            <h1>📚 Bookstore App</h1>
            <p>Backend says: <strong>{message}</strong></p>
        </div>
    );
}

export default App;
