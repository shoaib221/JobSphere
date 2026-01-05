import {  useState } from "react";
import { useAuthContext } from "../auth/context";
import { FaRegSmile } from "react-icons/fa";
import { GrUploadOption } from "react-icons/gr";
import axios from "axios";



export const useMyImage = ({ url  }) => {

    const {  axiosInstance } = useAuthContext();
    const [photo, setPhoto] = useState(url);
    const [imageFile, setImageFile] = useState(null);

    function resetPhoto () {
        setImageFile(null)
        setPhoto( null );
    }


    async function Upload() {
        try {
            

            if (imageFile) {
                // Convert file to base64
                const base64Img = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64 = reader.result.replace(/^data:.+;base64,/, "");
                        resolve(base64);
                    };
                    reader.onerror = reject;
                    reader.readAsDataURL(imageFile);
                });

                // Upload to imgbb
                const formData = new FormData();
                formData.append("image", base64Img);

                const res = await axios.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Imagebb}`,
                    formData
                );

                const imageUrl = res.data.data.display_url;
                setPhoto(imageUrl);
                setImageFile(null);
                console.log("image uploaded to cloud")
                return imageUrl;
                
            }

            return photo;
            
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    const imageChange = (event) => {
        let file = event.target.files[0];

        if (file) {
            setImageFile(file)
            let url = URL.createObjectURL(file)
            setPhoto(url)
        }
    }


    const Tag = () => {
        return (
            <div className="bg-cover bg-center h-60 w-full relative rounded-xl" style={{ backgroundImage: `url(${photo})` }} >

                <div className="absolute rounded-full -bottom-5 right-[45%] bg-(--color1) cursor-pointer cen-ver" >
                    { !photo && <div> Upload a photo </div> }
                    <GrUploadOption className="text-3xl cursor-pointer" />
                    <input type="file" onChange={imageChange} className="opacity-0 absolute cursor-pointer inset-0 h-full w-full" />
                </div>
                
            </div>
        )

        
    }



    return {  PhotoTag: Tag, uploadPhoto: Upload, resetPhoto }


}