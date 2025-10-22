import User from "../models/UserSchema.js";
import Doctor from "../models/DoctorSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
    const { name, email, password, photo, gender, role } = req.body;
    try {
        // sanitize and defaults
        const userRole = role || 'patient';
        // don't pass empty string for gender to Mongoose enum field
        const safeGender = gender && gender.trim() !== '' ? gender : undefined;

        let user = null;
        if (userRole === 'patient') {
            user = await User.findOne({ email });
        }
        else if (userRole === 'doctor') {
            user = await Doctor.findOne({ email });
        }

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        if (userRole === 'patient') {
            user = new User({
                name,
                email,
                password: hashedPassword,
                photo,
                gender: safeGender,
                role: userRole
            });
        }
        else if (userRole === 'doctor') {
            user = new Doctor({
                name,
                email,
                password: hashedPassword,
                photo,
                gender: safeGender,
                role: userRole
            });
        }

        await user.save();
        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const loginUser = async (req, res) => {
    // Keep for backwards compatibility if needed — login handled via passport in routes now.
    return res.status(501).json({ success: false, message: 'Use /auth/login (passport) endpoint' });
}