import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { createContext } from 'react';
import { auth } from './firebase.config';
import { toast } from 'react-toastify';


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    function LogOut() {
        signOut(auth).then(() => {
            setUser(null);
        }).catch((error) => {
            toast.error( error.message );
        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            // currentUser - accessToken, displayName, email, emailVerified, 
            setLoading(false);
            if(currentUser) setUser(currentUser);
            console.log( 'sub', currentUser );
        })

        return () => {
            unsubscribe();
        }
    }, [])

    const Info = {
        user, setUser, loading, setLoading, LogOut
    }

    return (
        <AuthContext.Provider value={Info} >
            {children}
        </AuthContext.Provider>
    );
};


