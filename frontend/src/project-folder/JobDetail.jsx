import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../auth/context';
import { DownWindowContext } from '../Nav/context';
import { format } from "date-fns";
import { PrivateRoute } from '../auth/auth';
import { toast } from 'react-toastify';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GrDocumentUpdate } from "react-icons/gr";
import { Loading } from '../miscel/Loading';


export const JobDetail = () => {
    const { id } = useParams()
    const [job, setJob] = useState(null)
    const { axiosInstance } = useContext(AuthContext)
    const { user } = useContext(AuthContext)
    const { DownWindow, DownWindowTag } = useContext(DownWindowContext);
    const navigate = useNavigate();
    const [updating, setUpdating] = useState(false)



    useEffect(() => {
        if (!user || !id) return;
        axiosInstance.get(`/product/job/${id}`)
            .then(res => {
                //console.log(res.data)
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


    function DeleteJob() {
        axiosInstance.delete(`/product/job/${job._id}`).then(res => {
            toast.info("Job Deleted");
            navigate("/");
        }).catch(err => toast.error(err.response.data.error));
    }

    function UpdateJob() {
        console.log(job)
        axiosInstance.put(`/product/job/${job._id}`, { ...job }).then(res => {
            toast.info("Job Updated")
            setJob(res.data.job)
            setUpdating(false)
            //console.log(res.data.job)
        }).catch(error => toast.error(error.response.data.error));
    }

    function WatchChange(key, value) {
        let abc = { ...job };
        abc[key] = value;
        //console.log( abc )
        setJob(abc);
    }



    return (
        <PrivateRoute>
            <div className='flex-grow flex justify-center items-center relative' >
                <div className='w-full max-w-[600px] flex flex-col items-center box-1 p-4' >
                    {job && <>
                        <div className='flex flex-col md:flex-row justify-center items-center w-full gap-2' >
                            <div className='bg-cover bg-center min-h-[10rem] min-w-[10rem] rounded-full' style={{ backgroundImage: `url(${job.coverImage})` }} >

                            </div>
                            <div className='w-full' >
                                <div className='text-2xl font-bold flex justify-between' >
                                    <div>{job.title}</div>
                                    { job.ownerEmail === user.email && <RiDeleteBin6Line title='Delete' onClick={DeleteJob} /> }
                                    
                                </div>

                                <div>
                                    Posted By <span className='font-bold' > {job.postedBy} </span>
                                </div>

                                <div className='flex gap-4 p-2 text-2xl' >
                                </div>
                            </div>
                        </div>

                        <br />

                        {updating ?
                            <div className='w-full' >
                                <div className='grid grid-cols-[1fr_2fr] w-full gap-4'>

                                    <label className='font-bold flex flex-row-reverse items-center' >Title</label>
                                    <input maxLength="20" value={job.title} onChange={(e) => WatchChange("title", e.target.value)} placeholder='Maximum twenty characters' />

                                    <label className='font-bold flex flex-row-reverse items-center' >Category</label>
                                    <select value={job.category} >
                                        <option></option>
                                    </select>

                                    <label className='font-bold flex flex-row-reverse items-center' >Cover Image</label>
                                    <input maxLength="70" value={job.coverImage} onChange={(e) => WatchChange("coverImage", e.target.value)} placeholder='Maximum seventy characters' />

                                    <label className='font-bold flex flex-row-reverse items-start' >Summary</label>
                                    <textarea onChange={(e) => WatchChange("summary", e.target.value)} value={job.summary}
                                        maxLength="300" rows={3} className='resize-none p-2' placeholder='Maximum 300 characters' ></textarea>

                                    <div onClick={() => setUpdating(prev => !prev)} className='text-center bg-red-800 text-white p-2 rounded-md' >Cancel</div>
                                    <div onClick={UpdateJob} className='text-center bg-green-800 text-white p-2 rounded-md' >Update</div>

                                </div>
                            </div>
                            :
                            <div className='w-full' >

                                <div className='flex flex-row-reverse text-xl' >
                                    {job.ownerEmail === user.email && <GrDocumentUpdate title='Update' onClick={() => setUpdating(prev => !prev)} />}
                                </div>



                                <div className='font-bold' >Summary</div>
                                <div className='italic' > {job.summary} </div>

                                <br />

                                <div className='font-bold' >Category</div>
                                <div className='italic' >  {job.category} </div>

                                <br />

                                {job.acceptedBy !== 'none' && <>
                                    <div className='font-bold' > Done By   </div>
                                    <div className='italic' > {job.acceptedBy} </div>
                                    <br />
                                </>}



                                <div className='font-bold' >Contact  </div>
                                <div className='italic' > {job.ownerEmail} </div>

                                <br />

                                <div className='font-bold' > Last updated </div>
                                <div className='italic' >     {format(job.updatedAt, "MMM do, yyyy")}</div>

                                <br />

                                {job.acceptedBy === 'none' && job.ownerEmail !== user.email &&
                                    <button className='button-1' onClick={AcceptJob} > Accept </button>
                                }

                            </div>
                        }



                    </>}

                </div>


                <DownWindowTag />


            </div>
        </PrivateRoute>
    );
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
