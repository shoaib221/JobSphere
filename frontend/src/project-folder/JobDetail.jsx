

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext, useAuthContext } from '../auth/context';
import { DownWindowContext } from '../Nav/context';
import { format } from "date-fns";
import { PrivateRoute } from '../auth/auth';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";
import { Loading, LoadingFull } from '../miscel/Loading';
import { UpdateDetail } from './UpdateJob';
import { TimeDate1 } from '../miscel/TimeDate';





export const JobDetail = () => {
    const { id } = useParams()
    const [job, setJob] = useState(null)
    const { axiosInstance, user } = useAuthContext()
    const { DownWindow, DownWindowTag } = useContext(DownWindowContext);
    



    useEffect(() => {
        if (!user || !id) return;
        axiosInstance.get(`/product/job/${id}`)
            .then(res => {
                console.log(res.data)
                setJob(res.data)
            })
            .catch(err => {
                //console.dir(err)
            })
    }, [user, axiosInstance, id])



    function AcceptJob() {
        axiosInstance.post("/product/accept-job", {
            job_id: job._id,
            acceptedBy: user.email,
            ownerEmail: job.ownerEmail
        }).then(res => {
            toast.success("Task accepted")
            setJob(res.data.job)
        })
            .catch(err => {
                //console.dir(err)
            })
    }


    

    if (!job || !user) return <LoadingFull />

    if (job.ownerEmail !== user.email) return (
        <div className='flex-grow flex flex-col lg:flex-row gap-2' >

            <div className='rounded-xl mx-2  lg:min-w-90 lg:w-90 h-60 lg:h-72 bg-cover bg-center' style={{ backgroundImage: `url(${job.coverImage})` }} ></div>
            <div className='flex-grow p-2' >
                <div className='font-bold text-2xl' > {job.title} </div>
                <div>
                    by {job.postedBy}
                </div>
                <button className='text-(--color1) bg-(--color2) p-1 rounded-lg text-[.8rem]' >
                    {job.category}
                </button>

                <div className='border-t-2  my-2 border-gray-300' ></div>

                <div className='font-bold' > About this job </div>

                <div> {job.summary} </div>

                <br/>

                <div  > Contact: {job.ownerEmail} </div>

                
                

                <div>
                    Job created at: <TimeDate1  date={job.createdAt} />

                </div>

                <div>
                    Last updated at:  <TimeDate1  date={job.updatedAt} />

                </div>

                <div className='border-t-2  my-2 border-gray-300' ></div>

                <div className='font-bold' >Job Status</div>

                { job.status === 'initial' && <button className='button-3' onClick={AcceptJob} >Accept This Job</button> }
                { job.status === 'pending' && <p> Being done by { job.acceptedBy } </p> }
                { job.status === 'done' && <p> Completed by { job.acceptedBy } </p> }
                

                {/* <div className='max-w-30 w-30' >{ JSON.stringify( job ) } </div> */}

            </div>

        </div>
    )

    return <UpdateDetail job={job} />

};



// const JobSchema = new mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     postedBy: {
//         type: String,
//         required: true,
//     },
//     category: {
//         type: String,
//         required: true,
//     },
//     summary: {
//         type: String,
//     },
//     coverImage : {
//         type: String,
//     },
//     ownerEmail: {
//         type: String
//     }
// });
