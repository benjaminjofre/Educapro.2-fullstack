import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';

export default function ProfesorAuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const authStatus = sessionStorage.getItem('profesorAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === 'profesor@educapro.cl' && password === 'profe123') {
      sessionStorage.setItem('profesorAuth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Correo o contraseña incorrectos. Usa credenciales de Docente válidas.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('profesorAuth');
    setIsAuthenticated(false);
  };

  if (isAuthenticated) {
    return (
      <>
        <div className="bg-primary text-white py-2 px-4 d-flex justify-content-between align-items-center shadow-sm">
          <small className="fw-semibold">👨‍🏫 Sesión de Docente Activa (profesor@educapro.cl)</small>
          <Button variant="outline-light" size="sm" onClick={handleLogout} className="fw-bold rounded-3">
            Cerrar Sesión Docente
          </Button>
        </div>
        {children}
      </>
    );
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm border-0 rounded-4 p-4 p-md-5 bg-white">
            <div className="text-center mb-4">
              <div className="fs-1 mb-2">🎓</div>
              <h2 className="h4 fw-bold text-dark">Portal Docente</h2>
              <p className="text-muted small">
                Acceso restringido a profesores. Ingresa tus credenciales para registrar calificaciones y asistencias[cite: 6].
              </p>
            </div>

            {error && <Alert variant="danger" className="py-2 small text-center rounded-3">{error}</Alert>}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="profesorEmail">
                <Form.Label className="fw-semibold text-dark">Correo Electrónico Docente</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="profesor@educapro.cl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-3"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="profesorPassword">
                <Form.Label className="fw-semibold text-dark">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-3"
                />
              </Form.Group>

              <Button type="submit" variant="primary" size="lg" className="w-100 fw-bold fs-6 rounded-3">
                Ingresar al Portal Docente
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}