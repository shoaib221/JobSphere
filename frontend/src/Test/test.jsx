import React, { useContext, useEffect, useState } from 'react';
import { PrivateRoute } from '../auth/auth.jsx';
import { useAxios } from '../axios/axios.jsx'
import { AuthContext } from '../auth/context.jsx';


export const Test = () => {

    const { axiosInstance } = useAxios()
    const [ data, setData ] = useState(null)
    const { user } = useContext(AuthContext)

    useEffect( () => {
        if(!user) return;
        axiosInstance.get( '/test', {
            headers: {
                authorization: `Bearer ${user.accessToken}`
            }
        } ).then( res => console.log(res))
        .catch( err => console.dir(err) )

    }, [user] )

    return (
        <PrivateRoute>
            <div className='flex-grow border' >
                
            </div>
        </PrivateRoute>
    );
};

