import { Router } from 'express';
import { body } from 'express-validator';
import {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
  addActivity,
  addContact,
} from '../controllers/application.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  [
    body('companyName').trim().notEmpty(),
    body('jobTitle').trim().notEmpty(),
    body('status').optional().isIn(['WISHLIST', 'APPLIED', 'INTERVIEW', 'OFFER', 'REJECTED', 'ACCEPTED', 'WITHDRAWN']),
  ],
  createApplication
);

router.get('/', getApplications);
router.get('/:id', getApplicationById);
router.put('/:id', updateApplication);
router.delete('/:id', deleteApplication);
router.post('/:id/activities', addActivity);
router.post('/:id/contacts', addContact);

export default router;
