import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAxios } from '../axios/axios';
import { AuthContext } from '../auth/context';
import { DownWindowContext } from '../Nav/context';
import { format } from "date-fns";


export const JobDetail = () => {
    const { id } = useParams()
    const [ job, setJob ] = useState(null)
    const { axiosInstance } = useAxios()
    const { user } = useContext(AuthContext)
    const { DownWindow, DownWindowTag } = useContext( DownWindowContext )

    useEffect(() => {
        axiosInstance.get( `/product/job/${id}` )
            .then( res => {
                console.log(res.data)
                setJob( res.data )
            })
            .catch( err => console.dir(err) )
    }, [])


    function AcceptJob () {
        axiosInstance.post( "/product/accept-job", {
            job_id: job._id,
            acceptedBy: user.email
        } ).then( res => console.log( res.data ) )
        .catch( err => console.dir( err ) )
    }

    return (
        <div className='flex-grow flex justify-center items-center relative' >
            <div className='w-full max-w-[600px] flex flex-col items-center box-1' >
                { job && <>
                    <div className='flex flex-col md:flex-row justify-center items-center' >
                        <div className ='h-[10rem] w-[10rem] rounded-full' style={{ backgroundImage: `url(${job.coverImage})` }} >

                        </div>
                        <div>
                            <div className='text-2xl font-bold' >{ job.title }</div>
                            <div  >
                                Posted By <span className='font-bold' > {  job.postedBy  } </span>
                            </div>

                            <div>
                                at {format(job.createdAt , "MMM do, yyyy")}
                            </div>
                            
                        </div>
                    </div>

                    
                    <div className='font-bold' >Summary</div>
                    <div>     { job.summary } </div>

                    <br />

                    <div className='flex flex-col md:flex-row gap-2' >
                        <div>
                            <span className='font-bold' >  Category  </span>
                            <span className='italic' >{ job.category }</span> 
                        </div>
                        
                        <div>
                            <span className='font-bold' > Contact   </span>
                            <span className='italic' > { job.ownerEmail } </span>
                        </div>
                        
                    </div>

                    <br />

                    { job.acceptedBy === 'none' && job.ownerEmail !==user.email ? 
                        <button className='button-1' onClick={  AcceptJob } > Accept </button>
                        :
                        <></>
                    }

                    { job.acceptedBy !== 'none' && <div>
                            <span className='font-bold' > Completed By   </span>
                            <span className='italic' > { job.acceptedBy } </span>
                        </div> }

                    
                    
            
                </> }
                
            </div>


            <DownWindowTag />

            
        </div>
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
