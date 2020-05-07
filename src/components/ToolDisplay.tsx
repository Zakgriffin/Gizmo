import React, { useState, useEffect } from 'react'
import { ToolData, PixelImage, Color, SyncedColor } from '../PixelLogicInterfaces'
import PixelDisplay from './PixelDisplay'
import { EventListeners } from '../App'
import { isSyncedColor } from '../PixelLogic'

interface ToolDisplayProps {
    toolData: ToolData
    listeners?: EventListeners
    style?: object
}

export default function ToolDisplay({toolData, listeners, style}: ToolDisplayProps) {
    const [imageData, setImageData] = useState(toolData.texture.pixelImage as PixelImage)

    useEffect(() => {
        const newImageData = [...imageData]

        for(let x = 0; x < 32; x++) {
            for(let y = 0; y < 32; y++) {
                let pixel = toolData.texture.pixelImage[x][y]
                if(isSyncedColor(pixel)) {
                    newImageData[x][y] = toolData.materialPalette[pixel as SyncedColor]
                } else {
                    newImageData[x][y] = pixel as Color
                }
            }
        }

        setImageData(newImageData)
    }, [toolData])

    return <PixelDisplay {...{imageData, style, ...listeners}}/>
}