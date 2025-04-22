import Job from "../models/Job.js"



export const getJobs = async(req,res) =>{

    try {
        const jobs = await Job.find({visible:true})
        .populate({path:'companyId',select:'-password'})

        res.json({success:true,jobs})


        
    } catch (error) {
        res.json({success:false,message:error.message})
        
    }


}

//get job by single id

export const getJobById = async (req, res) => {
    try {
        // Extract _id from req.params
        const {id } = req.params;
        console.log(id);  // Check if _id is coming from the URL

        // Use _id correctly in the findById method
        const job = await Job.findById(id)  // Change `id` to `_id`
            .populate({
                path: 'companyId',
                select: '-password'
            });

        if (!job) {
            return res.json({
                success: false,
                message: 'Job not found'
            });
        }

        res.json({ success: true, job });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
