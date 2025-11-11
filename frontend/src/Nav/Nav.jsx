import React, { useEffect, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGithub } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { SignOut } from '../auth/auth';
import { AuthContext } from '../auth/context';
import './Nav.css';
import { Theme } from '../Theme/Theme.jsx';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { DownWindowContext } from './context.jsx';



export const Nav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user} = useContext(AuthContext);
    const { down1, DownWindow } = useContext(DownWindowContext)
    const [ opener1, setOpener1 ] = useState(false)
    
    //console.log(location)
    

    function handleClick(event, path) {
        event.preventDefault();
        let nav1 = document.getElementById('home-nav');
        let nav2 = document.getElementById('app-nav');
        let nav3 = document.getElementById('install-nav');
        nav1.classList.remove('marked');
        nav2.classList.remove('marked');
        nav3.classList.remove('marked');

        // console.log(event.target , path);
        event.target.classList.add('marked');
        navigate(path);

    }


    function Opener1 () {
        setOpener1( prev => !prev )
    }

    

    return (
        <nav className='flex min-h-[3rem] justify-between m-4 items-center' >
            <div className='h-[3rem]   flex gap-2' >
                <img src='/logo1.jpg' className='h-full' />
                <div className='cen-ver' >App Name</div>
            </div>

            {/* <div onClick={ () => navigate('/') } style={{ cursor: 'pointer' }} className={ `${location.pathname === '/'? 'hilit-1': ''}` } >Home</div> */}

            <div className='flex justify-center items-center md:hidden' onClick={ DownWindow } >
                { down1 ? <FaChevronDown /> :  <FaChevronUp /> }
            </div>

            { user ? 
                <div className='cursor-pointer h-[3rem] w-[3rem] rounded-full relative bg-cover bg-center z-3' title={user.displayName} onClick={Opener1} style={{  backgroundImage: `url(${user.photoURL})` }}  >
                    <div id='opener-1' className={`absolute flex-col bg-[var(--color2)] p-2 rounded-xl w-[10rem] right-[0%] top-[100%] ${opener1 ? "flex" : "hidden" }`} >
                        <div onClick={ ()=> navigate('/profile')} className='button-1' >Profile</div>
                        <Theme />
                        <SignOut />
                    </div>
                </div>
                :
                <button onClick={()=> navigate("/auth")} className='button-2' >
                    Login
                </button>
            }
            
        </nav>
    );
};

