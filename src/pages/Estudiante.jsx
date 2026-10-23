import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Badge, ProgressBar, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Estudiante() {
  const [alumno, setAlumno] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem('alumnoInscrito');
    if (data) setAlumno(JSON.parse(data));
  }, []);

  const cerrarSesion = () => {
    localStorage.removeItem('alumnoInscrito');
    setAlumno(null);
  };

  if (!alumno) {
    return (
      <Container className="my-5">
        <Card className="shadow-sm border-0 rounded-3 p-5 text-center bg-white">
          <h2 className="h4 fw-bold text-dark mb-2">No tienes cursos activos</h2>
          <p className="text-muted mb-4">Actualmente no estás inscrito en ningún curso[cite: 3].</p>
          <div>
            <Button as={Link} to="/contacto" variant="primary" size="lg" className="fw-semibold px-4">
              Inscribirme a un Curso
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  if (!alumno.pagado) {
    return (
      <Container className="my-5">
        <Card className="shadow-sm border-0 rounded-3 p-5 text-center bg-white">
          <h2 className="h4 fw-bold text-dark mb-2">Inscripción Pendiente</h2>
          <p className="text-muted mb-4">Tienes una inscripción pendiente de pago[cite: 3].</p>
          <div>
            <Button as={Link} to="/pago" variant="primary" size="lg" className="fw-semibold px-4">
              Ir a Pagar Matrícula
            </Button>
          </div>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Card className="shadow-sm border-0 rounded-3 p-4 mb-4 bg-white">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h1 className="h3 fw-bold text-dark mb-1">Bienvenido(a), {alumno.nombre}</h1>
            <p className="text-muted mb-0">
              RUT: <strong>{alumno.rut}</strong> | Estado: <Badge bg="success">Matriculado / En Curso</Badge>[cite: 3]
            </p>
          </div>
          <Button onClick={cerrarSesion} variant="outline-danger" size="sm">
            Cerrar / Borrar Inscripción
          </Button>
        </div>
      </Card>

      <Card className="shadow-sm border-0 rounded-3 p-4 mb-4 bg-white">
        <h2 className="h5 fw-bold text-dark mb-3">Mi Asignatura Activa</h2>
        <h3 className="h4 text-primary fw-bold mb-1">{alumno.curso}</h3>
        <p className="text-muted mb-3">
          Duración: 40 horas | Estado de Pago: <Badge bg="primary">Matrícula Pagada</Badge>[cite: 3]
        </p>
        <ProgressBar animated now={10} label="10% Completado" style={{ height: '20px' }} />
      </Card>

      <Row className="g-4">
        <Col md={6}>
          <Card className="shadow-sm border-0 rounded-3 p-4 bg-white">
            <h3 className="h5 fw-bold text-dark mb-3">Mis Calificaciones</h3>
            <p className="text-muted small">Aún no hay evaluaciones registradas para este periodo[cite: 3].</p>
          </Card>
        </Col>
        <Col md={6}>
          <Card className="shadow-sm border-0 rounded-3 p-4 bg-white">
            <h3 className="h5 fw-bold text-dark mb-3">Asistencia Registrada</h3>
            <p className="text-muted small">0% - Las clases inician próximamente[cite: 3].</p>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}