// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import { login, register, fetchUser } from './auth';
import { fetchManga, createManga, updateManga, deleteManga } from './mangaModel';
import { fetchNotifications, markNotificationAsRead } from './notificationsModel';

const app = express();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173', // Frontend origin
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],              // HTTP methods allowed
    credentials: true,                                        // Allow cookies
  })
);
app.use(express.json()); // JSON body parsing

// Authentication Routes
app.post('/api/auth/login', login);      // Login route
app.post('/api/auth/register', register); // Register route
app.get('/api/auth/user', fetchUser);   // Fetch logged-in user route

// Manga Routes
app.get('/api/manga/:id', fetchManga);
app.post('/api/manga', createManga);
app.patch('/api/manga/:id', updateManga);
app.delete('/api/manga/:id', deleteManga);

// Notification Routes
app.get('/api/notifications', fetchNotifications);
app.patch('/api/notifications/:id', markNotificationAsRead);

// Start the server (if needed)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
