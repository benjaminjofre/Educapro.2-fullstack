import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Componente Navegador
import NavigationBar from './components/NavigationBar';

// Guard de Seguridad
import AdminAuthGuard from './components/AdminAuthGuard';

// Páginas
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import Pago from './pages/Pago';
import Estudiante from './pages/Estudiante';
import Profesor from './pages/Profesor';
import Admin from './pages/Admin';
import Estadisticas from './pages/Estadisticas';
import Director from './pages/Director';
import Coordinador from './pages/Coordinador';

export default function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/pago" element={<Pago />} />
        <Route path="/estudiante" element={<Estudiante />} />
        <Route path="/profesor" element={<Profesor />} />
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/director" element={<Director />} />

        {/* --- Rutas Protegidas Exclusivas para el Administrador --- */}
        <Route
          path="/admin"
          element={
            <AdminAuthGuard>
              <Admin />
            </AdminAuthGuard>
          }
        />
        <Route
          path="/coordinador"
          element={
            <AdminAuthGuard>
              <Coordinador />
            </AdminAuthGuard>
          }
        />

        <Route path="*" element={<Contacto />} />
      </Routes>
    </Router>
  );
}