import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


export const DownWindowContext = createContext()




export const DownWindowProvider = ({ children }) => {
    const [down1, setDown1] = useState(true)
    const navigate = useNavigate()
    const [ navi, selectNavi ] = useState("home")

    function DownWindow(path) {

        setDown1( !down1 )
        navigate(path || "/")

    }

    useEffect( () => {
        console.log("Location change")
        let path = location.pathname.toLowerCase()

        if( path.includes("add-job") ) selectNavi("add-job");
        else if( path.includes("all-jobs") ) selectNavi("all-jobs");
        else if( path.includes("my-jobs") ) selectNavi("my-jobs");
        else if( path.includes("my-task") ) selectNavi("my-task");
        else if( path.includes("job-detail") || path.includes("auth") ) selectNavi("")
        else selectNavi("home")



    }, [location?.pathname] )


    function handleResize() {
    
        if( window.innerWidth > 768 ) {
            setDown1(true)
        }
    }

    useEffect(() => {
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    const DownWindowTag = () => {


        return (
            
            <div className={`${down1 ? "hidden" : "flex" } absolute z-2 h-[100%] w-[100%] bg-[var(--color1)]  flex-col items-center top-0 left-0 p-4 gap-4`} id="down-1" >
                <div onClick={() => DownWindow("/")} className={ `p-2 rounded-[.5rem] w-full text-center ${navi === "home" && "active-navi" }` }  >Home</div>
                <div onClick={() => DownWindow("/add-job")} className={ `p-2 rounded-[.5rem] w-full text-center ${navi === "add-job" && "active-navi" }` } >Add Job</div>
                <div onClick={() => DownWindow("/all-jobs")} className={ `p-2 rounded-[.5rem] w-full text-center ${navi === "all-jobs" && "active-navi" }` } >All Jobs</div>
                <div onClick={() => DownWindow("/my-jobs")} className={ `p-2 rounded-[.5rem] w-full text-center ${navi === "my-jobs" && "active-navi" }` } >My Jobs</div>
                <div onClick={() => DownWindow("/my-task")} className={ `p-2 rounded-[.5rem] w-full text-center ${navi === "my-task" && "active-navi" }` } >My Tasks</div>
            </div>
        )
    }


    return (
        <DownWindowContext.Provider value={{ down1, setDown1, DownWindow, DownWindowTag, navi }} >
            {children}
        </DownWindowContext.Provider>
    )
}