import React, { useRef, useEffect } from 'react'
import { PixelImage, Color } from '../PixelLogicInterfaces'

export default function PixelDisplay2({imageData, style}: {imageData: PixelImage | undefined, style: object}) {

    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if(!canvas) return
        canvas.width = 32 * 5
        canvas.height = 32 * 5
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if(!canvas) return
        const ctx = canvas.getContext('2d')
        if(!ctx || !imageData) return

        const pixelSize = canvas.width / 32
        for(let x = 0; x < imageData.length; x++) {
            for(let y = 0; y < imageData.length; y++) {
                ctx.fillStyle = colorToRGB(imageData[x][y])
                ctx.fillRect(x * pixelSize, (32 - y - 1) * pixelSize, pixelSize, pixelSize)
            }
        }
    }, [imageData])

    return <>
        <canvas ref={canvasRef} style={{...style, outline: '1px gray solid'}}/>
    </>
}

function colorToRGB(color: Color) {
    const {red, green, blue, alpha} = color
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}