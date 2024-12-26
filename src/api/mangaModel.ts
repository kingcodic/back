import { getPayload } from 'payload';
import config from '@payload-config';
import { Request, Response } from 'express';

const payload = await getPayload({ config });

export const fetchManga = async (req: Request, res: Response): Promise<void> => {
  try {
    const mangaId = req.params.id;

    const manga = await payload.findByID({
      collection: 'manga',
      id: mangaId,
    });

    if (!manga) {
      res.status(404).json({ message: 'Manga not found' });
      return;
    }

    res.json(manga);
  } catch (error) {
    console.error('Error fetching manga:', error);
    res.status(500).json({ message: 'Failed to fetch manga' });
  }
};

export const createManga = async (req: Request, res: Response): Promise<void> => {
  try {
    const manga = await payload.create({
      collection: 'manga',
      data: req.body,
    });

    res.status(201).json(manga);
  } catch (error) {
    console.error('Error creating manga:', error);
    res.status(500).json({ message: 'Failed to create manga' });
  }
};

export const updateManga = async (req: Request, res: Response): Promise<void> => {
  try {
    const mangaId = req.params.id;

    const manga = await payload.update({
      collection: 'manga',
      id: mangaId,
      data: req.body,
    });

    if (!manga) {
      res.status(404).json({ message: 'Manga not found' });
      return;
    }

    res.json(manga);
  } catch (error) {
    console.error('Error updating manga:', error);
    res.status(500).json({ message: 'Failed to update manga' });
  }
};

export const deleteManga = async (req: Request, res: Response): Promise<void> => {
  try {
    const mangaId = req.params.id;

    await payload.delete({
      collection: 'manga',
      id: mangaId,
    });

    res.json({ message: 'Manga deleted successfully' });
  } catch (error) {
    console.error('Error deleting manga:', error);
    res.status(500).json({ message: 'Failed to delete manga' });
  }
};
