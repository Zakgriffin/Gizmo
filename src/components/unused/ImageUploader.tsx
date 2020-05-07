import React from 'react'
import { Color } from '../../PixelLogicInterfaces'
import { base64ToImage } from '../../PixelLogic'

interface Props {
    setImageData: (newImageData: Color[][]) => void
}

export default function ImageUploader(props: Props) {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return
        const file = e.target.files[0]
        
        base64ToImage(URL.createObjectURL(file)).then(props.setImageData)
    }

    return <>
        <input
            type='file'
            onChange={handleImageUpload}
        />
    </>
}