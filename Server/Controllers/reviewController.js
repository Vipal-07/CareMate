import Review from "../models/ReviewSchema.js";
import Doctor from "../models/DoctorSchema.js";

// get all reviews

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find({});
    res.status(200).json({ success: true, message: "Reviews fetched successfully", data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: "Not found" });
  }
}
// create a review
export const createReview = async (req, res) => {
  // support nested route: /doctors/:doctorId/reviews
  const doctorId = req.body.doctor || req.params.doctorId;
  const userId = req.body.user || req.userId || req.params.userId;
  if (!doctorId) return res.status(400).json({ success: false, message: 'Doctor id required' });
  if (!userId) return res.status(400).json({ success: false, message: 'User id required' });

  try {
    // verify doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) return res.status(404).json({ success: false, message: 'Doctor not found' });

    const newReview = new Review({ ...req.body, doctor: doctorId, user: userId });
    const savedReview = await newReview.save();

    // push review id onto doctor.reviews (safe update)
    try {
      await Doctor.findByIdAndUpdate(doctorId, { $push: { reviews: savedReview._id } });
    } catch (upErr) {
      console.error('Failed to push review to doctor.reviews', { doctorId, reviewId: savedReview._id, upErr });
      // Don't fail the whole request if the push fails; return created review anyway.
    }

    return res.status(201).json({ success: true, message: "Review created successfully", data: savedReview });
  } catch (error) {
    console.error('createReview error:', {
      message: error?.message,
      doctorId,
      userId,
      body: req.body,
      stack: error?.stack
    });
    // provide more context in the error message to help debugging
    return res.status(500).json({ success: false, message: error.message || 'Server error while creating review' });
  }
}