import jwt from 'jsonwebtoken';
import Doctor from '../models/DoctorSchema.js';
import User from '../models/UserSchema.js';

export const authenticate = async (req, res, next) => {
    try {
        // Session-based auth (Passport)
        if (req.isAuthenticated && req.isAuthenticated()) {
            if (!req.user) return res.status(401).json({ success: false, message: 'Authenticated but user missing' });
            req.userId = req.user._id;
            req.role = req.user.role;
            return next();
        }

        // Fallback to Bearer JWT for API clients (or token in cookie)
        const header = req.headers.authorization;
        const token = header && header.startsWith('Bearer ') ? header.split(' ')[1] : req.cookies?.token;

        if (!token) {
            return res.status(401).json({ success: false, message: 'No token or session provided' });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ success: false, message: 'Invalid token', error: err.message });
        }

        // Load user document so downstream handlers can use req.user
        const userId = decoded.id;
        const user = (await User.findById(userId)) || (await Doctor.findById(userId));
        if (!user) return res.status(401).json({ success: false, message: 'User not found for token' });

        req.user = user;
        req.userId = user._id;
        req.role = user.role;
        return next();
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ success: false, message: 'Authentication error', error: error.message });
    }
};

export const restrict = (roles) => async (req, res, next) => {
    try {
        let user = req.user;
        if (!user && req.userId) {
            user = (await User.findById(req.userId)) || (await Doctor.findById(req.userId));
        }

        if (!user) return res.status(401).json({ success: false, message: 'User not found' });
        if (!roles.includes(user.role)) return res.status(403).json({ success: false, message: 'Access denied' });
        return next();
    } catch (error) {
        console.error('Authorization error:', error);
        return res.status(500).json({ success: false, message: 'Authorization error', error: error.message });
    }
};