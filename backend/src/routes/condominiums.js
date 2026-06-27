import express from 'express';
import pool from '../database/connection.js';
import { verifyToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

// GET /api/condominiums - Listar todos os condomínios
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, name, description, created_at FROM condominiums ORDER BY name'
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/condominiums/:id - Detalhes do condomínio com blocos e apartamentos
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const condominium = await pool.query(
      'SELECT * FROM condominiums WHERE id = $1',
      [id]
    );
    
    if (condominium.rows.length === 0) {
      return res.status(404).json({ error: 'Condominium not found' });
    }
    
    const blocks = await pool.query(
      'SELECT id, block_name FROM blocks WHERE condominium_id = $1 ORDER BY block_name',
      [id]
    );
    
    res.json({
      condominium: condominium.rows[0],
      blocks: blocks.rows,
      total_blocks: blocks.rows.length,
      total_apartments: blocks.rows.length * 20, // 5 andares x 4 apartamentos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/condominiums/:id/blocks/:blockId/apartments - Listar apartamentos de um bloco
router.get('/:id/blocks/:blockId/apartments', verifyToken, async (req, res) => {
  try {
    const { id, blockId } = req.params;
    
    // Verificar se o bloco pertence ao condomínio
    const block = await pool.query(
      'SELECT * FROM blocks WHERE id = $1 AND condominium_id = $2',
      [blockId, id]
    );
    
    if (block.rows.length === 0) {
      return res.status(404).json({ error: 'Block not found' });
    }
    
    const apartments = await pool.query(
      'SELECT id, floor, apartment_number, resident_name, resident_phone FROM apartments WHERE block_id = $1 ORDER BY floor, apartment_number',
      [blockId]
    );
    
    res.json({
      block: block.rows[0],
      apartments: apartments.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
