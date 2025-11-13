const express = require("express");
const productRouter = express.Router();
const { Category, Job } = require("./model");
const { requireAuth } = require("../auth/middlewire");


const FetchCategory = async ( req, res, next ) => {
    console.log(req.body);
    try {
        const result = await Category.find({});
        res.status(200).json( {result} );
    } catch(err) {
        res.status(400).json( { error: err.message } );
    }
}


const AddJob = async (req, res, next) => {

    const { title, photo, summary, selected } = req.body;
    let new_job =  {
        title, coverImage: photo, summary, category: selected, postedBy: req.name, ownerEmail: req.user_email,
        acceptedBy: "none"
    }

    console.log(new_job);
    try {
        new_job = await Job.create(new_job )
        res.status(200).json(new_job)
        
    } catch(err) {
        res.status(400).json( { error: err.message } )
    } finally {
        next()
    }
}



const AllJobs = async (req, res, next) => {
    console.log("all jobs")
    try {
        let result = await Job.find({})
        res.status(200).json({ jobs: result })
    } catch(err) {
        res.status(400).json( { error: err.message } )
    } finally {
        next()
    }
}


const JobDetail = async ( req, res, next ) => {
    const job_id = req.params.id
    try {
        const job  = await Job.findOne( { _id: job_id } )
        res.status(200).json( job )
    } catch(err) {
        res.status(400).json({ error: err.message })
    }
}


const AcceptJob = async ( req, res, next ) => {
    //console.log( req.body )
    let { job_id, ownerEmail } = req.body;

    try {
        if( ownerEmail === req.user_email ) throw Error("Not Allowed")
        let job = await Job.findOne( { _id: job_id } )
        if( job.acceptedBy !== 'none' ) throw Error("Already Alloted")
        //console.dir(job)
        job.acceptedBy = req.user_email;
        await job.save()
        res.status(200).json( { job } )
    } catch(err) {
        console.dir(err)
        res.status(400).json( { error: err.message } )
    }
}

// req.user_email = userInfo.email;
// req.name = userInfo.name;

const MyJobs = async ( req, res, next ) => {
    console.log("my jobs");

    try {
        let jobs = await Job.find( { ownerEmail: req.user_email } )
        console.dir(jobs)
        res.status(200).json( { jobs } )
    } catch( err ) {
        console.dir(err)
        res.status(400).json( { error: err.message } )
    } finally {
        next()
    }
}


const MyTask = async (req, res, next) => {
    console.log("my task")

    try {
        let tasks = await Job.find({ acceptedBy: req.user_email })
        res.status(200).json({ task: tasks })
    } catch(err) {

        res.status(400).json( { error: err.message } )
    } finally {
        next()
    }
}


const DeleteJob = async (req, res, next) => {
    try {
        const job_id = req.params.id;
        let job = await Job.findOne({ _id : job_id });
        if( job.ownerEmail !== req.user_email && job.acceptedBy !== req.user_email ) throw Error("Unauthorized request");
        await Job.findByIdAndDelete(job_id);
        res.status(200).json({ msg: "success" });
    } catch(err) {
        res.status(400).json( { error: err.message } )
    }
}


const UpdateJob = async ( req, res, next ) => {
    console.log( "update job" )

    try {
        const job_id = req.params.id;
        let job =  await Job.findById( job_id )
        if( job.ownerEmail !== req.user_email ) throw Error("Unauthorized");

        // console.log(job);
        const updation = { ...req.body }
        // console.log(updation)
        job = await Job.findByIdAndUpdate( job_id, updation, { new: true } )
        // console.log(job)
        res.status(200).json( { job } )
    } catch (err) {
        res.status(400).json( { error: err.message } )
    }
}


const CancelTask  = async  (req, res, next) => {
    console.log( "cancel task" );
    try {
        let { job } = req.body;
        job = await Job.findById( job._id );
        if( job.acceptedBy !== req.user_email ) throw Error("Not Allowed");
        job.acceptedBy = 'none';
        job = await job.save();
        res.status(200).json( { job } );
    } catch (err) {
        res.status(400).json( { error : err.message } );
    }
}


productRouter.get( "/category", FetchCategory );
productRouter.post( "/add-job", requireAuth, AddJob );
productRouter.get( "/all-jobs", AllJobs );
productRouter.get( "/job/:id", requireAuth, JobDetail );
productRouter.post( "/accept-job", requireAuth, AcceptJob );
productRouter.get( "/my-jobs", requireAuth, MyJobs );
productRouter.get( "/my-task", requireAuth, MyTask );
productRouter.delete( "/job/:id", requireAuth, DeleteJob );
productRouter.put( "/job/:id", requireAuth, UpdateJob );
productRouter.post( "/cancel-task", requireAuth, CancelTask );



module.exports = { productRouter };

