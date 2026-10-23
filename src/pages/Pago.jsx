import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

export default function Pago() {
  const navigate = useNavigate();
  const [alumno, setAlumno] = useState(null);
  const [formData, setFormData] = useState({
    tarjeta: '',
    expiracion: '',
    cvc: ''
  });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem('alumnoInscrito');
    if (data) {
      setAlumno(JSON.parse(data));
    }
  }, []);

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

    if (alumno) {
      // 1. Actualizar estado de pago del alumno
      const alumnoActualizado = { ...alumno, pagado: true };
      localStorage.setItem('alumnoInscrito', JSON.stringify(alumnoActualizado));

      // 2. Incrementar contador global de estudiantes
      let totalActual = parseInt(localStorage.getItem('totalEstudiantesGlobal')) || 3200;
      totalActual += 1;
      localStorage.setItem('totalEstudiantesGlobal', totalActual);

      alert('¡Pago realizado con éxito! Tu matrícula ha sido activada.');
      navigate('/estudiante');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col lg={6}>
          <Card className="shadow-sm border-0 rounded-3 p-4 bg-white">
            <h1 className="h3 fw-bold text-primary mb-3">Pasarela de Pago Simulado</h1>

            {!alumno ? (
              <Alert variant="warning">
                <strong>No hay inscripciones pendientes.</strong> Por favor completa el formulario de inscripción primero.
                <div className="mt-3">
                  <Button as={Link} to="/contacto" variant="primary" size="sm">
                    Ir a Inscripción
                  </Button>
                </div>
              </Alert>
            ) : (
              <>
                {/* Resumen de Inscripción */}
                <Alert variant="info" className="mb-4">
                  <h5 className="fw-bold mb-2">Resumen de Inscripción</h5>
                  <p className="mb-1"><strong>Estudiante:</strong> {alumno.nombre}</p>
                  <p className="mb-1"><strong>RUT:</strong> {alumno.rut}</p>
                  <p className="mb-0"><strong>Curso:</strong> {alumno.curso}</p>
                </Alert>

                {/* Formulario de Pago */}
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="txtTarjeta">
                    <Form.Label className="fw-semibold">Número de Tarjeta (Simulación)</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="tarjeta"
                      placeholder="4500 0000 0000 0000"
                      value={formData.tarjeta}
                      onChange={handleChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresa un número de tarjeta.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Row className="g-3 mb-4">
                    <Col xs={6}>
                      <Form.Group controlId="txtExpiracion">
                        <Form.Label className="fw-semibold">MM/AA</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="expiracion"
                          placeholder="12/28"
                          value={formData.expiracion}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Ingresa fecha.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col xs={6}>
                      <Form.Group controlId="txtCvc">
                        <Form.Label className="fw-semibold">CVC</Form.Label>
                        <Form.Control
                          required
                          type="password"
                          maxLength={3}
                          name="cvc"
                          placeholder="123"
                          value={formData.cvc}
                          onChange={handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                          Ingresa CVC.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Button type="submit" variant="success" size="lg" className="w-100 fw-semibold">
                    Confirmar Pago de Matrícula
                  </Button>
                </Form>
              </>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
}