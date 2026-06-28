import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import condominiumsRoutes from './routes/condominiums.js';
import techniciansRoutes from './routes/technicians.js';
import serviceCallsRoutes from './routes/serviceCalls.js';
import reportsRoutes from './routes/reports.js';
import categoriesRoutes from './routes/categories.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotas
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'SPH1 Backend is running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/condominiums', condominiumsRoutes);
app.use('/api/technicians', techniciansRoutes);
app.use('/api/service-calls', serviceCallsRoutes);
app.use('/api/reports', reportsRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`🚀 SPH1 Backend running on port ${PORT}`);
  console.log(`📚 API Documentation:`);
  console.log(`   POST   /api/auth/register`);
  console.log(`   POST   /api/auth/login`);
  console.log(`   GET    /api/categories`);
  console.log(`   GET    /api/condominiums`);
  console.log(`   GET    /api/condominiums/:id`);
  console.log(`   POST   /api/technicians/:id/assign`);
  console.log(`   GET    /api/technicians/:id/assignments`);
  console.log(`   GET    /api/service-calls`);
  console.log(`   POST   /api/service-calls`);
  console.log(`   PUT    /api/service-calls/:id`);
  console.log(`   GET    /api/reports/completed`);
  console.log(`   GET    /api/reports/statistics`);
});
