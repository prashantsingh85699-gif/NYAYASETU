import express from 'express';
import {
    createPetition,
    generatePetitionContent,
    getPetitions,
    getPetition,
    updatePetition,
    deletePetition,
    submitPetition
} from '../controllers/petitionController';
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.use(authenticate);

router.post('/', createPetition);
router.get('/', getPetitions);
router.get('/:id', getPetition);
router.patch('/:id', updatePetition);
router.delete('/:id', deletePetition);
router.post('/:id/generate', generatePetitionContent);
router.post('/:id/submit', submitPetition);

export default router;
