import React from 'react';
import { Container, Row, Col, Card, Table, Badge } from 'react-bootstrap';

export default function Director() {
  const eficienciaAreas = [
    { area: 'Tecnología', cursos: 25, alumnos: '1.000', desercion: '3%', estado: 'Óptimo', variant: 'success' },
    { area: 'Diseño', cursos: 20, alumnos: '800', desercion: '5%', estado: 'Óptimo', variant: 'success' },
    { area: 'Administración', cursos: 15, alumnos: '600', desercion: '2%', estado: 'Excelente', variant: 'primary' },
  ];

  return (
    <Container className="my-5">
      <h2 className="fw-bold text-dark mb-4">Reportes Estratégicos y Rendimiento Académico</h2>

      {/* Indicadores Clave de Rendimiento (KPIs) */}
      <Row className="g-4 mb-5">
        <Col md={4}>
          <Card className="shadow-sm border-0 text-center p-3 h-100 bg-white">
            <Card.Body className="d-flex flex-column justify-content-center">
              <Card.Title className="h5 text-muted mb-3">Estudiantes Matriculados</Card.Title>
              <p className="display-5 fw-bold text-dark mb-0">3.200</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 text-center p-3 h-100 bg-white">
            <Card.Body className="d-flex flex-column justify-content-center">
              <Card.Title className="h5 text-muted mb-3">Tasa de Aprobación</Card.Title>
              <p className="display-5 fw-bold text-success mb-0">92%</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0 text-center p-3 h-100 bg-white">
            <Card.Body className="d-flex flex-column justify-content-center">
              <Card.Title className="h5 text-muted mb-3">Margen de Error de Notas</Card.Title>
              <p className="display-6 fw-bold text-danger mb-0">0%</p>
              <small className="text-muted mt-1">(Sistema Digital)</small>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Tabla Eficiencia y Deserción por Área */}
      <Card className="shadow-sm border-0 rounded-3 p-4 bg-white">
        <h3 className="h5 fw-bold text-dark mb-3">Eficiencia de Cursos y Deserción</h3>
        <Table responsive striped hover className="align-middle">
          <thead className="table-dark">
            <tr>
              <th>Área</th>
              <th>Cursos Activos</th>
              <th>Alumnos Totales</th>
              <th>Tasa Deserción</th>
              <th>Estado General</th>
            </tr>
          </thead>
          <tbody>
            {eficienciaAreas.map((item, idx) => (
              <tr key={idx}>
                <td className="fw-bold">{item.area}</td>
                <td>{item.cursos}</td>
                <td>{item.alumnos}</td>
                <td className="text-danger fw-semibold">{item.desercion}</td>
                <td>
                  <Badge bg={item.variant}>{item.estado}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </Container>
  );
}