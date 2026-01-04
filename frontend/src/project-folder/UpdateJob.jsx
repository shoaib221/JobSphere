import { useEffect, useState } from "react";
import { useAuthContext } from "../auth/context";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMyImage } from "../media/image";

export const UpdateDetail = ({ job }) => {

    const { axiosInstance } = useAuthContext();
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    const { PhotoTag, uploadPhoto } = useMyImage({ url: job.coverImage });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            title: job.title,
            summary: job.summary,
            category: job.category
        },
    });

    const onSubmit = async (data) => {
        try {
            let res = await axiosInstance.post("/product/add-job", data);
            console.log(res.data)
            reset();
            toast.success("Succesfully Added")
        } catch (err) {
            console.log(err.message)
        }
    };

    function DeleteJob() {
        axiosInstance.delete(`/product/job/${job._id}`).then(res => {
            toast.info("Job Deleted");
            navigate("/");
        }).catch(err => toast.error(err.response.data.error));
    }


    useEffect(() => {
        // Example API — replace this with your own
        axiosInstance.get('/product/category')
            .then((data) => {
                // Assuming each item has 'id' and 'name'
                setCategory(data.data?.result);
                //console.log(data.data?.result)
                reset({ category: job.category })
            })
            .catch((err) => {
                //console.error("Error fetching data:", err)
            });
    }, [axiosInstance]);

    return (
        <div className="max-w-[700px] w-full mx-auto p-6 bg-white shadow-md rounded-lg">

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                <PhotoTag />
                {/* Name */}

                <label className="block mb-1 font-semibold">
                    <div className="font-bold" >Title</div>
                    <input
                        type="text"
                        {...register("title", { required: "Name is required" })}
                        placeholder='exa. Marketing Manager'
                        className="w-full rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}

                </label>





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

            <div className="w-full border-t-2 my-4 border-gray-300" ></div>

            { job.status === 'done' && <p>Completed by { job.acceptedBy }</p> } 
            { job.status === 'pending' && <p> Being done by { job.acceptedBy } </p> }
            { job.status === 'initial' && <p>Not alloted yet</p> }

        </div>
    );

}
