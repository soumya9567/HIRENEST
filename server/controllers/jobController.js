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

export  const getJobById = async(req,res) =>{

    try {


        const {id} = req.params

        
        
    } catch (error) {
        
    }

}