import React, { useContext } from 'react';

import { useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import { PrivateRoute } from '../auth/auth';
import { DownWindowContext } from '../Nav/context';
import { AuthContext } from '../auth/context';

export const AddJob = () => {
    const { axiosInstance }  = useContext(AuthContext)
    const [title, setTitle] = useState("");
    const [photo, setPhoto] = useState("");
    const [summary, setSummary] = useState("");
    const [category, setCategory] = useState([]);
    const [selected, setSelected] = useState("");
    const { DownWindow, DownWindowTag } = useContext(DownWindowContext)


    function handleSubmit(event) {
        event.preventDefault();
    }

    function handleCategory(event) {
        event.preventDefault();
        setSelected(event.target.value)
    }

    function AddJob(event) {
        event.preventDefault();
        if (!title || !photo || !summary || !selected) {
            toast.error("Fill all the fields")
            return
        }


        axiosInstance.post("/product/add-job", {
            title, photo, summary, selected
        }).then(res => {
            setTitle("");
            setPhoto("");
            setSummary("");
            setCategory("")
            setSelected("");
            toast.success("Job created");
        })
            .catch(err => toast.error(err.response.data.error));
    }


    useEffect(() => {
        // Example API — replace this with your own
        axiosInstance.get('/product/category')
            .then((data) => {
                // Assuming each item has 'id' and 'name'
                setCategory(data.data?.result);
                //console.log(data.data?.result)
            })
            .catch((err) => {
                //console.error("Error fetching data:", err)
            });
    }, [axiosInstance]);

    return (
        <PrivateRoute>
            <div className='flex-grow cen-ver relative' >
                <form className='w-full max-w-[30rem] shadow_101_1 m-4 p-4 box-1' >
                    <div className='text-2xl font-bold text-center' >Add a job</div>
                    <br />
                    <fieldset className='grid grid-cols-[1fr_2fr] gap-2' >
                        <label className='flex justify-end items-center font-bold' >Title</label>
                        <input type='text' name='email' placeholder='Type title'
                            value={title} onChange={(e) => setTitle(e.target.value)}
                        />

                        <label className='flex justify-end items-center font-bold' >Photo URL</label>
                        <input type='text' name='email' placeholder='Cover Image URL'
                            value={photo} onChange={(e) => setPhoto(e.target.value)}
                        />

                        <label className='flex justify-end items-center font-bold' >Category</label>
                        <select
                            id="user-select"
                            value={selected}
                            onChange={handleCategory}
                            className="rounded p-2 w-full bg-[var(--color1)] text-[var(--color2)]"
                        >
                            <option value="">-- Choose one --</option>
                            {category && category.map((user) => (
                                <option key={user._id} value={user.name}>
                                    {user.name}
                                </option>
                            ))}
                        </select>

                        <label className='flex justify-end items-center font-bold' >Summary</label>
                        <textarea
                            id="message"
                            value={summary}
                            onChange={(e) => setSummary(e.target.value)}
                            placeholder="Type Summary"
                            rows="3"
                            className="w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />

                    </fieldset>
                    <br />
                    <button className='button-1' onClick={AddJob} >Submit</button>
                </form>


                <DownWindowTag />

            </div>
        </PrivateRoute>
    );
};

