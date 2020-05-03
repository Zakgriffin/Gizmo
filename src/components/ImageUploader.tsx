import React from 'react'
import { Color } from '../PixelLogicInterfaces'
import { canvasImageDataToRGBA, dataToImage } from '../PixelLogic'

interface Props {
    setImageData: (newImageData: Color[][]) => void
}

export default function ImageUploader(props: Props) {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return
        const file = e.target.files[0]
        // // create new dummy canvas
        // let canvas = document.createElement('canvas')
        // canvas.width = 32
        // canvas.height = 32
        // let ctx = canvas.getContext('2d')
    
        // let img = new Image()
        // img.onload = () => {
        //     if(!ctx) return
        //     ctx.drawImage(img, 0, 0)
        //     let data = ctx.getImageData(0, 0, 32, 32)
        //     URL.revokeObjectURL(img.src)

        //     props.setImageData(canvasImageDataToRGBA(data))
        // }
        // img.src = URL.createObjectURL(file)

        dataToImage(URL.createObjectURL(file)).then(props.setImageData)
    }

    return <>
        <input
            type='file'
            onChange={handleImageUpload}
        />
    </>
}