import React, { useState } from 'react';
import { Card, Button, ProgressBar, Badge } from 'react-bootstrap';

export default function PortalEstudiantil({ initialStudent }) {
  const [student, setStudent] = useState(initialStudent);

  const handleLogout = () => {
    setStudent(null);
  };

  if (!student) {
    return (
      <Card className="p-4 text-center">
        <h3>No hay sesión de estudiante activa</h3>
      </Card>
    );
  }

  return (
    <Card className="p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Bienvenido, {student.nombre}</h2>
        <Button variant="outline-danger" size="sm" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </div>
      <p>RUT: {student.rut} | Estado: <Badge bg="success">{student.estado}</Badge></p>
      <h4 className="mt-3">{student.curso}</h4>
      <ProgressBar now={student.progreso || 10} label={`${student.progreso || 10}%`} className="my-2" />
    </Card>
  );
}