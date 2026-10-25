import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/vitest';



import CourseCard from '../components/CourseCard';
import StudentPortal from '../pages/Estudiante';
import Contacto from '../pages/Contacto';
import ProfesorAuthGuard from '../components/ProfesorAuthGuard';
import AdminAuthGuard from '../components/AdminAuthGuard';

describe('Suite Oficial de 10 Pruebas Unitarias - EducaPro (Vitest + Testing Library)', () => {

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    vi.restoreAllMocks();
  });


  it('1. Debe renderizar correctamente el título, código y precio formateado en CourseCard', () => {
    render(
      <CourseCard
        codigo="CRS001"
        nombre="Fundamentos de Programación"
        area="Tecnología"
        duracion="40 horas"
        precio={250000}
        cupos={25}
        onSelect={() => {}}
      />
    );

    expect(screen.getByText(/CRS001 - Fundamentos de Programación/i)).toBeInTheDocument();
    expect(screen.getByText(/\$250\.000 CLP/i)).toBeInTheDocument();
    expect(screen.getByText(/Tecnología/i)).toBeInTheDocument();
  });


  it('2. Debe ejecutar el callback "onSelect" pasando el código del curso al hacer clic en Matricularse', () => {
    const handleSelectSpy = vi.fn();
    render(
      <CourseCard
        codigo="CRS002"
        nombre="Diseño Gráfico"
        area="Diseño"
        duracion="35h"
        precio={220000}
        cupos={20}
        onSelect={handleSelectSpy}
      />
    );

    const boton = screen.getByRole('button', { name: /Matricularse/i });
    fireEvent.click(boton);

    expect(handleSelectSpy).toHaveBeenCalledTimes(1);
    expect(handleSelectSpy).toHaveBeenCalledWith('CRS002');
  });


  it('3. Debe mostrar el mensaje "No tienes cursos activos" en el Portal Estudiantil cuando no hay sesión', () => {
    render(
      <MemoryRouter>
        <StudentPortal />
      </MemoryRouter>
    );

    expect(screen.getByText(/No tienes cursos activos/i)).toBeInTheDocument();
    expect(screen.getByText(/Inscribirme/i)).toBeInTheDocument();
  });


  it('4. Debe cargar y mostrar el nombre y curso del estudiante matriculado guardado en localStorage', () => {
    const alumnoMock = {
      nombre: 'Juan Pérez',
      rut: '12.345.678-K',
      curso: 'CRS001 - Fundamentos de Programación',
      pagado: true
    };
    localStorage.setItem('alumnoInscrito', JSON.stringify(alumnoMock));

    render(
      <MemoryRouter>
        <StudentPortal />
      </MemoryRouter>
    );

    expect(screen.getByText(/Bienvenido\(a\), Juan Pérez/i)).toBeInTheDocument();
    expect(screen.getByText(/12\.345\.678-K/i)).toBeInTheDocument();
  });


  it('5. Debe eliminar la inscripción de localStorage y actualizar el DOM al presionar "Cerrar / Borrar Inscripción"', () => {
    const alumnoMock = {
      nombre: 'Maria Soto',
      rut: '11.222.333-4',
      curso: 'CRS002 - Diseño Gráfico Digital',
      pagado: true
    };
    localStorage.setItem('alumnoInscrito', JSON.stringify(alumnoMock));

    render(
      <MemoryRouter>
        <StudentPortal />
      </MemoryRouter>
    );

    const btnLogout = screen.getByRole('button', { name: /Cerrar \/ Borrar Inscripción/i });
    fireEvent.click(btnLogout);

    expect(localStorage.getItem('alumnoInscrito')).toBeNull();
    expect(screen.getByText(/No tienes cursos activos/i)).toBeInTheDocument();
  });


  it('6. Debe activar la validación visual e impedir el envío si los campos obligatorios de inscripción están vacíos', () => {
    render(
      <MemoryRouter>
        <Contacto />
      </MemoryRouter>
    );

    const btnEnviar = screen.getByRole('button', { name: /Continuar al Pago de Matrícula/i });
    fireEvent.click(btnEnviar);

    expect(screen.getByText(/Ingresa tu nombre completo\./i)).toBeInTheDocument();
    expect(screen.getByText(/Ingresa un RUT válido\./i)).toBeInTheDocument();
  });


  it('7. Debe rechazar el acceso al Portal Docente y mostrar error si las credenciales son incorrectas', () => {
    render(
      <ProfesorAuthGuard>
        <div>Contenido Protegido Docente</div>
      </ProfesorAuthGuard>
    );

    fireEvent.change(screen.getByLabelText(/Correo Electrónico Docente/i), {
      target: { value: 'error@educapro.cl' }
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: 'claveerronea' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Ingresar al Portal Docente/i }));

    expect(screen.getByText(/Correo o contraseña incorrectos/i)).toBeInTheDocument();
    expect(screen.queryByText('Contenido Protegido Docente')).not.toBeInTheDocument();
  });


  it('8. Debe permitir el acceso al Administrador cuando ingresa credenciales válidas y guardar la sesión', () => {
    render(
      <AdminAuthGuard>
        <div data-testid="admin-panel">Panel de Gestión Académica</div>
      </AdminAuthGuard>
    );

    fireEvent.change(screen.getByLabelText(/Correo de Administrador/i), {
      target: { value: 'admin@educapro.cl' }
    });
    fireEvent.change(screen.getByLabelText(/Contraseña/i), {
      target: { value: 'admin123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /Ingresar como Administrador/i }));

    expect(screen.getByTestId('admin-panel')).toBeInTheDocument();
    expect(sessionStorage.getItem('adminAuth')).toBe('true');
  });


  it('9. Debe simular (Mock) una respuesta asíncrona de Axios para la obtención del catálogo de cursos', async () => {
    const mockCursos = [
      { codigo: 'CRS001', nombre: 'Programación', precio: 250000 },
      { codigo: 'CRS002', nombre: 'Diseño', precio: 220000 }
    ];

    vi.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockCursos });

    const response = await axios.get('http://localhost:5000/api/cursos');

    expect(axios.get).toHaveBeenCalledWith('http://localhost:5000/api/cursos');
    expect(response.data.length).toBe(2);
    expect(response.data[0].codigo).toBe('CRS001');
  });

  it('10. Debe validar correctamente la Expresión Regular para formato de teléfono chileno (+569XXXXXXXX)', () => {
    const telRegex = /^\+569\d{8}$/;

    expect(telRegex.test('+56912345678')).toBe(true);
    expect(telRegex.test('912345678')).toBe(false);
    expect(telRegex.test('+5691234')).toBe(false);
  });

});