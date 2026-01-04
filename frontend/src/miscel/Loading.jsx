import React from 'react';

export const Loading = () => {
    return (
        <div style={{ flexGrow: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '3rem', minWidth: '3rem' }} >
            <span className="loading loading-dots loading-xl"></span>
        </div>
        
    );
};


export const LoadingFull = () => {
    return (
        <div className='flex-grow flex justify-center items-center w-full h-full' >
            <span className="loading loading-ring loading-xl">
                <span className="loading loading-ring loading-lg"></span>
            </span>
        </div>
    )
}

