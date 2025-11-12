import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { auth } from './firebase.config';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();

// const baseURL = "https://express-practice-chi.vercel.app/";
const baseURL = "http://localhost:4000";

const instance = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json"
    }
});

const api = axios.create({
    baseURL
})


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
    let requestInterceptor=null, responseInterceptor=null;

    function LogOut() {
        signOut(auth).then(() => {
            setUser(null);
        }).catch((error) => {
            toast.error(error.message);
        });
    }

    function SetInterceptor(preUser) {
        requestInterceptor = instance.interceptors.request.use(
            (config) => {
                if (preUser?.accessToken) {
                    config.headers.authorization = `Bearer ${preUser.accessToken}`;
                    // console.log("Added token:", user.accessToken);
                }
                setUser(preUser)
                return config;
            },
            (error) => Promise.reject(error)
        );

        // ✅ Response interceptor
        responseInterceptor = instance.interceptors.response.use(
            (response) => response,
            (error) => {
                // console.log("Interceptor error:", error);

                if (
                    error.response &&
                    (error.response.status === 401 || error.response.status === 403)
                ) {
                    LogOut();
                    navigate("/auth");
                }

                return Promise.reject(error);
            }
        );

        return () => {
            instance.interceptors.request.eject(requestInterceptor);
            instance.interceptors.response.eject(responseInterceptor);
        }
    }

    useEffect(() => {
        let aha = null;
        

        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // currentUser - accessToken, displayName, email, emailVerified, 

            
            if (!currentUser) {
                setLoading(false);
                return
            }

            aha = SetInterceptor(currentUser)

            setUser(currentUser);
            setLoading(false)
        })

        return () => {
            unsubscribe();
            aha();
        }
    }, [])

    const Info = {
        user, setUser, loading, setLoading, LogOut, axiosInstance: instance
    }

    return (
        <AuthContext.Provider value={Info} >
            {children}
        </AuthContext.Provider>
    );
};


