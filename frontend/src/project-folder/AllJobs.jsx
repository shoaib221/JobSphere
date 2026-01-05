import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import '../Box/box.css';
import { useNavigate } from 'react-router-dom';
import { DownWindowContext } from '../Nav/context';
import { AuthContext } from '../auth/context';
import { IoPerson } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { SearchTag, PageTag, usePage } from '../pagination/usePagination';


export const Job = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div className='h-[30rem] flex flex-col justify-between box-1' >

            <div className='w-full h-[15rem] bg-cover bg-center' style={{ backgroundImage: `url(${job.coverImage})` }} >  </div>
            <div className='font-bold' >{job.title} </div>
            <div className='text-[.8rem] italic' > {job.summary.substring(0, 80)} ...</div>

            <div className='flex text-[.7rem] justify-between' >
                <div className='flex gap-1 items-center' > <IoPerson /> {job.postedBy} </div>
                <div className='flex gap-1 items-center' > {job.category} <BiCategory /> </div>
            </div>

            <button className='button-1 bg-black' onClick={() => navigate(`/job-detail/${job._id}`)} >
                View Detail
            </button>
        </div>
    )
}



export const AllJobs = () => {
    const { axiosInstance } = useContext(AuthContext);
    const { DownWindow, DownWindowTag } = useContext(DownWindowContext);
    const { jobs, Search, searchBy, setSearchBy, searchPattern, setSearchPattern, page, setPage, totalPages, sortOrder, setSortOrder } = usePage({ baseURL: '/product/all-jobs' })


    useEffect(() => {
        async function Fetchdata() {
            await Search();

        }

        Fetchdata();

    }, [axiosInstance])




    return (
        <div className='flex-grow relative p-4 overflow-auto' >


            <div className='text-xl font-bold text-center' >
                    All Jobs
                </div>

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
    )
}
