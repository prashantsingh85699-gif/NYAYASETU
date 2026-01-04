import express from 'express';
import { chat, getQuestionnaireSchema } from '../controllers/aiController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

// router.use(authenticate);

router.post('/chat', chat);
router.get('/schema/:type', getQuestionnaireSchema);

export default router;
