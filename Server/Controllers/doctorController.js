
import Doctor from "../models/DoctorSchema.js"
import Booking from "../models/BookingSchema.js"

export const updateDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const updatedDoctor = await Doctor.findByIdAndUpdate(id,
            { $set: req.body },
            { new: true });

        res.status(200).json({ success: true, message: "Doctor updated successfully", data: updatedDoctor });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const deleteDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const deletedDoctor = await Doctor.findByIdAndDelete(id);

        if (!deletedDoctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        res.status(200).json({ success: true, message: "Doctor deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}


export const getSingleDoctor = async (req, res) => {
    const id = req.params.id;

    try {
        const doctor = await Doctor.findById(id)
            .populate("reviews")
            .select('-password');

        if (!doctor) {
            return res.status(404).json({ success: false, message: 'Doctor not found' });
        }

        res.status(200).json({ success: true, message: "Doctor retrieved successfully", data: doctor });
    } catch (error) {
        res.status(404).json({ success: false, message: 'Doctor not found', error: error.message });
    }
}

export const getAllDoctor = async (req, res) => {
    try {
        const { query } = req.query
        let doctors;
        if (query) {
            doctors = await Doctor.find({
                isApproved: 'approved',
                $or: [
                    { name: { $regex: query, $options: 'i' } },
                    { specialization: { $regex: query, $options: 'i' } },
                    { location: { $regex: query, $options: 'i' } }
                ]
            }).select('-password');
        } else {
            doctors = await Doctor.find({ isApproved: 'approved' }).select('-password');
        }
        res.status(200).json({ success: true, message: "Doctors retrieved successfully", data: doctors });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}

export const getDoctorProfile = async (req, res) => {
    const doctorId = req.userId
    try {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({ success: false, message: "Doctor not found" })
        }
        const { password, ...rest } = doctor._doc
        const appointments = await Booking.find({ doctor: doctorId }).populate('user', 'name email photo')
        res.status(200).json({ success: true, message: "Doctor profile retrieved successfully", data: { ...rest, appointments } })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}