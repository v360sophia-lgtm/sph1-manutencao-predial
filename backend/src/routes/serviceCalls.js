import express from 'express';
import pool from '../database/connection.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// GET /api/service-calls - Listar chamados (filtros opcionais)
router.get('/', verifyToken, async (req, res) => {
  try {
    const { condominium_id, technician_id, status } = req.query;
    let query = 'SELECT * FROM service_calls WHERE 1=1';
    const params = [];

    if (condominium_id) {
      query += ` AND condominium_id = $${params.length + 1}`;
      params.push(condominium_id);
    }

    if (technician_id) {
      query += ` AND technician_id = $${params.length + 1}`;
      params.push(technician_id);
    }

    if (status) {
      query += ` AND status = $${params.length + 1}`;
      params.push(status);
    }

    query += ' ORDER BY created_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/service-calls - Criar um novo chamado
router.post('/', verifyToken, async (req, res) => {
  try {
    const { condominium_id, apartment_id, title, description, priority } = req.body;

    if (!condominium_id || !apartment_id || !title || !description || !priority) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (!['low', 'medium', 'high'].includes(priority)) {
      return res.status(400).json({ error: 'Invalid priority' });
    }

    const result = await pool.query(
      `INSERT INTO service_calls (condominium_id, apartment_id, title, description, status, priority)
       VALUES ($1, $2, $3, $4, 'pending', $5)
       RETURNING *`,
      [condominium_id, apartment_id, title, description, priority]
    );

    res.status(201).json({
      message: 'Service call created',
      service_call: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/service-calls/:id - Atualizar chamado (atribuir técnico, mudar status, etc)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { technician_id, status, priority } = req.body;

    const serviceCall = await pool.query(
      'SELECT * FROM service_calls WHERE id = $1',
      [id]
    );

    if (serviceCall.rows.length === 0) {
      return res.status(404).json({ error: 'Service call not found' });
    }

    let query = 'UPDATE service_calls SET updated_at = CURRENT_TIMESTAMP';
    const params = [];
    let paramIndex = 1;

    if (technician_id !== undefined) {
      query += `, technician_id = $${paramIndex}, assigned_at = CURRENT_TIMESTAMP`;
      params.push(technician_id);
      paramIndex++;
    }

    if (status !== undefined) {
      if (!['pending', 'in_progress', 'completed', 'cancelled'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
      query += `, status = $${paramIndex}`;
      params.push(status);
      paramIndex++;

      if (status === 'completed') {
        query += `, completed_at = CURRENT_TIMESTAMP`;
      }
    }

    if (priority !== undefined) {
      if (!['low', 'medium', 'high'].includes(priority)) {
        return res.status(400).json({ error: 'Invalid priority' });
      }
      query += `, priority = $${paramIndex}`;
      params.push(priority);
      paramIndex++;
    }

    query += ` WHERE id = $${paramIndex} RETURNING *`;
    params.push(id);

    const result = await pool.query(query, params);
    res.json({
      message: 'Service call updated',
      service_call: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/service-calls/:id - Detalhes de um chamado
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const serviceCall = await pool.query(
      `SELECT sc.*, a.apartment_number, b.block_name, c.name as condominium_name, u.name as technician_name
       FROM service_calls sc
       LEFT JOIN apartments a ON sc.apartment_id = a.id
       LEFT JOIN blocks b ON a.block_id = b.id
       LEFT JOIN condominiums c ON sc.condominium_id = c.id
       LEFT JOIN users u ON sc.technician_id = u.id
       WHERE sc.id = $1`,
      [id]
    );

    if (serviceCall.rows.length === 0) {
      return res.status(404).json({ error: 'Service call not found' });
    }

    const evidence = await pool.query(
      'SELECT id, image_url, description, type, uploaded_at FROM call_evidence WHERE service_call_id = $1 ORDER BY uploaded_at',
      [id]
    );

    res.json({
      service_call: serviceCall.rows[0],
      evidence: evidence.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
