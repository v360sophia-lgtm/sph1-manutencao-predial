import express from 'express';
import pool from '../database/connection.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// POST /api/technicians/:id/assign - Vincular técnico a um condomínio (obra)
router.post('/:id/assign', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const { id } = req.params; // user_id
    const { condominium_id } = req.body;

    if (!condominium_id) {
      return res.status(400).json({ error: 'Condominium ID required' });
    }

    // Verificar se usuário é técnico
    const user = await pool.query(
      'SELECT role FROM users WHERE id = $1',
      [id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (user.rows[0].role !== 'technician') {
      return res.status(400).json({ error: 'User must be a technician' });
    }

    // Verificar se condomínio existe
    const condominium = await pool.query(
      'SELECT id FROM condominiums WHERE id = $1',
      [condominium_id]
    );

    if (condominium.rows.length === 0) {
      return res.status(404).json({ error: 'Condominium not found' });
    }

    // Inserir ou atualizar assignment
    const result = await pool.query(
      `INSERT INTO technician_assignments (user_id, condominium_id, is_active)
       VALUES ($1, $2, true)
       ON CONFLICT (user_id, condominium_id) DO UPDATE SET is_active = true
       RETURNING *`,
      [id, condominium_id]
    );

    res.status(201).json({
      message: 'Technician assigned to condominium',
      assignment: result.rows[0],
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/technicians/:id/assignments - Listar todas as obras atribuídas ao técnico
router.get('/:id/assignments', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const assignments = await pool.query(
      `SELECT ta.id, ta.user_id, c.id as condominium_id, c.name, ta.assignment_date, ta.is_active
       FROM technician_assignments ta
       JOIN condominiums c ON ta.condominium_id = c.id
       WHERE ta.user_id = $1
       ORDER BY c.name`,
      [id]
    );

    res.json(assignments.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
