import express from 'express';
import shippingRoute from './route/shippingroute';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { Request, Response } from 'express';
import http from 'http';

dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL ,
    credentials: true,
}));
app.use(express.json());

const mongooseUri = process.env.MONGODB_URI || "";
mongoose.connect(mongooseUri)
    .then(() => console.log("Shipping service connected to database"))
    .catch((error) => console.error("Failed to connect to database:", error));



app.use('/api/shipping', shippingRoute);


const server = http.createServer(app);

server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`Port 3005 is already in use!`);
        process.exit(1);
    }
    console.error('Server error:', err);
});

server.listen(3005, () => {
    console.log(`Shipping service running on port 3005`);
});