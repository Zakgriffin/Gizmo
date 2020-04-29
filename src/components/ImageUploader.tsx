import React from 'react'
import { Color } from '../PixelLogicInterfaces'

interface Props {
    setImageData: (newImageData: Color[][]) => void
}

export default function ImageUploader(props: Props) {
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(!e.target.files) return
        const file = e.target.files[0]
        // create new dummy canvas
        let canvas = document.createElement('canvas')
        canvas.width = 32
        canvas.height = 32
        let ctx = canvas.getContext('2d')
    
        let img = new Image()
        img.onload = () => {
            if(!ctx) return
            ctx.drawImage(img, 0, 0)
            let data = ctx.getImageData(0, 0, 32, 32)
            URL.revokeObjectURL(img.src)

            props.setImageData(canvasImageDataToRGBA(data))
        }
        img.src = URL.createObjectURL(file)
    }

    return <>
        <input
            type='file'
            onChange={handleImageUpload}
        />
    </>
}

function canvasImageDataToRGBA(imageData: ImageData) {
    let dataRGBA = [...Array(32)].map(() => Array<Color>(32))

    let data = imageData.data
    for(let y = 0; y < 32; y++) {
        for(let x = 0; x < 32; x++) {
            let yi = y * 4
            let xi = x * 4
            let current = yi * 32 + xi
            dataRGBA[x][32 - y - 1] = {
                red: data[current],
                green: data[current + 1],
                blue: data[current + 2],
                alpha: data[current + 3]
            }
        }
    }
    return dataRGBA
}