import React, { useContext, useEffect, useState } from 'react';
import { useAxios } from '../axios/axios';
import { Job } from './AllJobs.jsx';
import { min } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { DownWindowContext } from '../Nav/context.jsx';





export const Home = () => {
    const { axiosInstance } = useAxios()
    const [jobs, setJobs] = useState([])
    const [category, setCategory] = useState([])
    const navigate = useNavigate()
    const { DownWindow, DownWindowTag } = useContext(DownWindowContext)


    useEffect(() => {

        axiosInstance.get("/product/all-jobs").then(res => {
            let abc = res.data.jobs;
            abc.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // newest first
            abc.length = Math.min(abc.length, 6)
            setJobs(abc)

            axiosInstance.get("/product/category").then(res => {
                setCategory(res.data.result)
            }).catch(err => console.dir(err))

        }).catch(err => console.log(err))

    }, [])

    return (
        <div className='block flex-grow relative' >
            <div className='grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] gap-2' >
                <div className='h-[15rem] bg-cover bg-bottom' style={{ backgroundImage: "url('/banner.jpg')" }} ></div>
                <div className='flex flex-col justify-end'>
                    <div className='text-3xl font-bold' >This is Header</div>
                    <div> Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laboriosam possimus aperiam quaerat quod inventore dicta recusandae corporis totam! Minus ducimus laudantium iure! Expedita saepe at rem laudantium dicta praesentium. </div>
                </div>
            </div>

            <br /><br /><br />

            <div>
                <div className='text-2xl font-bold text-center' >Latest Jobs</div>
                <br />
                <div className='grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr] gap-4 flex-grow px-4 overflow-auto' >

                    {jobs && jobs.map(job => <Job key={job._id} job={job} />)}
                </div>
            </div>

            <br /><br /><br />

            <div className='border' >
                <div className='text-2xl font-bold text-center' >Top Categories</div>
                <br />
                <div className='flex flex-wrap gap-2' >
                    {category && category.map(x => <div key={x._id} className='w-[8rem] border cen-hor text-center' >
                        {x.name}
                    </div>)}
                </div>
            </div>

            <br /><br /><br />

            <div>
                <div className='text-2xl font-bold text-center' >About</div>
            </div>

            
            <div className='absolute hidden z-2 h-[100%] w[100%] bg-[var(--color1)]  flex-col items-center top-0 left-0 p-4 gap-4' id="down-1" >
                <div onClick={() => DownWindow("/")} className='style1'  >Home</div>
                <div onClick={() => DownWindow("/add-job")} className='style1' >Add Job</div>
                <div onClick={() => DownWindow("/all-jobs")} className='style1' >All Jobs</div>
                <div onClick={() => DownWindow("/my-jobs")} className='style1' >My Jobs</div>
                <div onClick={() => DownWindow("/my-task")} className='style1' >My Tasks</div>
            </div>

        </div>
    );
};

