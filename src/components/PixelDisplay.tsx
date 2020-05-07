import React, { useRef, useEffect } from 'react'
import { PixelImage, Color } from '../PixelLogicInterfaces'
import { EventListeners } from '../App'

interface PixelDisplayProps {
    imageData?: PixelImage
    resolutionScale?: number
    listeners?: EventListeners
    style?: object
}

export default function PixelDisplay({imageData, resolutionScale, listeners, style}: PixelDisplayProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const resScale = resolutionScale ?? 5

    useEffect(() => {
        const canvas = canvasRef.current
        if(!canvas) return
        canvas.width = 32 * resScale
        canvas.height = 32 * resScale
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current
        if(!canvas) return
        const ctx = canvas.getContext('2d')
        if(!ctx || !imageData) return

        ctx.fillStyle = 'white'
        ctx.fillRect(0, 0, canvas.width, canvas.height)

        const pixelSize = canvas.width / 32
        for(let x = 0; x < imageData.length; x++) {
            for(let y = 0; y < imageData.length; y++) {
                ctx.fillStyle = colorToRGB(imageData[x][y])
                ctx.fillRect(x * pixelSize, (32 - y - 1) * pixelSize, pixelSize, pixelSize)
            }
        }
    }, [imageData])

    return <>
        <canvas ref={canvasRef} {...listeners} style={{...style, outline: '1px gray solid'}}
            // onMouseMove={e => {
            //     let box = canvasRef.current?.getBoundingClientRect()
            //     if(!box) return
            //     let a = Math.floor(mapNumber(e.clientX, box.left, box.right, 0, 32))
            //     console.log(a)
            // }}
        />
    </>
}

function colorToRGB(color: Color) {
    const {red, green, blue, alpha} = color
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}