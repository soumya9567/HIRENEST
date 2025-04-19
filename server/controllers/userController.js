// controllers/userController.js
import Job from '../models/Job.js';
import JobApplication from '../models/jobApplication.js';
import User from '../models/User.js';

const storeUserData = async (req, res) => {
  try {
    const { clerkId, name, email, image, role } = req.body;

    if (!clerkId || !email || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ clerkId });

    if (existingUser) {
      return res.status(200).json({ message: 'User already exists', user: existingUser });
    }

    // Create new user
    const newUser = new User({
      clerkId,
      name,
      email,
      image,
      role: role || 'candidate', // default fallback
    });

    const savedUser = await newUser.save();

    res.status(201).json({ message: 'User registered successfully', user: savedUser });
  } catch (error) {
    console.error(' Error storing user:', error);
    res.status(500).json({ error: 'Error saving user to database' });
  }
};

export { storeUserData };


export const getUserData = async(req,res) =>{


  const userId = req.auth.userId

  try {

    const user = await User.findById(userId)


    if (!user) {

     return res.json({success:false,message:'User not found'})
      
    }

    res.json({success:true,user})

    
  } catch (error) {
    res.json({success:false,message:error.message})
  }




}


export const applyForJob = async(req,res) =>{

  const {jobId} = req.body

  const userId = req.auth.userId

  try {
 
    const isAlreadyApplied = await JobApplication.find({jobId,userId})


    if (isAlreadyApplied) {

      return res.json({success:false,message:'Already applied'})
      
    }

    const jobData = await Job.findById(jobId)


    if (!jobData) {
      return res.json({success:false,message:'job not found'})

    }

    await JobApplication.create({
      companyId:jobData,
      userId,
      jobId,
      date:Date.now()
    })

    return res.json({success:true,message:'Applied successfully'})




    
  } catch (error) {
    res.json({success:false,message:error.message})

  }





}




export const getUserJobApplications = async(req,res) =>{

try {

  const userId = req.auth.userId
  const applications = await JobApplication.find({userId})
  .populate('companyId','name email image ')
  .populate('jobId','title description location salary category level')
  .exec()



  if (!applications) {

    return res({success:false,message:"no job application is found by the user"})
    
  }
  return res({success:true, applications})



} catch (error) {
  res.json({success:false,message:error.message})

}


}

export const updateUserResume = async(req,res) =>{


}





