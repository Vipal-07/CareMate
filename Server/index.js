import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import authRoutes from './Routes/authRoute.js';
import userRoutes from './Routes/userRoute.js';
import doctorRoutes from './Routes/doctorRoute.js';
import reviewRoutes from './Routes/reviewRoute.js';
import passport from './auth/passportConfig.js';
import session from 'express-session';
import './auth/passportConfig.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const corsOptions = {
    origin: 'http://localhost:5173', // Vite dev server
    credentials: true,
};

const store = MongoStore.create({
    mongoUrl: process.env.MONGO_URI,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 60 * 60,
});

// Middleware
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
// Passport setup
app.use(session({
    store,
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 3600000 * 24 * 7, // 1 week
        maxAge: 3600000 * 24 * 7, // 1 week
        httpOnly: true,
        secure: false
    }
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/doctors', doctorRoutes);
app.use('/api/v1/reviews', reviewRoutes);


// MongoDB connection
mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    }
    catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

// Routes
app.get('/', (req, res) => {
    res.send('Server is running');
})


app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
})