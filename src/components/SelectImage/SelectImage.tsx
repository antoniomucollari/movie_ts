import {type ChangeEvent, useState} from "react";
import './SelectImage.module.css'
export default function SelectImage(props:SelectImgProps){
    const [imageBase64,setImageBase64] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>(props.imgUrl ? props.imgUrl : '');
    function handleOnChange(e:ChangeEvent<HTMLInputElement>){
        if(e.currentTarget.files){
            const file = e.currentTarget.files[0];
            toBase64(file).then(value => setImageBase64(value))
                .catch(err => console.error(err));

            props.selectedImage(file)
            setImageUrl('')
        }
    }
    function toBase64(file:File){
        return new Promise<string>((resolve,reject)=>{
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = ()=>resolve(reader.result as string);
            reader.onerror = err => reject(err);
        })
    }
    return (
        <div className="form-group">
            <label htmlFor="image">Select Image</label>
            <div>
                <input type="file" accept=".jpg,.png,.jpeg" onChange={handleOnChange} />
            </div>
            {imageBase64 ?<div>
                <img src={imageBase64} alt="selected image"/>
            </div>: undefined}

            {imageUrl ?<div>
                <img src={imageUrl} alt="selected image"/>
            </div>: undefined}
        </div>
    )
}

interface SelectImgProps {
    selectedImage: (file: File) => void;
    imgUrl?: string;
}