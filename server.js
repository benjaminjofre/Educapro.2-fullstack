const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let cursos = [
  { codigo: 'CRS001', nombre: 'Fundamentos de Programación', area: 'Tecnología', duracion: '40 horas', cuposSeccion: 25, totalAnual: 850, profesor: 'Juan López', precio: 250000, img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500' },
  { codigo: 'CRS002', nombre: 'Diseño Gráfico Digital', area: 'Diseño', duracion: '35 horas', cuposSeccion: 20, totalAnual: 600, profesor: 'María González', precio: 220000, img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500' },
  { codigo: 'CRS003', nombre: 'Marketing Digital', area: 'Marketing', duracion: '30 horas', cuposSeccion: 25, totalAnual: 750, profesor: 'Carlos Soto', precio: 200000, img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500' },
  { codigo: 'CRS004', nombre: 'Electrónica Básica', area: 'Oficios Técnicos', duracion: '45 horas', cuposSeccion: 15, totalAnual: 450, profesor: 'Luis Pérez', precio: 280000, img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=500' },
  { codigo: 'CRS005', nombre: 'Gestión de Proyectos', area: 'Administración', duracion: '35 horas', cuposSeccion: 20, totalAnual: 550, profesor: 'Ana Rodríguez', precio: 230000, img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500' }
];

let inscripciones = [];
let totalEstudiantesGlobal = 3200;

app.get('/api/cursos', (req, res) => res.json(cursos));

app.post('/api/inscribir', (req, res) => {
  const estudiante = req.body;
  estudiante.pagado = false;
  inscripciones.push(estudiante);
  res.status(201).json({ message: 'Inscripción registrada', estudiante });
});

app.post('/api/pagar', (req, res) => {
  const { rut } = req.body;
  const alumno = inscripciones.find(i => i.rut === rut);
  if (alumno) {
    alumno.pagado = true;
    totalEstudiantesGlobal += 1;
    res.json({ message: 'Pago completado con éxito', alumno });
  } else {
    res.status(404).json({ message: 'Estudiante no encontrado' });
  }
});

app.get('/api/stats', (req, res) => {
  res.json({
    totalMatriculas: totalEstudiantesGlobal,
    tasaAprobacion: '92%',
    tiempoCertificacion: '24h'
  });
});

app.listen(PORT, () => console.log(`Servidor Node.js corriendo en http://localhost:${PORT}`));