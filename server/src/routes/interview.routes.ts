import { Router } from 'express';
import { body } from 'express-validator';
import {
  createInterview,
  getInterviews,
  updateInterview,
  deleteInterview,
} from '../controllers/interview.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.use(authenticate);

router.post(
  '/',
  [
    body('applicationId').notEmpty(),
    body('title').trim().notEmpty(),
    body('scheduledAt').isISO8601(),
  ],
  createInterview
);

router.get('/', getInterviews);
router.put('/:id', updateInterview);
router.delete('/:id', deleteInterview);

export default router;
