import { Router } from 'express';
import { createPoll, getPolls, getPoll, vote } from '../controllers/pollController';
import { auth, adminOnly } from '../middleware/auth';

const router = Router();

// Rotas protegidas
router.use(auth);

// Rotas públicas (após autenticação)
router.get('/', getPolls);
router.get('/:id', getPoll);
router.post('/:id/vote/:optionId', vote);

// Rotas administrativas
router.post('/', adminOnly, createPoll);

export default router;
