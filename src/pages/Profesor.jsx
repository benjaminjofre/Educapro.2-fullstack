import React, { useState } from 'react';
import { Container, Card, Table, Form, Button, Badge } from 'react-bootstrap';

const datosDocentesIniciales = {
  "Juan López": [
    { rut: "19.876.543-2", nombre: "Carlos Mendoza Silva", n1: 6.5, n2: 5.8, asistencia: 90, estado: "En curso" },
    { rut: "20.123.456-7", nombre: "Andrea Contreras Pérez", n1: 7.0, n2: 6.8, asistencia: 95, estado: "En curso" }
  ],
  "María González": [
    { rut: "21.098.765-4", nombre: "Valentina Rojas Soto", n1: 5.5, n2: 6.0, asistencia: 85, estado: "En curso" }
  ],
  "Carlos Soto": [
    { rut: "20.456.789-1", nombre: "Sofia Navarro Gómez", n1: 6.0, n2: 6.2, asistencia: 92, estado: "En curso" }
  ],
  "Luis Pérez": [
    { rut: "19.654.321-9", nombre: "Camila Henríquez Bravo", n1: 4.5, n2: 5.0, asistencia: 80, estado: "En curso" }
  ],
  "Ana Rodríguez": [
    { rut: "20.789.012-5", nombre: "Fernanda Palma Torres", n1: 6.8, n2: 6.9, asistencia: 100, estado: "En curso" }
  ]
};

export default function Profesor() {
  const [profesorSeleccionado, setProfesorSeleccionado] = useState("Juan López");
  const [datosDocentes, setDatosDocentes] = useState(datosDocentesIniciales);

  const alumnos = datosDocentes[profesorSeleccionado] || [];

  const handleInputChange = (index, field, value) => {
    const nuevosAlumnos = [...alumnos];
    nuevosAlumnos[index][field] = value;
    setDatosDocentes({ ...datosDocentes, [profesorSeleccionado]: nuevosAlumnos });
  };

  const guardarCambios = () => {
    alert("Calificaciones y asistencia actualizadas correctamente[cite: 6].");
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap gap-3">
        <div>
          <h1 className="h2 fw-bold text-dark mb-1">Portal del Docente</h1>
          <p className="text-muted mb-0">Gestión digital de notas y asistencia de asignaturas asignadas[cite: 6].</p>
        </div>
        <div className="bg-white p-3 rounded shadow-sm border">
          <Form.Label className="fw-bold mb-1">Docente activo:</Form.Label>
          <Form.Select
            value={profesorSeleccionado}
            onChange={(e) => setProfesorSeleccionado(e.target.value)}
            className="fw-semibold text-primary"
          >
            <option value="Juan López">Prof. Juan López (CRS001)</option>
            <option value="María González">Prof. María González (CRS002)</option>
            <option value="Carlos Soto">Prof. Carlos Soto (CRS003)</option>
            <option value="Luis Pérez">Prof. Luis Pérez (CRS004)</option>
            <option value="Ana Rodríguez">Prof. Ana Rodríguez (CRS005)</option>
          </Form.Select>
        </div>
      </div>

      <Card className="shadow-sm border-0 rounded-3 p-4 mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 fw-bold text-dark m-0">Registro Directo de Calificaciones y Asistencia</h2>
          <Badge bg="success" className="px-3 py-2">Sincronización Instantánea</Badge>
        </div>
        <p className="text-muted mb-4">Ingresa y actualiza los datos académicos sin usar planillas manuales[cite: 6].</p>

        <Table responsive hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th>RUT Estudiante</th>
              <th>Nombre Completo</th>
              <th style={{ width: '150px' }}>Nota 1</th>
              <th style={{ width: '150px' }}>Nota 2</th>
              <th style={{ width: '180px' }}>% Asistencia</th>
              <th>Estado Actual</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map((e, idx) => (
              <tr key={e.rut}>
                <td className="fw-semibold text-secondary">{e.rut}</td>
                <td className="fw-bold">{e.nombre}</td>
                <td>
                  <Form.Control
                    type="number"
                    step="0.1"
                    min="1"
                    max="7"
                    value={e.n1}
                    onChange={(evt) => handleInputChange(idx, 'n1', evt.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    step="0.1"
                    min="1"
                    max="7"
                    value={e.n2}
                    onChange={(evt) => handleInputChange(idx, 'n2', evt.target.value)}
                  />
                </td>
                <td>
                  <Form.Control
                    type="number"
                    min="0"
                    max="100"
                    value={e.asistencia}
                    onChange={(evt) => handleInputChange(idx, 'asistencia', evt.target.value)}
                  />
                </td>
                <td><Badge bg="info" text="dark">{e.estado}</Badge></td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-end mt-3">
          <Button variant="primary" size="lg" className="px-4" onClick={guardarCambios}>
            Guardar Cambios
          </Button>
        </div>
      </Card>
    </Container>
  );
}