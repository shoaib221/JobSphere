import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const DownWindowContext = createContext()


export const DownWindowProvider = ({ children }) => {
    const [down1, setDown1] = useState(true)
    const navigate = useNavigate()

    function DownWindow(path) {
        let elem = document.getElementById("down-1");

        if (down1) {
            elem.classList.remove("bar-rev")
            elem.classList.remove("hidden");
            elem.classList.add("flex");
            elem.classList.add('bar');
            setDown1(!down1);
        } else {

            elem.classList.add('bar-rev')

            setDown1(!down1)
            setTimeout(() => {
                elem.classList.add("hidden")
                elem.classList.remove("flex")
                elem.classList.remove('bar')
                navigate(path)
            }, 100)
        }
    }


    const DownWindowTag = () => {

        return (
            <div className='absolute hidden z-2 h-[100%] w[100%] bg-[var(--color1)]  flex-col items-center top-0 left-0 p-4 gap-4' id="down-1" >
                <div onClick={() => DownWindow("/")} className='style1'  >Home</div>
                <div onClick={() => DownWindow("/add-job")} className='style1' >Add Job</div>
                <div onClick={() => DownWindow("/all-jobs")} className='style1' >All Jobs</div>
                <div onClick={() => DownWindow("/my-jobs")} className='style1' >My Jobs</div>
                <div onClick={() => DownWindow("/my-task")} className='style1' >My Tasks</div>
            </div>
        )
    }

    // function handleResize() {
    //     let elem = document.getElementById("down-1")      
    //     if( window.innerWidth > 768 ) {
    //         elem.classList.remove("flex")
    //         elem.classList.add("hidden")
    //     }
    // }

    // useEffect(() => {
    //     window.addEventListener("resize", handleResize);
    //     return () => window.removeEventListener("resize", handleResize);
    // }, [])


    return (
        <DownWindowContext.Provider value={{ down1, setDown1, DownWindow, DownWindowTag }} >
            {children}
        </DownWindowContext.Provider>
    )
}