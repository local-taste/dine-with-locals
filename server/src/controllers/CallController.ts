import client from '../config/stream.js';
import { v4 as uuidv4 } from 'uuid';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

interface AuthRequest extends Request {
  user?: object | mongoose.Types.ObjectId | any; // Extend Request to include user
}

export const startCall = async (req: AuthRequest, res: Response) => {
  try {
    const callType = "default";
    const callId = uuidv4();

    const call = client.video.call(callType, callId);
    await call.getOrCreate({
      data: {
        created_by_id: req.user.id, // from your auth middleware
        members: [{ user_id: req.user.id }],
      },
    });

    res.status(200).json({ callId, callType });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};