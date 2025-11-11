import { Outdent } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Nav } from '../Nav/Nav.jsx';
import { Footer } from '../Nav/Footer.jsx';
import "./project.css"


export const Entry = () => {
    const navigate = useNavigate();
    let location = useLocation()
    const [ navi, selectNavi ] = useState("home")

    useEffect( () => {
        console.log("Location change")
        let path = location.pathname.toLowerCase()

        if( path.includes("add-job") ) selectNavi("add-job");
        else if( path.includes("all-jobs") ) selectNavi("all-jobs");
        else if( path.includes("my-jobs") ) selectNavi("my-jobs");
        else if( path.includes("my-task") ) selectNavi("my-task");
        else selectNavi("home")



    }, [location?.pathname] )

    return (
        <>
            <Nav />
            <div className='flex-grow flex gap-4' >
                <div className='flex-col min-w-[10rem] gap-4 px-4 hidden md:flex' >
                    <div className={ "p-2 rounded-[.5rem] " + (navi === "home"? "active-navi": "") } onClick={ () => navigate('/') } >Home</div>
                    <div className={ "p-2 rounded-[.5rem] " + (navi === 'add-job' ? 'active-navi': '') } onClick={ () => navigate('/add-job')  } >Add Job</div>
                    <div className={ "p-2 rounded-[.5rem] " + (navi === 'all-jobs' ? 'active-navi': '') } onClick={ () => navigate('/all-jobs')  } >All Jobs</div>
                    <div className={ "p-2 rounded-[.5rem] " + (navi === 'my-jobs' ? 'active-navi': '') } onClick={ () => navigate('/my-jobs') } >My Jobs</div>
                    <div className={ "p-2 rounded-[.5rem] " + (navi === 'my-task' ? 'active-navi': '') } onClick={ () => navigate('/my-task') } >My Tasks</div>
                </div>
                <Outlet />
            </div>
            <Footer />
        </>
    );
};


