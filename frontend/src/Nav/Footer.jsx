import React from 'react';
import { RiTwitterXFill } from "react-icons/ri";
import { FaLinkedin, FaFacebook } from "react-icons/fa";



export const Footer = () => {

    return (
        <div id='footer' className='px-8' >
            <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                <div className='cen-hor' >
                    <img src='/logo1.jpg' style={{ height: '2rem' }} />
                    <span style={{ color: 'var(--color2)', fontWeight: '600' }} >SkillUp</span>
                </div>

                <div>
                    <div>Social Links</div>
                    <div  style={{ display: 'flex', gap: '1rem', fontSize: '1.5rem', marginTop: '1rem' }} >
                        <RiTwitterXFill />
                        <FaLinkedin />
                        <FaFacebook />
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1rem' }} >
                Copyright © 2025 - All right reserved
            </div>
        </div>
    );
};