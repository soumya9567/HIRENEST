import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

import userRoutes from './routes/userRoutes.js';
import mongoConnect from './mongooseConnect.js';
import companyRoutes from "./routes/companyRoutes.js"
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRoute.js'

import {clerkMiddleware} from '@clerk/express'


dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'token'], 
  credentials: true
}));

app.use(express.json());

app.use(clerkMiddleware())

 await connectCloudinary()

app.use(ClerkExpressWithAuth());

app.use('/api/users', userRoutes);
app.use('/api/company',companyRoutes)
app.use('/api/jobs',jobRoutes)



mongoConnect()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((err) => {
    console.error(' MongoDB connection failed:', err);
    process.exit(1);
  });
