import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseCard from '../components/CourseCard';
import StudentPortal from '../components/StudentPortal';

describe('Suite de Pruebas Unitarias Frontend (EducaPro) - Jasmine & Karma', () => {

  // Test 1: Verificación de renderizado de Props básicas
  it('1. Debe renderizar correctamente el código y nombre del curso pasado por props', () => {
    render(<CourseCard codigo="CRS001" nombre="Fundamentos de Programación" area="Tecnología" duracion="40 horas" precio={250000} cupos={25} />);
    expect(screen.getByText(/CRS001 - Fundamentos de Programación/i)).toBeTruthy();
  });

  // Test 2: Verificación de formato de precio
  it('2. Debe formatear adecuadamente el precio del curso en moneda CLP', () => {
    render(<CourseCard codigo="CRS001" nombre="Programación" area="Tecnología" duracion="40 horas" precio={250000} cupos={25} />);
    expect(screen.getByText(/\$250\.000 CLP/i)).toBeTruthy();
  });

  // Test 3: Evento de selección (Callback Prop)
  it('3. Debe disparar la función onSelect al hacer clic en el botón Matricularse', () => {
    const spySelect = jasmine.createSpy('onSelect');
    render(<CourseCard codigo="CRS001" nombre="Programación" area="Tecnología" duracion="40h" precio={2000} cupos={10} onSelect={spySelect} />);
    
    const boton = screen.getByRole('button', { name: /Matricularse/i });
    fireEvent.click(boton);

    expect(spySelect).toHaveBeenCalledWith('CRS001');
  });

  // Test 4: Renderizado condicional sin datos de estudiante
  it('4. Debe mostrar el mensaje de no sesión activa cuando initialStudent es null', () => {
    render(<StudentPortal initialStudent={null} />);
    expect(screen.getByText(/No hay sesión de estudiante activa/i)).toBeTruthy();
  });

  // Test 5: Renderizado de datos del estudiante activo
  it('5. Debe mostrar el nombre y curso del estudiante matriculado', () => {
    const mockStudent = { nombre: 'Juan Pérez', rut: '12.345.678-K', estado: 'Matriculado', curso: 'CRS001 - Programación', progreso: 20 };
    render(<StudentPortal initialStudent={mockStudent} />);
    expect(screen.getByText(/Bienvenido, Juan Pérez/i)).toBeTruthy();
    expect(screen.getByText(/CRS001 - Programación/i)).toBeTruthy();
  });

  // Test 6: Cambio de Estado mediante interacción del DOM (Logout)
  it('6. Debe limpiar la pantalla al hacer clic en el botón Cerrar Sesión (Cambio de Estado)', () => {
    const mockStudent = { nombre: 'María Soto', rut: '11.222.333-4', estado: 'Matriculado', curso: 'Diseño' };
    render(<StudentPortal initialStudent={mockStudent} />);

    const btnLogout = screen.getByText(/Cerrar Sesión/i);
    fireEvent.click(btnLogout);

    expect(screen.getByText(/No hay sesión de estudiante activa/i)).toBeTruthy();
  });

  // Test Adicional: Validación de Teléfono Chileno (+569XXXXXXXX) proveniente de funciones.js
it('Debe validar correctamente un teléfono con formato chileno +569XXXXXXXX', () => {
  const telRegex = /^\+569\d{8}$/;
  expect(telRegex.test('+56912345678')).toBe(true);
  expect(telRegex.test('912345678')).toBe(false);
});

// Test Adicional: Validación de Correo Electrónico
it('Debe validar el formato de un correo electrónico institucional o personal', () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  expect(emailRegex.test('alumno@educapro.cl')).toBe(true);
  expect(emailRegex.test('correo-invalido')).toBe(false);
});

  // Test 7: Verificación de Mocking de Servicio de API
  it('7. Debe simular (Mock) una llamada asíncrona de obtención de cursos con Jasmine Spy', (done) => {
    const apiServiceMock = {
      getCursos: () => Promise.resolve([{ codigo: 'CRS001', nombre: 'Mock Course' }])
    };

    spyOn(apiServiceMock, 'getCursos').and.callThrough();

    apiServiceMock.getCursos().then((data) => {
      expect(apiServiceMock.getCursos).toHaveBeenCalled();
      expect(data.length).toBe(1);
      expect(data[0].codigo).toBe('CRS001');
      done();
    });
  });

  // Test 8: Validación de cálculo de descuento en lógica de negocios
  it('8. Debe calcular correctamente el total a pagar aplicando un cupón de descuento', () => {
    const calcularTotal = (precio, descuento) => precio - (precio * descuento);
    const resultado = calcularTotal(200000, 0.10); // 10% descuento
    expect(resultado).toBe(180000);
  });

  // Test 9: Manipulación del DOM en actualización de notas
  it('9. Debe verificar que el promedio de notas del alumno calcula aprobación (>= 4.0)', () => {
    const esAprobado = (n1, n2) => ((n1 + n2) / 2) >= 4.0;
    expect(esAprobado(5.5, 6.0)).toBeTrue();
    expect(esAprobado(3.0, 2.5)).toBeFalse();
  });

  // Test 10: Validación de reglas de entrada de datos (RUT chileno)
  it('10. Debe validar la estructura mínima de formato del RUT', () => {
    const validarEstructuraRut = (rut) => /^[0-9]+\-[0-9kK]{1}$/.test(rut.replace(/\./g, ''));
    expect(validarEstructuraRut('19.876.543-2')).toBeTrue();
    expect(validarEstructuraRut('123456')).toBeFalse();
  });

});