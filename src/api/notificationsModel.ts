import { getPayload } from 'payload';
import config from '@payload-config';
import { Request, Response } from 'express';

const payload = await getPayload({ config });

export const fetchNotifications = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;

    const notifications = await payload.find({
      collection: 'notifications',
      limit,
      page,
    });
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ message: 'Failed to fetch notifications' });
  }
};

export const markNotificationAsRead = async (req: Request, res: Response) => {
  try {
    const notificationId = req.params.id;
    const notification = await payload.update({
      collection: 'notifications',
      id: notificationId,
      data: { read: true },
    });
    res.json(notification);
  } catch (error) {
    console.error('Error marking notification as read:', error);
    res.status(500).json({ message: 'Failed to mark notification as read' });
  }
};
