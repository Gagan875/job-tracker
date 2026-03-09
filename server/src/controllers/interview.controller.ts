import { Response } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const createInterview = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { applicationId } = req.body;

    const application = await prisma.application.findFirst({
      where: { id: applicationId, userId: req.userId },
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const interview = await prisma.interview.create({
      data: req.body,
    });

    await prisma.activity.create({
      data: {
        applicationId,
        type: 'interview_scheduled',
        description: `Interview scheduled: ${interview.title}`,
        metadata: { interviewId: interview.id },
      },
    });

    res.status(201).json(interview);
  } catch (error) {
    console.error('Create interview error:', error);
    res.status(500).json({ error: 'Failed to create interview' });
  }
};

export const getInterviews = async (req: AuthRequest, res: Response) => {
  try {
    const { upcoming, applicationId } = req.query;

    const where: any = {
      application: {
        userId: req.userId,
      },
    };

    if (applicationId) {
      where.applicationId = applicationId;
    }

    if (upcoming === 'true') {
      where.scheduledAt = { gte: new Date() };
      where.completed = false;
    }

    const interviews = await prisma.interview.findMany({
      where,
      include: {
        application: {
          select: {
            id: true,
            companyName: true,
            jobTitle: true,
            status: true,
          },
        },
      },
      orderBy: { scheduledAt: 'asc' },
    });

    res.json(interviews);
  } catch (error) {
    console.error('Get interviews error:', error);
    res.status(500).json({ error: 'Failed to fetch interviews' });
  }
};

export const updateInterview = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const existingInterview = await prisma.interview.findFirst({
      where: {
        id,
        application: {
          userId: req.userId,
        },
      },
    });

    if (!existingInterview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    const interview = await prisma.interview.update({
      where: { id },
      data: req.body,
    });

    res.json(interview);
  } catch (error) {
    console.error('Update interview error:', error);
    res.status(500).json({ error: 'Failed to update interview' });
  }
};

export const deleteInterview = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const interview = await prisma.interview.findFirst({
      where: {
        id,
        application: {
          userId: req.userId,
        },
      },
    });

    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }

    await prisma.interview.delete({ where: { id } });

    res.json({ message: 'Interview deleted successfully' });
  } catch (error) {
    console.error('Delete interview error:', error);
    res.status(500).json({ error: 'Failed to delete interview' });
  }
};
