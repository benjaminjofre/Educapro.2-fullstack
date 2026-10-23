import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';

export default function AdminAuthGuard({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Verifica si el administrador ya había iniciado sesión en la sesión actual
  useEffect(() => {
    const authStatus = sessionStorage.getItem('adminAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // Credenciales de Administrador para pruebas
    if (email === 'admin@educapro.cl' && password === 'admin123') {
      sessionStorage.setItem('adminAuth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Correo o contraseña incorrectos. Ingrese credenciales de Administrador válidas.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    setIsAuthenticated(false);
  };

  // Si está autenticado, muestra el contenido de la página elegida
  if (isAuthenticated) {
    return (
      <>
        <div className="bg-dark text-white py-2 px-4 d-flex justify-content-between align-items-center shadow-sm">
          <small className="fw-semibold">🔑 Sesión de Administrador Activa (admin@educapro.cl)</small>
          <Button variant="outline-light" size="sm" onClick={handleLogout} className="fw-bold">
            Cerrar Sesión Admin
          </Button>
        </div>
        {children}
      </>
    );
  }

  // Si NO está autenticado, solicita las credenciales
  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm border-0 rounded-4 p-4 p-md-5 bg-white">
            <div className="text-center mb-4">
              <div className="fs-1 mb-2">🔒</div>
              <h2 className="h4 fw-bold text-dark">Acceso Restringido</h2>
              <p className="text-muted small">
                Debes iniciar sesión con tu cuenta de Administrador para ver y modificar esta sección.
              </p>
            </div>

            {error && <Alert variant="danger" className="py-2 small text-center">{error}</Alert>}

            <Form onSubmit={handleLogin}>
              <Form.Group className="mb-3" controlId="adminEmail">
                <Form.Label className="fw-semibold text-dark">Correo de Administrador</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="admin@educapro.cl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="adminPassword">
                <Form.Label className="fw-semibold text-dark">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" variant="primary" size="lg" className="w-100 fw-bold fs-6">
                Ingresar como Administrador
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}