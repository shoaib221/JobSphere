import React, { useContext } from 'react';

import { useState, useEffect } from 'react';

import { toast, ToastContainer } from 'react-toastify';
import { PrivateRoute } from '../auth/auth';
import { DownWindowContext } from '../Nav/context';
import { useAuthContext } from '../auth/context';
import { useForm } from "react-hook-form";



export function AddJob() {
    const { axiosInstance } = useAuthContext()
    const [category, setCategory] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            title: "",
            photo: "",
            summary: "",
            category: ""
        },
    });

    const onSubmit = async (data) => {
        try {
            let res = await axiosInstance.post("/product/add-job", data);
            console.log( res.data )
            reset();
            toast.success("Succesfully Added")
        } catch(err ) {
            console.log(err.message)
        }
    };


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
        <div className="max-w-[700px] w-full mx-auto p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-center">Add New Job</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">


                {/* Name */}
                <div>
                    <label className="block mb-1 font-semibold">Title</label>
                    <input
                        type="text"
                        {...register("title", { required: "Name is required" })}
                        placeholder='exa. Marketing Manager'
                        className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                </div>

                

                {/* Image */}
                <div>
                    <label className="block mb-1 font-semibold">Photo URL</label>
                    <input
                        type="text"
                        placeholder='exa. https://expamle.com/photo.jpg'
                        {...register("photo", { required: "It is a required field" })}
                        className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {errors.photo && (
                        <p className="text-red-500 text-sm mt-1">{errors.photo?.message}</p>
                    )}
                </div>

                {/* Detail */}
                <div>
                    <label className="block mb-1 font-semibold">Summary</label>
                    <textarea
                        {...register("summary", { required: "Detail is required" })}
                        rows={5}
                        className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black resize-none"
                        placeholder='exa. This job is only for college graduates.'
                    />
                    {errors.summary && (
                        <p className="text-red-500 text-sm mt-1">{errors.summary?.message}</p>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Category</label>
                    <select
                        {...register("category", { required: "Category is required" })}
                        className="w-full  rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        <option value="">Select a category</option>
                        {category.map((opt) => (
                            <option key={opt._id} value={opt.name}>
                                {opt.name}
                            </option>
                        ))}
                    </select>
                    {errors.category && (
                        <p className="text-red-500 text-sm mt-1">{errors.category?.message}</p>
                    )}
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="text-white px-4 py-2  block bg-black hover:opacity-80 cursor-pointer mx-auto rounded-lg"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}


