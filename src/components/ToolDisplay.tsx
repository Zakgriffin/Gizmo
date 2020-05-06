import React, { useState, useEffect } from 'react'
import { ToolData, PixelImage, Color } from '../PixelLogicInterfaces'
import PixelDisplay from './PixelDisplay'
import { EventListeners } from '../App'
import { isSyncedColor } from '../PixelLogic'

interface ToolDisplayProps {
    toolData?: ToolData
    listeners?: EventListeners
    style?: object
}

export default function ToolDisplay({toolData, listeners, style}: ToolDisplayProps) {
    const [imageData, setImageData] = useState<PixelImage>()

    useEffect(() => {
        if(!toolData) return
        let newImageData: PixelImage
        if(!imageData) {
            newImageData = toolData.texture.pixelImage as PixelImage
        } else {
            newImageData = [...imageData]
        }

        if(!imageData) return
        for(let x = 0; x < 32; x++) {
            for(let y = 0; y < 32; y++) {
                let pixel = toolData.texture.pixelImage[x][y]
                if(isSyncedColor(pixel)) {
                    imageData[x][y] = toolData.materialPalette[pixel as number]
                } else {
                    imageData[x][y] = pixel as Color
                }
            }
        }
    }, [imageData, toolData])

    return <>
        {/* <div style={{width: 100, height: 100, backgroundColor: 'red'}}/> */}
        <PixelDisplay {...{imageData, style, ...listeners}}/>
    </>
}