import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import NavigationBar from './components/NavigationBar';


import AdminAuthGuard from './components/AdminAuthGuard';
import ProfesorAuthGuard from './components/ProfesorAuthGuard';


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
        <Route path="/estadisticas" element={<Estadisticas />} />
        <Route path="/director" element={<Director />} />

        <Route
          path="/profesor"
          element={
            <ProfesorAuthGuard>
              <Profesor />
            </ProfesorAuthGuard>
          }
        />

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