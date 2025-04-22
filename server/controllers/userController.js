// controllers/userController.js
import Job from '../models/Job.js';
import JobApplication from '../models/jobApplication.js';
import User from '../models/User.js';
import { v2 as cloudinary } from "cloudinary"

 export const storeUserData = async (req, res) => {
  try {
    // Destructuring the required fields from the request body
    const { clerkId, name, email, image, role,resume } = req.body;

    // Input validation - check if required fields are provided
    if (!clerkId || !email || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user already exists by clerkId and email (assuming email should be unique as well)
    const existingUser = await User.findOne({ $or: [{ clerkId }, { email }] });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exists', user: existingUser });
    }

    // Create new user with default role if not provided
    const newUser = new User({
      clerkId,
      name,
      email,
      image,
      resume,
      role: role || 'candidate', // Fallback to 'candidate' role
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    // Respond with the saved user, excluding sensitive data (like password)
    const { password, ...userWithoutPassword } = savedUser.toObject();
    
    res.status(201).json({ message: 'User registered successfully', user: userWithoutPassword });

  } catch (error) {
    // Log error for debugging purposes
    console.error('Error storing user:', error);

    // Send an appropriate error response
    if (error.code === 11000) {
      // MongoDB duplicate key error code, handle gracefully
      return res.status(400).json({ error: 'Duplicate entry found for this field' });
    }

    res.status(500).json({ error: 'Error saving user to database' });
  }
};



export const getUserData = async (req, res) => {
  try {
    // Get clerkId from query params
    const { clerkId } = req.query; // Use req.query to get the clerkId from the query parameters

    if (!clerkId) {
      return res.status(400).json({ success: false, message: 'clerkId is required' });
    }

    // Find the user by clerkId
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // If user is found, send the user data, omitting sensitive information like password
    const { password, ...userWithoutPassword } = user.toObject(); // Exclude password from response
    res.json({ success: true, user: userWithoutPassword });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};




export const applyForJob = async (req, res) => {
  const { jobId } = req.body;
  const userId = req.auth.userId;

  try {
    const isAlreadyApplied = await JobApplication.find({ jobId, userId });

    if (isAlreadyApplied.length > 0) {
      return res.json({ success: false, message: 'Already applied' });
    }

    const jobData = await Job.findById(jobId);

    if (!jobData) {
      return res.json({ success: false, message: 'Job not found' });
    }

    await JobApplication.create({
      companyId: jobData.companyId, // Use jobData.companyId, not jobData itself
      userId,
      jobId,
      date: Date.now(),
    });

    return res.json({ success: true, message: 'Applied successfully' });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};




export const getUserJobApplications = async (req, res) => {

  try {

    const userId = req.auth.userId
    const applications = await JobApplication.find({ userId })
      .populate('companyId', 'name email image ')
      .populate('jobId', 'title description location salary category level')
      .exec()



    if (!applications) {

      return res.json({ success: false, message: "no job application is found by the user" })

    }
    return res.json({ success: true, applications })



  } catch (error) {
    res.json({ success: false, message: error.message })

  }


}

export const updateUserResume = async (req, res) => {


  try {

    const userId = req.auth.userId

    const resumeFile = req.file


    const userData = await User.findById(userId)



    if (resumeFile) {

      const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)

      userData.resume = resumeUpload.secure_url

    }


    await userData.save()

    return res.json({ success: true, message: "Resume Updated" })

  } catch (error) {

    res.json({ success: false, message: error.message })

  }




}





