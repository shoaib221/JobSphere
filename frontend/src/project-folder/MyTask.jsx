import React, { useContext, useEffect, useState } from 'react';
import { Job } from './AllJobs.jsx';
import { PrivateRoute } from '../auth/auth.jsx';
import { DownWindowContext } from '../Nav/context.jsx';
import { AuthContext } from '../auth/context.jsx';
import { useNavigate } from 'react-router-dom';
import { MdOutlineDone } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { toast } from 'react-toastify';
import { IoPerson } from 'react-icons/io5';
import { BiCategory } from 'react-icons/bi';
import { PageTag, SearchTag, usePage } from '../pagination/usePagination.jsx';


export const Task = ({ job, done }) => {
    const navigate = useNavigate();
    const { axiosInstance } = useContext(AuthContext);

    function Done() {
        axiosInstance.post("/product/complete-task", {
            job
        }).then(res => {
            toast.info("Task Completed");
            done(job)
        })
            .catch(err => toast.error(err.response.data.error))
    }

    function Cancel() {
        axiosInstance.post("/product/cancel-task", {
            job
        }).then(res => {
            toast.info("Canceled Task");
            done(job)
        })
            .catch(err => toast.error(err.response.data.error))
    }

    return (
        <div className='h-[30rem] p-2 box-1 flex flex-col justify-between' >
            {job.status === 'pending' && <div className='flex justify-between items-center mb-2 text-xl font-bold' >
                <RxCross2 title='Cencel' onClick={Cancel} />
                <MdOutlineDone title='Done' onClick={Done} />
            </div>}
            <div className='w-full h-[15rem] bg-cover bg-center' style={{ backgroundImage: `url(${job.coverImage})` }} >  </div>
            <div className='font-bold' >{job.title} </div>
            <div className='text-[.8rem]' > {job.summary.substring(0, 80)} ...</div>

            <div className='flex text-[.7rem] justify-between' >
                <div className='flex gap-1 items-center' > <IoPerson /> {job.postedBy} </div>
                <div className='flex gap-1 items-center' > {job.category} <BiCategory /> </div>
            </div>

            <button className='button-1' onClick={() => navigate(`/job-detail/${job._id}`)} >
                View Detail
            </button>
        </div>
    )
}


export const MyTask = () => {
    const { axiosInstance, user } = useContext(AuthContext)
    const { DownWindow, DownWindowTag } = useContext(DownWindowContext)
    const { jobs, Search, searchBy, setSearchBy, searchPattern, setSearchPattern, page, setPage, totalPages, sortOrder, setSortOrder } = usePage({ baseURL: '/product/my-task' })


    useEffect(() => {
        if (!user) return;
        Search();

    }, [user, axiosInstance])



    return (
        <PrivateRoute>
            <div className='flex-grow relative' >


                <div className='text-xl font-bold text-center' >
                    My Tasks
                </div>

                <br />

                <SearchTag sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    searchBy={searchBy}
                    setSearchBy={setSearchBy}
                    searchPattern={searchPattern}
                    setSearchPattern={setSearchPattern}
                    Search={Search} />

                <br />

                <div className='grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr] gap-4 flex-grow px-4 overflow-auto p-2' >
                    {jobs && jobs.map(job => <Job key={job._id} job={job} />)}
                </div>

                <PageTag page={page} setPage={setPage} totalPages={totalPages} />

                <DownWindowTag />

            </div>
        </PrivateRoute>
    );
};

