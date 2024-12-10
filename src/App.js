import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [mensaje, setMensaje] = useState('Hola mundo!');

  const obtenerMensaje = async () => {
    const response = await fetch('https://81a3-152-230-133-37.ngrok-free.app/');
    const data = await response.json();
    setMensaje(data);
  }

  useEffect(() => {
    obtenerMensaje();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        Mensaje: {mensaje}
      </header>
    </div>
  );
}

export default App;
