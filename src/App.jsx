import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RegisterScreen from './assets/components/RegisterScreen';
import HomeScreen from './assets/components/HomeScreen';
import Dashboard from './assets/components/Dashboard';
import Transacciones from './assets/components/Transacciones';
import TareasHabitos from './assets/components/TareasHabitos';
import Navbar from './assets/components/Navbar';
import Formulario from './assets/components/Formulario';
import './assets/styles/App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <BrowserRouter>
        <Navbar toggleDarkMode={toggleDarkMode} isDarkMode={darkMode} />
        <main>
          <Routes>
            <Route path="/" element={<HomeScreen user={{ name: 'Gabita' }} />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transacciones" element={<Transacciones />} />
            <Route path="/tareas-habitos" element={<TareasHabitos />} />
            <Route path="/formulario" element={<Formulario />} />
            <Route path="*" element={<h2>¡UPS! Esa página no existe...</h2>} />
          </Routes>
        </main>
        <footer>
          &copy; Gabriela F | 2024 todos los derechos reservados.
        </footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
