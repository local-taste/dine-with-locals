import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/start', authMiddleware, (req, res) => {
  // Logic to start a call
  
});

router.post('/end', authMiddleware, (req, res) => {
  // Logic to end a call
});

export default router;
