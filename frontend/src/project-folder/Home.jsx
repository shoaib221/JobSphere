import React, { useContext, useEffect, useState } from 'react';
import { Job } from './AllJobs.jsx';
import { min } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { DownWindowContext } from '../Nav/context.jsx';
import { AuthContext } from '../auth/context.jsx';
import { motion } from 'framer-motion';
import { Banner1 } from '../Banner/banner1.jsx';
import { InfiniteSlider } from '../Swiper/slide1.jsx';



export const Home = () => {
    const { axiosInstance } = useContext(AuthContext)
    const [jobs, setJobs] = useState([])
    const [category, setCategory] = useState([])
    const navigate = useNavigate()
    const { DownWindow, DownWindowTag } = useContext(DownWindowContext)
    const { user } = useContext(AuthContext)


    useEffect(() => {

        axiosInstance.get("/product/all-jobs").then(res => {
            let abc = res.data.jobs;
            abc.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // newest first
            abc.length = Math.min(abc.length, 6)
            setJobs(abc)

            axiosInstance.get("/product/category").then(res => {
                setCategory(res.data.result)
            }).catch(err => {
                //console.dir(err)
            })

        }).catch(err => {
            //console.log(err)
        })

    }, [axiosInstance])

    return (
        <div className='flex flex-col flex-1 relative min-w-0 overflow-hidden' >
            <Banner1 />

            <div className='px-2' >

                <div className='text-2xl font-bold my-2' >Grab Your Dream Job</div>
                <div className='text-justify' >
                    Welcome to JobSphere, your all-in-one platform for finding and posting job opportunities with ease. We connect employers and job seekers
                    in a fast, reliable, and user-friendly environment designed to simplify the hiring process. Whether you’re a business
                    searching for the right talent or a professional looking for your next career move, JobSphere helps you reach your goals effortlessly.
                    Our mission is to bridge the gap between skills and opportunities by providing transparent listings, smart search filters, and real-time
                    updates. We believe in empowering people through meaningful work and supporting businesses in building strong teams.
                    From local startups to global enterprises, JobSphere is the trusted platform where opportunities meet ambition.
                    Start exploring today — your next big opportunity is just one click away.
                </div>
                <button></button>
            </div>

            <br /><br /><br />


            <div className='text-2xl font-bold text-center' >Latest Jobs</div>
            <br />
            <div className='grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr] gap-4 flex-grow px-4 overflow-auto p-2' >

                {jobs && jobs.map(job => <Job key={job._id} job={job} />)}
            </div>


            <br /><br /><br />

            <div className='text-2xl font-bold text-center' >Top Job Categories</div>
            <br/>
            <InfiniteSlider />



            <br /><br /><br />

            <DownWindowTag />

            <br />

        </div>
    );
};

