import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/UserSchema.js';
import Doctor from '../models/DoctorSchema.js';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173';
const SERVER_URL = process.env.SERVER_URL || 'http://localhost:5000';

// Local strategy: authenticate by email and password
passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      try {
        // Try patient first then doctor
        let user = await User.findOne({ email });
        if (!user) user = await Doctor.findOne({ email });
        if (!user) return done(null, false, { message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return done(null, false, { message: 'Incorrect password' });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// We won't use sessions for API authentication, but provide serialize/deserialize
passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser(async (id, done) => {
  try {
    let user = await User.findById(id);
    if (!user) user = await Doctor.findById(id);
    done(null, user || null);
  } catch (err) {
    done(err);
  }
});

// Google OAuth Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(
    new GoogleStrategy(
      {
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  // callback must point to server route (will be mounted at /api/v1/auth/google/callback)
  callbackURL: process.env.GOOGLE_CALLBACK_URL || `${SERVER_URL}/api/v1/auth/google/callback`,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          // Try find by googleId
          let user = await User.findOne({ googleId: profile.id }) || await Doctor.findOne({ googleId: profile.id });

          // If not, try by email to link accounts
          if (!user && profile.emails && profile.emails.length) {
            const email = profile.emails[0].value;
            user = await User.findOne({ email }) || await Doctor.findOne({ email });
          }

          if (user) {
            // store googleId if missing
            if (!user.googleId) {
              user.googleId = profile.id;
              await user.save();
            }
            return done(null, user);
          }

          // Create a new patient user by default.
          // Our User schema requires a password; generate a random temporary one and hash it.
          const tempPassword = Math.random().toString(36).slice(-12);
          const hashedTemp = await bcrypt.hash(tempPassword, 10);

          const newUser = new User({
            name: profile.displayName || profile.name?.givenName || 'Google User',
            email: profile.emails && profile.emails[0] ? profile.emails[0].value : undefined,
            photo: profile.photos && profile.photos[0] ? profile.photos[0].value : undefined,
            googleId: profile.id,
            role: 'patient',
            password: hashedTemp,
          });
          await newUser.save();
          return done(null, newUser);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
}

export default passport;
