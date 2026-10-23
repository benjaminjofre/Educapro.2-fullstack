import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Estudiante from './pages/Estudiante';
import Profesor from './pages/Profesor';

export default function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estudiante" element={<Estudiante />} />
        <Route path="/profesor" element={<Profesor />} />
      </Routes>
    </Router>
  );
}