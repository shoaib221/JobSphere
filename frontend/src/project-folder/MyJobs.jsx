import React, { useContext, useEffect, useState } from 'react';

import { Job } from './AllJobs.jsx';
import { PrivateRoute } from '../auth/auth.jsx';
import { DownWindowContext } from '../Nav/context.jsx';
import { AuthContext } from '../auth/context.jsx';
import { usePage, PageTag, SearchTag } from '../pagination/usePagination.jsx'

export const MyJobs = () => {

    const { axiosInstance, user } = useContext(AuthContext)
    const { DownWindow, DownWindowTag } = useContext(DownWindowContext)
    const { jobs, Search, searchBy, setSearchBy, searchPattern, setSearchPattern, page, setPage, totalPages, sortOrder, setSortOrder } = usePage({ baseURL: '/product/my-jobs' })



    useEffect(() => {
        if (!user) return;
        Search();

    }, [user, axiosInstance])




    return (
        <PrivateRoute>
            <div className='flex-grow relative' >

                <div className='text-xl font-bold text-center' >
                    My Jobs
                </div>

                <br />

                <SearchTag sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    searchBy={searchBy}
                    setSearchBy={setSearchBy}
                    searchPattern={searchPattern}
                    setSearchPattern={setSearchPattern}
                    Search={Search} />

                <br />

                <div className='grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] lg:grid-cols-[1fr_1fr_1fr] gap-4 flex-grow px-4 overflow-auto p-2' >
                    {jobs && jobs.map(job => <Job key={job._id} job={job} />)}
                </div>

                <PageTag page={page} setPage={setPage} totalPages={totalPages} />

                <DownWindowTag />

            </div>
        </PrivateRoute>
    );
};

