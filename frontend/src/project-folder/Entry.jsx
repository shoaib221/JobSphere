import { Outdent } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Nav } from '../Nav/Nav.jsx';
import { Footer } from '../Nav/Footer.jsx';
import "./project.css"
import { DownWindowContext } from '../Nav/context.jsx';
import { AuthContext } from '../auth/context.jsx';


export const Entry = () => {
    const navigate = useNavigate();
    const { navi } = useContext(DownWindowContext)
    const { user } = useContext(AuthContext)

    useEffect(()=> {
        //console.log(  import.meta.env.VITE_TEST );
    }, [])

    return (
        <>
            <Nav />
            <div className='flex-grow  flex gap-4 items-start' >
                <div className='h-full sticky top-1 flex-col min-w-[15rem] gap-4 px-4 hidden lg:flex border-r-2 border-gray-200' >
                    <div className={`navi-pf   ${navi === "home" ? "active-navi" : ""}`} onClick={() => navigate('/')} >Home</div>
                    <div className={`navi-pf ${navi === 'all-jobs' ? 'active-navi' : ''}`  } onClick={() => navigate('/all-jobs')} >All Jobs</div>
                    

                    {user && <>
                        <div className={`navi-pf ${navi === 'add-job' ? 'active-navi' : ''}`} onClick={() => navigate('/add-job')} >Add Job</div>
                        <div className={`navi-pf ${navi === 'my-jobs' ? 'active-navi' : ''}`} onClick={() => navigate('/my-jobs')} >My Jobs</div>
                        <div className={`navi-pf ${navi === 'my-task' ? 'active-navi' : ''}`} onClick={() => navigate('/my-task')} >My Tasks</div>
                    </>}

                </div>
                <Outlet />
            </div>
            <Footer />
        </>
    );
};


