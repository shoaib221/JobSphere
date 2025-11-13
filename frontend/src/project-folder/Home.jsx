import React, { useContext, useEffect, useState } from 'react';
import { Job } from './AllJobs.jsx';
import { min } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { DownWindowContext } from '../Nav/context.jsx';
import { AuthContext } from '../auth/context.jsx';
import { motion } from 'framer-motion';




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
        <div className='block flex-grow relative' >
            <div className='grid grid-cols-[1fr] md:grid-cols-[1fr_1fr] gap-4 px-4' >
                <div className='h-[15rem] bg-cover bg-bottom rounded-xl' style={{ backgroundImage: "url('/banner.jpg')" }} ></div>
                <div className='flex flex-col justify-end'>
                    <div className="relative overflow-hidden">
                        
                        <motion.div
                            className="text-3xl font-bold"
                            initial={{ x: 500 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                        >
                            Grab Your <span style={{ color: 'red' }}>Opportunities</span>
                        </motion.div>
                    </div>

                    <div className="relative overflow-hidden">
                        
                        <motion.div
                            className="text-justify italic"
                            initial={{ y: -500 }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                        >
                            Your gateway to endless career opportunities! Discover jobs, connect with employers, and take the next step toward your future. Start exploring and find your perfect match today!
                        </motion.div>
                    </div>


                    <div className="relative overflow-hidden">
                        
                        <motion.button
                            className='cen-ver max-w-[10rem] p-2 bg-red-600 text-center font-bold text-white rounded-xl' onClick={() => navigate("/add-job")}
                            initial={{ x: -500 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 1, ease: "easeInOut" }}
                        >
                            Add a job
                        </motion.button>
                    </div>

                </div>
            </div>

            <br /><br /><br />

            <div>
                <div className='text-2xl font-bold text-center' >Latest Jobs</div>
                <br />
                <div className='grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr] gap-4 flex-grow px-4 overflow-auto p-2' >

                    {jobs && jobs.map(job => <Job key={job._id} job={job} />)}
                </div>
            </div>

            <br /><br /><br />

            <div className='p-4' >
                <div className='text-2xl font-bold text-center' >Top Categories</div>
                <br />
                <div className='flex flex-wrap gap-8 justify-center' >
                    <div className='bg-blue-600 p-2 text-white font-bold rounded-md' > Web Development </div>
                    <div className='bg-red-600 p-2 text-white font-bold rounded-md' > Digital Marketing </div>
                    <div className='bg-green-600 p-2 text-white font-bold rounded-md' > SEO Specialist </div>
                    <div className='bg-purple-600 p-2 text-white font-bold rounded-md' > Cyber Security </div>
                    <div className='bg-pink-600 p-2 text-white font-bold rounded-md' > Graphics Design </div>
                    <div className='bg-blue-600 p-2 text-white font-bold rounded-md' > Digital Marketing </div>
                    <div className='bg-red-600 p-2 text-white font-bold rounded-md' > UI/UX </div>
                    <div className='bg-green-600 p-2 text-white font-bold rounded-md' > Cloud Computing </div>


                </div>
            </div>

            <br /><br /><br />

            <div className='p-4'>
                <div className='text-2xl font-bold text-center' >About</div>
                <br />
                <div className='text-justify' >
                    Welcome to JobSphere, your all-in-one platform for finding and posting job opportunities with ease. We connect employers and job seekers
                    in a fast, reliable, and user-friendly environment designed to simplify the hiring process. Whether you’re a business
                    searching for the right talent or a professional looking for your next career move, JobSphere helps you reach your goals effortlessly.
                    Our mission is to bridge the gap between skills and opportunities by providing transparent listings, smart search filters, and real-time
                    updates. We believe in empowering people through meaningful work and supporting businesses in building strong teams.
                    From local startups to global enterprises, JobSphere is the trusted platform where opportunities meet ambition.
                    Start exploring today — your next big opportunity is just one click away.
                </div>
            </div>

            <DownWindowTag />

            <br />

        </div>
    );
};

