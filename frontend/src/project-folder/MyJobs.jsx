import React, { useContext, useEffect, useState } from 'react';

import { Job } from './AllJobs.jsx';
import { PrivateRoute } from '../auth/auth.jsx';
import { DownWindowContext } from '../Nav/context.jsx';
import { AuthContext } from '../auth/context.jsx';

export const MyJobs = () => {
    const [jobs, setJobs] = useState(null)
    const { axiosInstance } = useContext(AuthContext)
    const { DownWindow, DownWindowTag } = useContext(DownWindowContext)
    const [categorySearch, setCategory] = useState("")
    const [display, setDisplay] = useState([])
    const [sort, setSort] = useState("")
    const { user } = useContext(AuthContext)


    useEffect(() => {
        if(!user) return;
        axiosInstance.get("/product/my-jobs").then(res => {
            setJobs(res.data.jobs);
            setDisplay(res.data.jobs);
            //console.log(res.data.jobs);
        }).catch(err => {
            //console.dir(err)
        })

    }, [user, axiosInstance])


    function SearchByCategory(event) {
        event.preventDefault();
        let param = event.target.value;
        setCategory(param)

        if (!jobs || !Array.isArray(jobs)) return;

        if (param.trim() === "") {
            setDisplay(jobs);
            return;
        }
        //console.log("aha")
        let temp = [...jobs]
        temp = temp.filter(x => x.category.toLowerCase().includes(param.toLowerCase()));
        setDisplay(temp)
    }

    function SortDisplay(event) {
        let param = event.target.value;
        setCategory("")
        setSort(param)
        let abc = [...jobs];

        //console.log("sort display", param)

        if (param === 'latest') {
            abc.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // newest first
            
        } else if (param === 'oldest') {
            abc.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt)); // oldest first
            
        }
        else if( param === "incomplete" ) {
            abc = abc.filter( x => x.acceptedBy === 'none' )
            
        }

        setJobs(abc)
        setDisplay(abc)
        
    }

    return (
        <PrivateRoute>
            <div className='flex-grow relative' >

                <div className='flex justify-between p-2' >
                    <div className='text-2xl font-bold' >
                        My Jobs
                    </div>

                    <div className='flex gap-2' >
                        <input placeholder='Search By Category' value={categorySearch} onChange={(e) => SearchByCategory(e)} />

                        <select value={sort} onChange={(e) => SortDisplay(e)} className='bg-[var(--color1)] text-[var(--color2)]' >
                            <option value="" >Sort By</option>
                            <option value="latest" >Latest</option>
                            <option value="oldest" >Oldest</option>
                            <option value="incomplete" >Vacant</option>
                        </select>
                    </div>

                </div>

                <br />

                <div className='grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr] gap-4 flex-grow p-4 overflow-auto' >
                    {display && display.map(job => <Job key={job._id} job={job} />)}
                </div>

                <DownWindowTag />

            </div>
        </PrivateRoute>
    );
};

