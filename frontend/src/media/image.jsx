import {  useState } from "react";
import { useAuthContext } from "../auth/context";
import { FaRegSmile } from "react-icons/fa";


export const useMyImage = ({ url }) => {

    const {  axiosInstance } = useAuthContext();
    const [photo, setPhoto] = useState(url);
    const [imageFile, setImageFile] = useState(null);


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

                const res = await axiosInstance.post(
                    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_Imagebb}`,
                    formData
                );

                const imageUrl = res.data.data.display_url;
                setPhoto(imageUrl);
                return imageUrl;
                
            }

            return null;
            
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
            <div className="bg-cover bg-center h-60 w-full relative rounded-xl"
                style={{ backgroundImage: `url(${photo})` }} >

                <div className="rounded-full  absolute -bottom-5 right-[45%] cursor-pointer" >
                    <button className="button-1" >Update Image</button>
                    <input type="file" onChange={imageChange} className="opacity-0 absolute inset-0 h-full w-full" />
                </div>
            </div>
        )
    }



    return {  PhotoTag: Tag, uploadPhoto: Upload }


}