import express from 'express';
import passport from 'passport';
import { registerUser } from '../Controllers/authController.js';

const router = express.Router();

router.post('/register', registerUser);

// Login using passport local strategy and return JWT on success
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(401).json({ success: false, message: info?.message || 'Authentication failed' });

        req.logIn(user, (err) => {
            if (err) return next(err);
            const { password, ...rest } = user._doc || {};
            return res.json({ success: true, message: 'Login successful', data: rest });
        });
    })(req, res, next);
});

// Google OAuth routes
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: process.env.CLIENT_URL || 'http://localhost:5173/login' }), (req, res) => {
    // Successful authentication, redirect to client with session established
    res.redirect(process.env.CLIENT_URL || 'http://localhost:5173');
});

// Session status
router.get('/status', (req, res) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        const { password, ...rest } = req.user._doc || {};
        return res.json({ authenticated: true, user: rest });
    }
    return res.json({ authenticated: false });
});

// Logout
router.post('/logout', (req, res) => {
    req.logout();
    req.session.destroy(() => res.json({ success: true, message: 'Logged out' }));
});

export default router;