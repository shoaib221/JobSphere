// src/hooks/useAxios.js
import axios from "axios";
import { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "../auth/context";
import { config } from "localforage";
import { useNavigate } from "react-router-dom";

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

export const useAxios = () => {
    // const baseURL = "https://express-practice-chi.vercel.app";

    const { user, LogOut } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;

        // console.log("Setting up interceptors...");

        // ✅ Request interceptor
        const requestInterceptor = instance.interceptors.request.use(
            (config) => {
                if (user?.accessToken) {
                    config.headers.authorization = `Bearer ${user.accessToken}`;
                    // console.log("Added token:", user.accessToken);
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        // ✅ Response interceptor
        const responseInterceptor = instance.interceptors.response.use(
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

        // ✅ Cleanup: remove interceptors when component unmounts or user changes
        return () => {
            instance.interceptors.request.eject(requestInterceptor);
            instance.interceptors.response.eject(responseInterceptor);
            console.log("Interceptors cleaned up");
        };
    }, [user, LogOut, navigate]);


    return { axiosInstance: instance, axiosAPI: api };
};


