import React, { useState } from 'react';
import { Container, Card, Form, Button, Table, Badge, Row, Col, Alert } from 'react-bootstrap';

const cursosIniciales = [
  { codigo: 'CRS001', nombre: 'Fundamentos de Programación', area: 'Tecnología', capacidad: '25 alumnos', profesor: 'Juan López' },
  { codigo: 'CRS002', nombre: 'Diseño Gráfico Digital', area: 'Diseño', capacidad: '20 alumnos', profesor: 'María González' },
  { codigo: 'CRS003', nombre: 'Marketing Digital', area: 'Marketing', capacidad: '25 alumnos', profesor: 'Carlos Soto' },
  { codigo: 'CRS004', nombre: 'Electrónica Básica', area: 'Oficios Técnicos', capacidad: '15 alumnos', profesor: 'Luis Pérez' },
  { codigo: 'CRS005', nombre: 'Gestión de Proyectos', area: 'Administración', capacidad: '20 alumnos', profesor: 'Ana Rodríguez' }
];

const profesoresDisponibles = [
  'Juan López',
  'María González',
  'Carlos Soto',
  'Luis Pérez',
  'Ana Rodríguez'
];

export default function Coordinador() {
  const [cursos, setCursos] = useState(cursosIniciales);
  const [cursoSeleccionado, setCursoSeleccionado] = useState('');
  const [profesorSeleccionado, setProfesorSeleccionado] = useState(profesoresDisponibles[0]);
  const [mensaje, setMensaje] = useState('');

  const handleAsignar = (e) => {
    e.preventDefault();
    if (!cursoSeleccionado) {
      alert('Por favor selecciona un curso.');
      return;
    }

    const cursosActualizados = cursos.map((c) =>
      c.codigo === cursoSeleccionado ? { ...c, profesor: profesorSeleccionado } : c
    );

    setCursos(cursosActualizados);
    const cursoObj = cursos.find(c => c.codigo === cursoSeleccionado);
    setMensaje(`¡Profesor/a ${profesorSeleccionado} asignado/a exitosamente a ${cursoObj?.nombre}!`);

    setTimeout(() => setMensaje(''), 3000);
  };

  return (
    <Container className="my-5">
      <h2 className="fw-bold text-dark mb-4">Panel de Control - Coordinador Académico</h2>

      {/* Formulario de Asignación */}
      <Card className="shadow-sm border-0 rounded-3 p-4 mb-4 bg-white">
        <h3 className="h5 fw-bold text-primary mb-3">Asignación de Profesores a Cursos</h3>
        
        {mensaje && <Alert variant="success">{mensaje}</Alert>}

        <Form onSubmit={handleAsignar}>
          <Row className="g-3 align-items-end">
            <Col md={5}>
              <Form.Group controlId="selectCurso">
                <Form.Label className="fw-semibold">Curso:</Form.Label>
                <Form.Select
                  value={cursoSeleccionado}
                  onChange={(e) => setCursoSeleccionado(e.target.value)}
                  required
                >
                  <option value="">Selecciona un curso...</option>
                  {cursos.map((c) => (
                    <option key={c.codigo} value={c.codigo}>
                      {c.codigo} - {c.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={5}>
              <Form.Group controlId="selectProfesor">
                <Form.Label className="fw-semibold">Profesor:</Form.Label>
                <Form.Select
                  value={profesorSeleccionado}
                  onChange={(e) => setProfesorSeleccionado(e.target.value)}
                  required
                >
                  {profesoresDisponibles.map((p, idx) => (
                    <option key={idx} value={p}>{p}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={2}>
              <Button type="submit" variant="primary" className="w-100 fw-semibold">
                Asignar Profesor
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      {/* Tabla de Programación Académica */}
      <Card className="shadow-sm border-0 rounded-3 p-4 bg-white">
        <h3 className="h5 fw-bold text-dark mb-3">Programación Académica de Cursos</h3>
        <Table responsive striped hover className="align-middle">
          <thead className="table-primary">
            <tr>
              <th>Código</th>
              <th>Curso</th>
              <th>Área</th>
              <th>Capacidad</th>
              <th>Profesor Asignado</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((c) => (
              <tr key={c.codigo}>
                <td className="fw-bold">{c.codigo}</td>
                <td>{c.nombre}</td>
                <td>{c.area}</td>
                <td><Badge bg="secondary">{c.capacidad}</Badge></td>
                <td className="fw-semibold text-primary">{c.profesor}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}