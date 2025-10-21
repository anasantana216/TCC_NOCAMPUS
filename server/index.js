const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'NoCampus Server is running!',
    timestamp: new Date().toISOString() 
  });
});

// API Routes - Events
app.get('/api/events', async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
});

app.post('/api/events', async (req, res) => {
  try {
    const { title, description, date, time, location, category, capacity, organizer } = req.body;
    const event = await prisma.event.create({
      data: { 
        title, 
        description, 
        date, 
        time,
        location, 
        category,
        capacity: capacity ? parseInt(capacity) : null,
        organizer,
        isActive: true
      }
    });
    res.status(201).json(event);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

app.put('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, date, time, location, category, capacity, organizer, isActive } = req.body;
    const event = await prisma.event.update({
      where: { id },
      data: { 
        title, 
        description, 
        date, 
        time,
        location, 
        category,
        capacity: capacity ? parseInt(capacity) : null,
        organizer,
        isActive
      }
    });
    res.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
});

app.delete('/api/events/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.event.delete({ where: { id } });
    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// API Routes - Polls
app.get('/api/polls', async (req, res) => {
  try {
    const polls = await prisma.poll.findMany({
      include: { options: true },
      orderBy: { createdAt: 'desc' }
    });
    res.json(polls);
  } catch (error) {
    console.error('Error fetching polls:', error);
    res.status(500).json({ error: 'Failed to fetch polls' });
  }
});

app.post('/api/polls', async (req, res) => {
  try {
    const { title, description, options, allowMultiple, endDate } = req.body;
    const poll = await prisma.poll.create({
      data: {
        title,
        description,
        allowMultiple: allowMultiple || false,
        endDate,
        isActive: true,
        options: {
          create: options.map(text => ({ text, votes: 0 }))
        }
      },
      include: { options: true }
    });
    res.status(201).json(poll);
  } catch (error) {
    console.error('Error creating poll:', error);
    res.status(500).json({ error: 'Failed to create poll' });
  }
});

app.put('/api/polls/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, isActive, allowMultiple, endDate } = req.body;
    const poll = await prisma.poll.update({
      where: { id },
      data: { title, description, isActive, allowMultiple, endDate },
      include: { options: true }
    });
    res.json(poll);
  } catch (error) {
    console.error('Error updating poll:', error);
    res.status(500).json({ error: 'Failed to update poll' });
  }
});

app.delete('/api/polls/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.poll.delete({ where: { id } });
    res.json({ message: 'Poll deleted successfully' });
  } catch (error) {
    console.error('Error deleting poll:', error);
    res.status(500).json({ error: 'Failed to delete poll' });
  }
});

app.post('/api/polls/:id/vote', async (req, res) => {
  try {
    const { id } = req.params;
    const { optionId } = req.body;
    
    await prisma.pollOption.update({
      where: { id: optionId },
      data: { votes: { increment: 1 } }
    });
    
    const poll = await prisma.poll.findUnique({
      where: { id },
      include: { options: true }
    });
    
    res.json(poll);
  } catch (error) {
    console.error('Error voting:', error);
    res.status(500).json({ error: 'Failed to vote' });
  }
});

// API Routes - Notices
app.get('/api/notices', async (req, res) => {
  try {
    const notices = await prisma.notice.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(notices);
  } catch (error) {
    console.error('Error fetching notices:', error);
    res.status(500).json({ error: 'Failed to fetch notices' });
  }
});

app.post('/api/notices', async (req, res) => {
  try {
    const { title, content, type, priority, targetAudience } = req.body;
    const notice = await prisma.notice.create({
      data: { title, content, type, priority, targetAudience, isActive: true }
    });
    res.status(201).json(notice);
  } catch (error) {
    console.error('Error creating notice:', error);
    res.status(500).json({ error: 'Failed to create notice' });
  }
});

app.put('/api/notices/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, type, priority, targetAudience, isActive } = req.body;
    const notice = await prisma.notice.update({
      where: { id },
      data: { title, content, type, priority, targetAudience, isActive }
    });
    res.json(notice);
  } catch (error) {
    console.error('Error updating notice:', error);
    res.status(500).json({ error: 'Failed to update notice' });
  }
});

app.delete('/api/notices/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.notice.delete({ where: { id } });
    res.json({ message: 'Notice deleted successfully' });
  } catch (error) {
    console.error('Error deleting notice:', error);
    res.status(500).json({ error: 'Failed to delete notice' });
  }
});

// API Routes - Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Dashboard Stats
app.get('/api/stats', async (req, res) => {
  try {
    const [eventsCount, pollsCount, usersCount, noticesCount] = await Promise.all([
      prisma.event.count(),
      prisma.poll.count(),
      prisma.user.count(),
      prisma.notice.count()
    ]);

    const polls = await prisma.poll.findMany({
      include: { options: true }
    });

    const totalVotes = polls.reduce((sum, poll) => {
      return sum + poll.options.reduce((optSum, opt) => optSum + opt.votes, 0);
    }, 0);

    res.json({
      totalEvents: eventsCount,
      totalPolls: pollsCount,
      totalUsers: usersCount,
      totalNotices: noticesCount,
      totalVotes,
      activeUsers: Math.floor(totalVotes * 0.7)
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API available at http://localhost:${PORT}/api`);
});

module.exports = app;