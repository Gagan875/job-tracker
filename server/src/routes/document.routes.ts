import { Router } from 'express';
import { getDocuments, deleteDocument } from '../controllers/document.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', getDocuments);
router.delete('/:id', deleteDocument);

export default router;
