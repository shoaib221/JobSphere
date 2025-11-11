import { updateProfile } from "firebase/auth";
import { auth } from './firebase.config';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./context";
import { Loading } from "../miscel/Loading";
import { NotFound } from "../miscel/NotFound";
import { Navigate, useLocation } from "react-router-dom";
import { Grid, Phone } from "lucide-react";
import { toast } from "react-toastify";
import { PrivateRoute } from "./auth";
import { DownWindowContext } from '../Nav/context'


export const UpdateProfile = () => {
    const { user, loading, setUser } = useContext(AuthContext);
    const location = useLocation();
    const [name, setName] = useState("");
    const [photo, setPhoto] = useState("");
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const { DownWindow } = useContext(DownWindowContext);

    useEffect(() => {
        if (!user) return;
        //console.log(user)
        setName(user.displayName);
        setPhoto(user.photoURL);
        setNumber(user.phoneNumber);
        setEmail(1)
    }, [user])




    function Update() {

        const updation = { displayName: name, photoURL: photo, phoneNumber: number }
        //console.log(updation)

        updateProfile(auth.currentUser, updation).then(() => {
            toast.success('Profile Updated Succefully')
            //console.log( auth )
        }).catch((error) => {
            toast.error(error.message)
        });
    }


    return (
        <PrivateRoute>
            <div style={{ flexGrow: '1', position: 'relative' }} className="cen-ver" >
                <div className="box-1 h-full w-full max-w-[600px] max-h-[800px]" >
                    <div id='profile-head'  >
                        <div id='profile-photo' style={{ backgroundImage: `url(${user?.photoURL})` }} ></div>
                        <div className="cen-ver" >
                            <span className="text-2xl font-bold" >{user?.displayName}</span>
                            <span> {user?.email} </span>
                        </div>
                    </div>
                    <br />

                    <div className="grid grid-cols-[1fr_3fr] gap-4" >
                        <div className="flex justify-end items-center font-bold" >Name</div>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your Name" />
                        <div className="flex justify-end items-center font-bold" >Photo URL</div>
                        <input type="text" value={photo} onChange={(e) => setPhoto(e.target.value)} placeholder="Your Photo Link" />
                    </div>
                    <br />
                    <button onClick={Update} className="button-1"  >Update</button>
                </div>

                <div className='absolute hidden z-1 h-[100%] w[100%] bg-[var(--color1)]  flex-col items-center top-0 left-0 p-4 gap-4' id="down-1" >
                    <div onClick={() => DownWindow("/")} className='style1'  >Home</div>
                    <div onClick={() => DownWindow("/add-job")} className='style1' >Add Job</div>
                    <div onClick={() => DownWindow("/all-jobs")} className='style1' >All Jobs</div>
                    <div onClick={() => DownWindow("/my-jobs")} className='style1' >My Jobs</div>
                    <div onClick={() => DownWindow("/my-task")} className='style1' >My Tasks</div>
                </div>

            </div>
        </PrivateRoute>
    )
}

// displayName, email, emailVerified,
// metadata, phoneNumber, photoURL

