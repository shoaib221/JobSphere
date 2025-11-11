import React, { useContext, useEffect, useState } from 'react';
import { useAxios } from '../axios/axios.jsx';
import { Job } from './AllJobs.jsx';
import { PrivateRoute } from '../auth/auth.jsx';
import { DownWindowContext } from '../Nav/context.jsx';


export const MyTask = () => {
    const { axiosInstance } = useAxios()
    const [task, setTask] = useState([])
    const { DownWindow, DownWindowTag } = useContext( DownWindowContext )


    useEffect(() => {

        axiosInstance.get("/product/my-task").then(res => {
            console.dir(res.data)
            setTask(res.data?.task)
        }).catch(error => {
            console.dir(error)
        })

    }, [])

    return (
        <PrivateRoute>
            <div className='flex-grow relative' >

                <div className='text-2xl font-bold' >
                    My Tasks
                </div>

                <br />

                <div className='grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] lg:grid-cols-[1fr_1fr_1fr_1fr] gap-4 flex-grow px-4 overflow-auto' >
                    {task && task.map(elem => <Job key={elem._id} job={elem} />)}
                </div>

                <DownWindowTag />
                
            </div>
        </PrivateRoute>
    );
};

