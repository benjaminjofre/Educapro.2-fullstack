import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Table, Button } from 'react-bootstrap';
import * as XLSX from 'xlsx';

export default function Estadisticas() {
  const [reporteCursos, setReporteCursos] = useState([
    { codigo: 'CRS001', nombre: 'Fundamentos de Programación', inscritos: 850 },
    { codigo: 'CRS002', nombre: 'Diseño Gráfico Digital', inscritos: 600 },
    { codigo: 'CRS003', nombre: 'Marketing Digital', inscritos: 750 },
    { codigo: 'CRS004', nombre: 'Electrónica Básica', inscritos: 450 },
    { codigo: 'CRS005', nombre: 'Gestión de Proyectos', inscritos: 550 }
  ]);

  const [totalMatriculas, setTotalMatriculas] = useState(3200);

  // Exportar datos a Excel equivalente a descargarExcelCalificaciones() en funciones.js
  const exportarAExcel = () => {
    if (!reporteCursos || reporteCursos.length === 0) {
      alert("No hay datos para exportar a Excel.");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(reporteCursos);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Reporte_Inscritos");
    XLSX.writeFile(workbook, 'Reporte_Calificaciones_EducaPro.xlsx');
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark m-0">Reportes de Eficiencia Académica</h2>
        <Button variant="success" onClick={exportarAExcel} className="fw-bold">
          📊 Exportar a Excel (.xlsx)
        </Button>
      </div>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="text-white bg-primary mb-3 shadow-sm">
            <Card.Body>
              <Card.Title>Total de Matrículas</Card.Title>
              <h2 className="display-5 fw-bold">{totalMatriculas}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center shadow-sm border-success">
            <Card.Body>
              <Card.Title className="text-success">Índice de Aprobación</Card.Title>
              <p className="display-4 fw-bold my-2">92%</p>
              <p className="text-muted small">Aumento respecto a periodo manual</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="text-center shadow-sm border-warning">
            <Card.Body>
              <Card.Title className="text-warning">Tiempo de Certificación</Card.Title>
              <p className="display-4 fw-bold my-2">24h</p>
              <p className="text-muted small">Reducido desde 5 días hábiles</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="shadow-sm border-0">
        <Card.Header className="bg-dark text-white">
          <h5 className="mb-0">Cantidad de Inscritos por Curso</h5>
        </Card.Header>
        <Card.Body>
          <Table responsive striped hover className="align-middle">
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre del Curso</th>
                <th className="text-center">Inscritos</th>
              </tr>
            </thead>
            <tbody>
              {reporteCursos.map((item) => (
                <tr key={item.codigo}>
                  <td><strong>{item.codigo}</strong></td>
                  <td>{item.nombre}</td>
                  <td className="text-center">
                    <span className="badge bg-success fs-6">{item.inscritos}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
}