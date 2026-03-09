import { Response } from 'express';
import { validationResult } from 'express-validator';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const createApplication = async (req: AuthRequest, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const application = await prisma.application.create({
      data: {
        ...req.body,
        userId: req.userId!,
      },
      include: {
        interviews: true,
        contacts: true,
        activities: true,
      },
    });

    await prisma.activity.create({
      data: {
        applicationId: application.id,
        type: 'application_created',
        description: `Application created for ${application.jobTitle} at ${application.companyName}`,
      },
    });

    res.status(201).json(application);
  } catch (error) {
    console.error('Create application error:', error);
    res.status(500).json({ error: 'Failed to create application' });
  }
};

export const getApplications = async (req: AuthRequest, res: Response) => {
  try {
    const { status, search, sortBy = 'appliedDate', order = 'desc' } = req.query;

    const where: any = { userId: req.userId };

    if (status) {
      where.status = status;
    }

    if (search) {
      where.OR = [
        { companyName: { contains: search as string, mode: 'insensitive' } },
        { jobTitle: { contains: search as string, mode: 'insensitive' } },
      ];
    }

    const applications = await prisma.application.findMany({
      where,
      include: {
        interviews: {
          orderBy: { scheduledAt: 'asc' },
        },
        contacts: true,
        _count: {
          select: { activities: true },
        },
      },
      orderBy: { [sortBy as string]: order },
    });

    res.json(applications);
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};

export const getApplicationById = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const application = await prisma.application.findFirst({
      where: {
        id,
        userId: req.userId,
      },
      include: {
        interviews: {
          orderBy: { scheduledAt: 'asc' },
        },
        contacts: true,
        activities: {
          orderBy: { createdAt: 'desc' },
          take: 20,
        },
      },
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    res.json(application);
  } catch (error) {
    console.error('Get application error:', error);
    res.status(500).json({ error: 'Failed to fetch application' });
  }
};

export const updateApplication = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const oldApplication = await prisma.application.findFirst({
      where: { id, userId: req.userId },
    });

    if (!oldApplication) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const application = await prisma.application.update({
      where: { id },
      data: req.body,
      include: {
        interviews: true,
        contacts: true,
      },
    });

    if (oldApplication.status !== application.status) {
      await prisma.activity.create({
        data: {
          applicationId: id,
          type: 'status_changed',
          description: `Status changed from ${oldApplication.status} to ${application.status}`,
          metadata: {
            oldStatus: oldApplication.status,
            newStatus: application.status,
          },
        },
      });
    }

    res.json(application);
  } catch (error) {
    console.error('Update application error:', error);
    res.status(500).json({ error: 'Failed to update application' });
  }
};

export const deleteApplication = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const application = await prisma.application.findFirst({
      where: { id, userId: req.userId },
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    await prisma.application.delete({ where: { id } });

    res.json({ message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Delete application error:', error);
    res.status(500).json({ error: 'Failed to delete application' });
  }
};

export const addActivity = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { type, description, metadata } = req.body;

    const application = await prisma.application.findFirst({
      where: { id, userId: req.userId },
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const activity = await prisma.activity.create({
      data: {
        applicationId: id,
        type,
        description,
        metadata,
      },
    });

    res.status(201).json(activity);
  } catch (error) {
    console.error('Add activity error:', error);
    res.status(500).json({ error: 'Failed to add activity' });
  }
};

export const addContact = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const application = await prisma.application.findFirst({
      where: { id, userId: req.userId },
    });

    if (!application) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const contact = await prisma.contact.create({
      data: {
        ...req.body,
        applicationId: id,
      },
    });

    res.status(201).json(contact);
  } catch (error) {
    console.error('Add contact error:', error);
    res.status(500).json({ error: 'Failed to add contact' });
  }
};
