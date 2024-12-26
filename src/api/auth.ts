import { getPayload } from 'payload';
import config from '@payload-config';
import { Request, Response } from 'express';

const payload = await getPayload({ config });

// Utility: Convert incoming headers to `Headers` format for Payload
const convertHeaders = (incomingHeaders: Record<string, string | string[] | undefined>) => {
  const headers = new Headers();
  Object.entries(incomingHeaders).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      headers.append(key, value.join(','));
    } else if (value) {
      headers.append(key, value);
    }
  });
  return headers;
};

// Login Handler
export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const user = await payload.login({
      collection: 'users',
      data: { email, password },
    });

    res.json(user);
  } catch (error) {
    console.error('Error during login:', error);
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

// Register Handler
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      res.status(400).json({ message: 'Email, password, and username are required' });
      return;
    }

    const user = await payload.create({
      collection: 'users',
      data: { email, password, username, role: 'user' },
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Failed to register user' });
  }
};

// Fetch Logged-in User Handler
export const fetchUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    // Create a Headers instance and set the Authorization header
    const headers = new Headers();
    headers.set('Authorization', authHeader);

    // Authenticate using Payload's auth method
    const user = await payload.auth({ headers });

    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Failed to fetch user' });
  }
};
