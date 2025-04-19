import Company from "../models/Company.js";
import bcrypt from 'bcrypt'
import {v2 as cloudinary} from 'cloudinary'
import generateToken from "../utils/generateToken.js";
import Job from "../models/Job.js";




export const registerCompany = async (req,res) =>{

    const {name,email,password} = req.body

    const imageFile = req.file;

    if (!name||!email||!password||!imageFile) {

        return res.json({success:false,message:"Missing Details"})

        
    }

    try {

        const companyExists = await Company.findOne({email})

        if (companyExists) {

            return res.json({success:false,message:'Company already registered'})
            
        }


        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)


        //upload image in cloudinary


        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const company = await Company.create({

            name,email,
            password:hashPassword,
            image:imageUpload.secure_url
        })

        res.json({
            success:true,
            company:{
                _id:company._id,
                name:company.name,
                email:company.email,
                image:company.image
            },

            token:generateToken(company._id)
        })


        
    } catch (error) {

        res.json({success:false,message:error.message})
        
    }


}


export const loginCompany = async (req,res) =>{


    const {email,password}  = req.body

    try {


        const company = await Company.findOne({email})


        if (bcrypt.compare(password,company.password)) {

            res.json({
                success:true,
                company:{

                    _id:company._id,
                    name:company.name,
                    email:company.email,
                    image:company.image

                },
                token:generateToken(company._id)
            })
            
        }
        else{
            res.json({success:false,message:'invalied email or password'})
        }
        
    } catch (error) {



        res.json({success:false,message:error.message})
        
    }


}


 export const getCompanyData = async (req,res) =>{


const company = req.company

try {

    res.json({success:true,company})
    
} catch (error) {
res.json({success:false,message:error.message})
}


}


export const postJob = async (req,res) =>{


    const {title,description,location,salary,level,category} =req.body

    const companyId = req.company._id
    console.log(companyId,{title,description,location,salary})

    try {
        const newJob = new Job({
            title,
            description,
            location,
            salary,
            level,
            category,
            companyId,
            date:Date.now()
        })

        await newJob.save()

        res.json({success:true,newJob})

    } catch (error) {

        res.json({success:false,message:error.message})
        
    }









}

export const getCompanyJobApplicants = async (req,res) =>{


    
}

 export const getCompanyPostedJobs = async (req,res) =>{


    try {


        const companyId = req.company._id



        const jobs = await Job.find({companyId})

        res.json({success:true,jobsData:jobs})


        
    } catch (error) {

        res.json({success:false,message:error.message})
        
    }


    
}


export const ChangeJobApplicantionsStatus = async (req,res) =>{


    
}


export const ChangeVisibility = async (req,res) =>{



    try {

        const {id} = req.body

        const companyId = req.company._id
        const job = await Job.findById(id)




        if (companyId.toString() === job.companyId.toString()) {

            job.visible = !job.visible
            
        }

        await job.save()

        res.json({success:true,job})

        
    } catch (error) {
        res.json({success:false,message:error.message})
 
    }


    
}