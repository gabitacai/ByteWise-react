import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterScreen from './assets/components/RegisterScreen';
import HomeScreen from './assets/components/HomeScreen';
import Dashboard from './assets/components/Dashboard';
import Transacciones from './assets/components/Transacciones';
import TareasHabitos from './assets/components/TareasHabitos';
import Navbar from './assets/components/Navbar';
import Formulario from './assets/components/Formulario'; 
import './assets/styles/App.css';

function App() {
  const WIP_MESSAGE = "Página aún en construcción...";
  const ERROR_MESSAGE = "¡UPS! Esa página no existe...";

  return (
    <>
      <BrowserRouter>
        <Navbar /> {/* Agregamos el Navbar */}
        <main>
          <Routes>
            {/* Página principal cuando el usuario está logueado */}
            <Route path="/" element={<HomeScreen user={{ name: "Gabita" }} />} />

            {/* Página de registro */}
            <Route path="/register" element={<RegisterScreen />} />

            {/* Secciones disponibles desde HomeScreen */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transacciones" element={<Transacciones />} />
            <Route path="/tareas-habitos" element={<TareasHabitos />} />

            {/* Ruta para el formulario */}
            <Route path="/formulario" element={<Formulario />} />

            {/* Página en construcción */}
            <Route path="*" element={<h2>{ERROR_MESSAGE}</h2>} />
          </Routes>
        </main>
        <footer>
          &copy; Gabriela F | 2024 todos los derechos reservados.
        </footer>
      </BrowserRouter>
    </>
  );
}

export default App;