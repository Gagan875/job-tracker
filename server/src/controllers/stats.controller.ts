import { Response } from 'express';
import prisma from '../utils/prisma';
import { AuthRequest } from '../middleware/auth.middleware';

export const getStats = async (req: AuthRequest, res: Response) => {
  try {
    const applications = await prisma.application.findMany({
      where: { userId: req.userId },
      select: {
        status: true,
        appliedDate: true,
      },
    });

    const statusCounts = applications.reduce((acc: any, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});

    const upcomingInterviews = await prisma.interview.count({
      where: {
        application: { userId: req.userId },
        scheduledAt: { gte: new Date() },
        completed: false,
      },
    });

    const last30Days = new Date();
    last30Days.setDate(last30Days.getDate() - 30);

    const recentApplications = applications.filter(
      (app) => app.appliedDate >= last30Days
    ).length;

    const responseRate = applications.length > 0
      ? ((statusCounts.INTERVIEW || 0) + (statusCounts.OFFER || 0)) / applications.length * 100
      : 0;

    res.json({
      total: applications.length,
      statusCounts,
      upcomingInterviews,
      recentApplications,
      responseRate: Math.round(responseRate * 10) / 10,
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};
