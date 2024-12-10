import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [mensaje, setMensaje] = useState('Hola mundo!');
  const [recipe, setRecipe] = useState("No hay receta por el momento");
  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const obtenerMensaje = async () => {
    try {
      const response = await axios.get('http://localhost:3000/');
      setMensaje(response.data);
    } catch (error) {
      console.error('Error al obtener el mensaje:', error);
      setMensaje('Error al cargar el mensaje');
    }
  }

  const obtenerReceta = async (ingredients) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3000/recipes', { ingredients });
      setRecipe(response.data);
    } catch (error) {
      console.error('Error al obtener la receta:', error);
      setRecipe('No se pudo generar la receta. Por favor, intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  }

  const handleAddIngredient = (e) => {
    e.preventDefault();
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (indexToRemove) => {
    setIngredients(ingredients.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="App" style={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f7fa',
      padding: '2rem'
    }}>
      <div style={{ 
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <h1 style={{
          color: '#2d3748',
          marginBottom: '2rem',
          fontSize: '2rem',
          textAlign: 'center'
        }}>Generador de Recetas</h1>
        
        <form onSubmit={handleAddIngredient} style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              value={newIngredient}
              onChange={(e) => setNewIngredient(e.target.value)}
              placeholder="Agregar ingrediente"
              style={{ 
                flex: 1,
                padding: '0.75rem',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                fontSize: '1rem',
                transition: 'all 0.2s',
                outline: 'none',
              }}
            />
            <button 
              type="submit"
              style={{
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                backgroundColor: '#4f46e5',
                color: 'white',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: '500',
                transition: 'all 0.2s',
                ':hover': {
                  backgroundColor: '#4338ca',
                }
              }}
            >
              Agregar
            </button>
          </div>
        </form>

        {ingredients.length > 0 && (
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              color: '#4a5568',
              fontSize: '1.25rem',
              marginBottom: '1rem'
            }}>Ingredientes:</h2>
            <div style={{ 
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem'
            }}>
              {ingredients.map((ingredient, index) => (
                <span 
                  key={index} 
                  style={{
                    backgroundColor: '#edf2f7',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.875rem',
                    color: '#4a5568',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  {ingredient}
                  <button
                    onClick={() => handleRemoveIngredient(index)}
                    style={{
                      border: 'none',
                      background: 'none',
                      padding: '0',
                      color: '#a0aec0',
                      cursor: 'pointer',
                      fontSize: '1.25rem',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        <button 
          onClick={() => obtenerReceta(ingredients)}
          disabled={ingredients.length === 0 || isLoading}
          style={{
            width: '100%',
            padding: '1rem',
            borderRadius: '8px',
            border: 'none',
            backgroundColor: ingredients.length === 0 ? '#cbd5e0' : '#4f46e5',
            color: 'white',
            cursor: ingredients.length === 0 ? 'not-allowed' : 'pointer',
            fontSize: '1rem',
            fontWeight: '500',
            transition: 'all 0.2s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '2rem'
          }}
        >
          {isLoading ? (
            <>
              <span style={{ 
                width: '20px', 
                height: '20px', 
                border: '3px solid #ffffff3d',
                borderTop: '3px solid white',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite'
              }}></span>
              Generando receta...
            </>
          ) : (
            'Generar Receta'
          )}
        </button>

        {recipe && (
          <div style={{
            backgroundColor: '#f8fafc',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #e2e8f0'
          }}>
            <h2 style={{
              color: '#4a5568',
              fontSize: '1.25rem',
              marginBottom: '1rem'
            }}>Tu Receta:</h2>
            <p style={{
              color: '#4a5568',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap'
            }}>{recipe}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
