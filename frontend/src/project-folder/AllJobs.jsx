import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import '../Box/box.css';
import { useNavigate } from 'react-router-dom';
import { DownWindowContext } from '../Nav/context';
import { AuthContext } from '../auth/context';
import { IoPerson } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";


export const Job = ({ job }) => {
    const navigate = useNavigate();

    return (
        <div className='h-[15rem] p-2 box-1' >
            <div className='w-full h-[7rem] bg-cover bg-center' style={{ backgroundImage: `url(${job.coverImage})` }} >  </div>
            <div className='font-bold' >{job.title} </div>
            <div className='text-[.8rem] italic' > {job.summary.substring(0, 20)} ...</div>
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



export const AllJobs = () => {
    const { axiosInstance } = useContext(AuthContext)
    const [jobs, setJobs] = useState(null)
    const { DownWindow, DownWindowTag } = useContext(DownWindowContext)
    const [categorySearch, setCategory] = useState("")
    const [display, setDisplay] = useState([])
    const [sort, setSort] = useState("")
    const { user } = useContext(AuthContext)


    useEffect(() => {
        axiosInstance.get("/product/all-jobs").then(res => {
            setJobs(res.data.jobs)
            setDisplay(res.data.jobs)
            //console.log( res.data.jobs )
        }).catch(err => {
            //console.log(err)
        })

    }, [axiosInstance])


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
        <div className='flex-grow relative p-4' >

            <div className='flex justify-between' >
                <div className='text-2xl font-bold' >
                    All Jobs
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

            <br/ >

            <div className='grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr] gap-4 flex-grow px-4 overflow-auto p-2' >
                {display && display.map(job => <Job key={job._id} job={job} />)}
            </div>

            <DownWindowTag />
        </div>
    )
}
