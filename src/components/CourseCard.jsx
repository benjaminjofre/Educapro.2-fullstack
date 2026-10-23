import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';

export default function CourseCard({ codigo, nombre, area, duracion, precio, cupos, onSelect }) {
  return (
    <Card className="h-100 shadow-sm border-0" data-testid="course-card">
      <Card.Body className="d-flex flex-column">
        <div>
          <Badge bg="info" text="dark" className="mb-2">{area}</Badge>
          <Card.Title className="h5 text-dark fw-bold">{codigo} - {nombre}</Card.Title>
          <Card.Text className="text-muted mb-1">Duración: {duracion}</Card.Text>
          <Card.Text className="text-dark fw-semibold mb-3">Cupos disponibles: {cupos}</Card.Text>
        </div>
        <div className="mt-auto pt-3 d-flex justify-content-between align-items-center border-top">
          <span className="fs-5 fw-bold text-dark">${precio.toLocaleString('es-CL')} CLP</span>
          <Button variant="primary" onClick={() => onSelect(codigo)}>
            Matricularse
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}