import React, { useState, useEffect } from 'react';
import { Container, Card, Table, Button, Badge, Form } from 'react-bootstrap';

const cursosIniciales = [
  { codigo: 'CRS001', nombre: 'Fundamentos de Programación', area: 'Tecnología', cuposSeccion: '25 alumnos', totalAnual: 850, profesor: 'Juan López' },
  { codigo: 'CRS002', nombre: 'Diseño Gráfico Digital', area: 'Diseño', cuposSeccion: '20 alumnos', totalAnual: 600, profesor: 'María González' },
  { codigo: 'CRS003', nombre: 'Marketing Digital', area: 'Marketing', cuposSeccion: '25 alumnos', totalAnual: 750, profesor: 'Carlos Soto' },
  { codigo: 'CRS004', nombre: 'Electrónica Básica', area: 'Oficios Técnicos', cuposSeccion: '20 alumnos', totalAnual: 450, profesor: 'Luis Pérez' },
  { codigo: 'CRS005', nombre: 'Gestión de Proyectos', area: 'Administración', cuposSeccion: '25 alumnos', totalAnual: 550, profesor: 'Ana Rodríguez' }
];

export default function Admin() {
  const [cursos, setCursos] = useState(cursosIniciales);
  const [totalEstudiantes, setTotalEstudiantes] = useState(3200);

  useEffect(() => {
    const totalGuardado = parseInt(localStorage.getItem('totalEstudiantesGlobal')) || 3200;
    setTotalEstudiantes(totalGuardado);
  }, []);

  const reiniciarContador = () => {
    localStorage.setItem('totalEstudiantesGlobal', 3200);
    setTotalEstudiantes(3200);
  };

  const handleProfesorChange = (codigo, nuevoProfesor) => {
    const cursosActualizados = cursos.map((curso) =>
      curso.codigo === codigo ? { ...curso, profesor: nuevoProfesor } : curso
    );
    setCursos(cursosActualizados);
  };

  const handleActualizar = (nombreCurso, profesor) => {
    alert(`Asignación actualizada: ${profesor} asignado a ${nombreCurso}.`);
  };

  return (
    <Container className="my-5">
      <Card className="p-4 rounded-4 shadow-sm border-0 bg-white">
        <div className="d-flex justify-content-between align-items-center mb-2 flex-wrap gap-2">
          <h2 className="fw-bold text-primary mb-0">Programación de Cursos y Asignación de Profesores</h2>
          <Button variant="outline-secondary" size="sm" onClick={reiniciarContador}>
            Reiniciar Contador a 3.200
          </Button>
        </div>
        <p className="text-muted small mb-4">
          Capacidad máxima por sala/sección (20-25 alumnos) y proyección de distribución anual.
        </p>

        <Table responsive striped align="middle">
          <thead className="table-primary">
            <tr>
              <th>Código</th>
              <th>Nombre del Curso</th>
              <th>Área</th>
              <th>Cupos Máx. (Sección)</th>
              <th>Total Anual</th>
              <th>Profesor Asignado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((c) => (
              <tr key={c.codigo}>
                <td className="fw-bold">{c.codigo}</td>
                <td>{c.nombre}</td>
                <td>{c.area}</td>
                <td>
                  <Badge bg="secondary">{c.cuposSeccion}</Badge>
                </td>
                <td><strong>{c.totalAnual} cupos</strong></td>
                <td>
                  <Form.Select
                    size="sm"
                    value={c.profesor}
                    onChange={(e) => handleProfesorChange(c.codigo, e.target.value)}
                    className="fw-semibold text-dark"
                    style={{ maxWidth: '200px' }}
                  >
                    <option value="Juan López">Juan López</option>
                    <option value="María González">María González</option>
                    <option value="Carlos Soto">Carlos Soto</option>
                    <option value="Luis Pérez">Luis Pérez</option>
                    <option value="Ana Rodríguez">Ana Rodríguez</option>
                  </Form.Select>
                </td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => handleActualizar(c.nombre, c.profesor)}
                  >
                    Actualizar
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="table-light">
            <tr>
              <td colSpan={4} className="fw-bold text-end">Capacidad Total de la Institución:</td>
              <td colSpan={3} className="fw-bold text-primary fs-6">
                <span>{totalEstudiantes.toLocaleString('es-CL')}</span> Cupos Estudiantiles
              </td>
            </tr>
          </tfoot>
        </Table>
      </Card>
    </Container>
  );
}