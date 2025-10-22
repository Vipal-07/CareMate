import User from '../models/UserSchema.js';
import Booking from '../models/BookingSchema.js';
import Doctor from '../models/DoctorSchema.js';

export const updateUser = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedUser = await User.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.status(200).json({ success: true, message: "User updated successfully", data: updatedUser });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const deleteUser = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

           
export const getSingleUser = async (req, res) => {
    const id = req.params.id;

    try {
        const user = await User.findById(id).select('-password');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: "User retrieved successfully", data: user });
    } catch (error) {
        res.status(404).json({ success: false, message: 'User not found', error: error.message });
    }
}

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json({ success: true, message: "Users retrieved successfully", data: users });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const getUserProfile = async(req,res)=>{
    const userId = req.userId
    try {
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({success:false,message:"User not found"})
        }
        const {password,...rest} = user._doc
        res.status(200).json({success:true,message:"User profile retrieved successfully",data:{...rest}})
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
} 

export const getMyAppointments = async(req,res)=>{
    try {
        const bookings = await Booking.find({ user: req.userId }).populate('doctor', '-password');
        const doctors = bookings.map(b => b.doctor).filter(Boolean);

        res.status(200).json({ success: true, message: 'Appointments retrieved', data: doctors });
        
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

       