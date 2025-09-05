import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { initializeSocket } from './config/socket.js';
import connectDB from './config/mongo.js';
import authRoutes from './routes/AuthRoutes.js';
import locationRoutes from './routes/LocationRoutes.js';
import filterRoutes from './routes/FilterRoutes.js';
import requestRoutes from './routes/RequestRoutes.js';
import listingRoutes from './routes/ListingRoutes.js';
import callRoutes from './routes/CallRoutes.js';
// Import all models first to ensure they're registered with mongoose
import './models/User.js';
import './models/Blog.js';
import './models/Comment.js';
import './models/Like.js';
import './models/Listing.js';
import './models/Location.js';
import './models/Match.js';
import './models/Request.js';
import './models/Notification.js';
import uploadRoutes from './routes/uploadRoutes.js';

import './models/Review.js';
import './models/Chat.js';
import './models/Message.js';

// Stream API
import { StreamClient } from '@stream-io/node-sdk';

// Import routes after models are registered
import blogRoutes from './routes/BlogRoutes.js';
import userRoutes from './routes/UserRoutes.js';
import MatchRoutes from './routes/MatchRoutes.js';
import reviewRoutes from './routes/ReviewRoutes.js';
import likeRoutes from './routes/LikeRoutes.js';
import commentRoutes from './routes/CommentRoutes.js';
import notificationRoutes from './routes/NotificationRoutes.js';
import chatRoutes from './routes/ChatRoutes.js';
import messageRoutes from './routes/MessageRoutes.js';
import paymentRoutes from './routes/PaymentRoutes.js';

const app = express();
const httpServer = createServer(app);

// Initialize Socket.IO
const io = initializeSocket(httpServer);

// Make io available throughout the app
app.set('io', io);

// Connect to MongoDB
connectDB();

//Parse user request -> Json format
app.use(express.json());
//Only receive request from some specific routes.
app.use(
  cors({
    origin: true, // Accept all origins temporarily
    credentials: true,
  }),
);

// Stream IO
const client = new StreamClient('9yv5brqs6aw4', 'gtjeuexm38pv68bftgw6uu8jp5tyq8atan84atgfru92vyqvaughpqfu6ma8hf9b', {
  timeout: 1000, 
})

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/filter', filterRoutes);
app.use('/api/request', requestRoutes);
app.use('/api/listing', listingRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/matches', MatchRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/call', callRoutes);

// Start server
const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Socket.IO initialized and listening for connections');
});

// Export app and io
export default app;
