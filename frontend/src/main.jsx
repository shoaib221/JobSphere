
import { createRoot } from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import { NotFound } from './miscel/NotFound.jsx'
import { Auth } from './auth/auth.jsx';
import { AuthProvider } from './auth/context.jsx';
import './Buttons/button.css'
import './Box/box.css'

import { Test } from './Test/test.jsx';
import { UpdateProfile } from './auth/UpdateProfile.jsx';


import { AddJob } from './project-folder/AddJob.jsx';
import { AllJobs } from './project-folder/AllJobs.jsx';
import { JobDetail } from './project-folder/JobDetail.jsx';
import { MyJobs } from './project-folder/MyJobs.jsx';
import { MyTask } from './project-folder/MyTask.jsx';
import { Home } from './project-folder/Home.jsx';
import { Entry } from './project-folder/Entry.jsx';

import { DownWindowProvider } from './Nav/context.jsx';
import { Theme } from './Theme/Theme.jsx';

const App =  () => {


    return (
        
		<BrowserRouter>
            <AuthProvider>
                <DownWindowProvider>
                <ToastContainer />
                <Routes>
                    <Route path='/' element={ <Entry />  } >
                        <Route index element={ <Home /> } />
                        <Route path='auth' element={ <Auth /> } />
                        <Route path='test' element={ <Test />  } />
                        <Route path='profile' element={ <UpdateProfile /> } />
                        <Route path='all-jobs' element={ <AllJobs /> } />
                        <Route path='add-job' element={ <AddJob /> } />
                        <Route path='job-detail/:id' element={ <JobDetail /> } />
                        <Route path='my-jobs' element={ <MyJobs /> } />
                        <Route path='my-task' element={ <MyTask /> } />
                    </Route>
                </Routes>
                </DownWindowProvider>
            </AuthProvider>
        </BrowserRouter>
		
	)
}



createRoot(document.getElementById('root')).render( <App /> );

