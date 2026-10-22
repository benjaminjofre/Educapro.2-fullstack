import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function NavigationBar() {
  const location = useLocation();

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="shadow-sm sticky-top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="text-warning fw-bold fs-4">
          🎓 EducaPro
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarNav" />
        <Navbar.Collapse id="navbarNav">
          <Nav className="me-auto" activeKey={location.pathname}>
            <Nav.Link as={Link} to="/" eventKey="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/contacto" eventKey="/contacto">Inscripción</Nav.Link>
            <Nav.Link as={Link} to="/pago" eventKey="/pago">Pago Matrícula</Nav.Link>
            <Nav.Link as={Link} to="/estudiante" eventKey="/estudiante">Mi Portal</Nav.Link>
            <Nav.Link as={Link} to="/profesor" eventKey="/profesor">Portal Docente</Nav.Link>
            <Nav.Link as={Link} to="/admin" eventKey="/admin">Gestión Académica</Nav.Link>
            <Nav.Link as={Link} to="/estadisticas" eventKey="/estadisticas">Reportes</Nav.Link>
            <Nav.Link as={Link} to="/director" eventKey="/director">Director</Nav.Link>
            <Nav.Link as={Link} to="/coordinador" eventKey="/coordinador">Coordinador</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}