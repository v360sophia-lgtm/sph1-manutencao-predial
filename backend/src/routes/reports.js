import express from 'express';
import pool from '../database/connection.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// GET /api/reports/completed - Listar chamados finalizados (apenas para admin)
router.get('/completed', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const { condominium_id, start_date, end_date } = req.query;
    let query = `
      SELECT 
        sc.id, sc.title, sc.description, sc.priority,
        sc.created_at, sc.completed_at,
        a.apartment_number, b.block_name,
        c.name as condominium_name,
        u.name as technician_name,
        cr.observations, cr.materials_used
      FROM service_calls sc
      LEFT JOIN apartments a ON sc.apartment_id = a.id
      LEFT JOIN blocks b ON a.block_id = b.id
      LEFT JOIN condominiums c ON sc.condominium_id = c.id
      LEFT JOIN users u ON sc.technician_id = u.id
      LEFT JOIN completion_reports cr ON sc.id = cr.service_call_id
      WHERE sc.status = 'completed'
    `;
    const params = [];

    if (condominium_id) {
      query += ` AND sc.condominium_id = $${params.length + 1}`;
      params.push(condominium_id);
    }

    if (start_date) {
      query += ` AND sc.completed_at >= $${params.length + 1}`;
      params.push(start_date);
    }

    if (end_date) {
      query += ` AND sc.completed_at <= $${params.length + 1}`;
      params.push(end_date);
    }

    query += ' ORDER BY sc.completed_at DESC';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/reports/statistics - Estatísticas por condomínio (admin)
router.get('/statistics', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const { condominium_id } = req.query;
    let query = `
      SELECT 
        c.id, c.name,
        COUNT(DISTINCT sc.id) as total_calls,
        COUNT(DISTINCT CASE WHEN sc.status = 'completed' THEN sc.id END) as completed_calls,
        COUNT(DISTINCT CASE WHEN sc.status = 'in_progress' THEN sc.id END) as in_progress_calls,
        COUNT(DISTINCT CASE WHEN sc.status = 'pending' THEN sc.id END) as pending_calls
      FROM condominiums c
      LEFT JOIN service_calls sc ON c.id = sc.condominium_id
    `;
    const params = [];

    if (condominium_id) {
      query += ` WHERE c.id = $1`;
      params.push(condominium_id);
    }

    query += ' GROUP BY c.id, c.name ORDER BY c.name';

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/reports/:callId/completion - Criar relatório de conclusão
router.post('/:callId/completion', verifyToken, requireRole('technician'), async (req, res) => {
  try {
    const { callId } = req.params;
    const { observations, materials_used, signature } = req.body;
    const technician_id = req.user.id;

    // Verificar se chamado existe e pertence ao técnico
    const serviceCall = await pool.query(
      'SELECT * FROM service_calls WHERE id = $1 AND technician_id = $2',
      [callId, technician_id]
    );

    if (serviceCall.rows.length === 0) {
      return res.status(404).json({ error: 'Service call not found or unauthorized' });
    }

    const result = await pool.query(
      `INSERT INTO completion_reports (service_call_id, technician_id, observations, materials_used, signature)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [callId, technician_id, observations, materials_used, signature]
    );

    res.status(201).json({
      message: 'Completion report created',
      report: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
