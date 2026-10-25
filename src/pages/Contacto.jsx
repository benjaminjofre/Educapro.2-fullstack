import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Contacto() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    rut: '',
    email: '',
    telefono: '',
    curso: ''
  });

  const [validated, setValidated] = useState(false);
  const [mensajeExito, setMensajeExito] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setMensajeExito(true);


    const alumno = {
      nombre: formData.nombre,
      rut: formData.rut,
      email: formData.email,
      telefono: formData.telefono,
      curso: formData.curso,
      pagado: false
    };
    localStorage.setItem('alumnoInscrito', JSON.stringify(alumno));


    setTimeout(() => {
      navigate('/pago');
    }, 1000);
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={10} xl={9}>
          <Card className="shadow-sm border-0 rounded-4 p-4 p-md-5 bg-white">
            <h1 className="h3 fw-bold text-primary mb-4">Formulario de Inscripción</h1>

            {mensajeExito && (
              <Alert variant="success" className="mb-4">
                ¡Inscripción registrada con éxito! Redirigiendo al Pago de Matrícula...
              </Alert>
            )}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="g-3">
                <Col md={6}>
                  <Form.Group controlId="txtNombre">
                    <Form.Label className="fw-semibold text-dark">Nombre Completo</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="nombre"
                      placeholder="Ej: Juan Pérez"
                      value={formData.nombre}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa tu nombre completo.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="txtRut">
                    <Form.Label className="fw-semibold text-dark">RUT Alumno/a</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="rut"
                      placeholder="12.345.678-K"
                      value={formData.rut}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa un RUT válido.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="txtEmail">
                    <Form.Label className="fw-semibold text-dark">Correo Electrónico</Form.Label>
                    <Form.Control
                      required
                      type="email"
                      name="email"
                      placeholder="nombre@ejemplo.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa un correo electrónico válido.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group controlId="txtTelefono">
                    <Form.Label className="fw-semibold text-dark">Teléfono de Contacto</Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      name="telefono"
                      placeholder="+56 9 1234 5678"
                      value={formData.telefono}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa un teléfono de contacto.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col xs={12}>
                  <Form.Group controlId="selectCurso">
                    <Form.Label className="fw-semibold text-dark">Curso a Inscribir</Form.Label>
                    <Form.Select
                      required
                      name="curso"
                      value={formData.curso}
                      onChange={handleChange}
                    >
                      <option value="" disabled>Selecciona una asignatura...</option>
                      <option value="CRS001 - Fundamentos de Programación">CRS001 - Fundamentos de Programación</option>
                      <option value="CRS002 - Diseño Gráfico Digital">CRS002 - Diseño Gráfico Digital</option>
                      <option value="CRS003 - Marketing Digital">CRS003 - Marketing Digital</option>
                      <option value="CRS004 - Electrónica Básica">CRS004 - Electrónica Básica</option>
                      <option value="CRS005 - Gestión de Proyectos">CRS005 - Gestión de Proyectos</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Selecciona un curso de la lista.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Col xs={12} className="mt-4 text-end">
                  <Button type="submit" variant="primary" size="lg" className="px-4 py-2 fw-semibold fs-6">
                    Continuar al Pago de Matrícula
                  </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}