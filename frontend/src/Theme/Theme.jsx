import React, { useContext } from 'react';
import './Theme.css'
import { ThemeContext } from './context';


export const Theme = () => {
    // const { theme, setTheme } = useContext( ThemeContext )


    function toggleTheme () {
        let elem = document.documentElement.getAttribute('color-theme')
        if( elem === "light" )
            document.documentElement.setAttribute( 'color-theme', 'dark' );
        else
            document.documentElement.setAttribute( 'color-theme', 'light' );
    }

    return (
        <button onClick={toggleTheme} className='button-1' >
            Toggle Theme
        </button>
    );
};

