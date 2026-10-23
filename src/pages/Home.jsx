import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Datos por defecto para mostrar el catálogo inmediatamente
const cursosIniciales = [
  { codigo: 'CRS001', nombre: 'Fundamentos de Programación', area: 'Tecnología', duracion: '40 horas', cuposSeccion: 25, totalAnual: 850, profesor: 'Juan López', precio: 250000, img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500' },
  { codigo: 'CRS002', nombre: 'Diseño Gráfico Digital', area: 'Diseño', duracion: '35 horas', cuposSeccion: 20, totalAnual: 600, profesor: 'María González', precio: 220000, img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500' },
  { codigo: 'CRS003', nombre: 'Marketing Digital', area: 'Marketing', duracion: '30 horas', cuposSeccion: 25, totalAnual: 750, profesor: 'Carlos Soto', precio: 200000, img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500' },
  { codigo: 'CRS004', nombre: 'Electrónica Básica', area: 'Oficios Técnicos', duracion: '45 horas', cuposSeccion: 15, totalAnual: 450, profesor: 'Luis Pérez', precio: 280000, img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500' },
  { codigo: 'CRS005', nombre: 'Gestión de Proyectos', area: 'Administración', duracion: '35 horas', cuposSeccion: 20, totalAnual: 550, profesor: 'Ana Rodríguez', precio: 230000, img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500' }
];

export default function Home() {
  // 1. Inicializamos con los cursos por defecto en lugar de un arreglo vacío []
  const [cursos, setCursos] = useState(cursosIniciales);

  useEffect(() => {
    // 2. Intentamos conectar al servidor; si responde, actualizamos
    axios.get('http://localhost:5000/api/cursos')
      .then(res => {
        if (res.data && res.data.length > 0) setCursos(res.data);
      })
      .catch(() => {
        console.log("Servidor backend no detectado. Mostrando catálogo local.");
      });
  }, []);

  return (
    <Container className="my-5">
      {/* Hero Section */}
      <div className="bg-light p-4 p-md-5 rounded-3 mb-5 border shadow-sm">
        <Row className="align-items-center g-4">
          <Col lg={7}>
            <Badge bg="primary" className="mb-3 px-3 py-2 fs-6">
              Admisión 2026 Abierta
            </Badge>
            <h1 className="display-5 fw-bold text-dark mb-3">
              Construye tu futuro profesional en EducaPro
            </h1>
            <p className="lead text-muted mb-4">
              Aprende con metodologías prácticas, tecnología de vanguardia y docentes expertos en la industria.
            </p>
            <div className="d-flex gap-3">
              <Button as={Link} to="/contacto" variant="warning" size="lg" className="text-dark fw-bold shadow-sm">
                Inscribirme Ahora
              </Button>
              <Button href="#catalogo" variant="outline-primary" size="lg">
                Explorar Cursos
              </Button>
            </div>
          </Col>
          <Col lg={5}>
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1000&q=80"
              alt="Estudiantes EducaPro"
              className="img-fluid rounded shadow"
            />
          </Col>
        </Row>
      </div>

      {/* Catálogo de Cursos */}
      <section id="catalogo">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-dark display-6">Catálogo de Cursos Oficiales</h2>
          <p className="text-muted fs-5">3.200 cupos anuales distribuidos en nuestras 5 áreas de especialización</p>
        </div>

        <Row className="g-4">
          {cursos.map((curso) => (
            <Col md={6} lg={4} key={curso.codigo}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img variant="top" src={curso.img} alt={curso.nombre} style={{ height: '200px', objectFit: 'cover' }} />
                <Card.Body className="d-flex flex-column">
                  <div>
                    <Badge bg="info" text="dark" className="mb-2">{curso.area}</Badge>
                    <Card.Title className="h5 text-dark fw-bold">{curso.codigo} - {curso.nombre}</Card.Title>
                    <Card.Text className="text-muted mb-1">Duración: {curso.duracion}</Card.Text>
                    <Card.Text className="text-muted mb-1">Cupo por sección: {curso.cuposSeccion} alumnos</Card.Text>
                    <Card.Text className="text-dark fw-semibold mb-2">Cupos Anuales: {curso.totalAnual} estudiantes</Card.Text>
                    <Card.Text className="text-primary fw-bold mb-3">Profesor asignado: {curso.profesor}</Card.Text>
                  </div>
                  <div className="mt-auto pt-3 d-flex justify-content-between align-items-center border-top">
                    <span className="fs-5 fw-bold text-dark">${curso.precio.toLocaleString('es-CL')} CLP</span>
                    <Button as={Link} to="/contacto" variant="primary" className="fw-semibold">
                      Matricularse
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </Container>
  );
}