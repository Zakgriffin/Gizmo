import React from 'react'
import JSZip from 'jszip'
import {materials, toolTypes} from '../constants'
import { dataToImage } from '../PixelLogic'
import { PixelImage } from '../PixelLogicInterfaces'
import { Material, ToolType } from './ToolGrid'

interface PackUploadProps {
    setTool: (material: Material, type: ToolType, image: PixelImage) => void
}

type UploadEvent = React.ChangeEvent<HTMLInputElement>

export default function PackUpload({setTool}: PackUploadProps) {
    const handleFileUpload = async (e: UploadEvent) => {
        if(!e.target.files) return
        const file = e.target.files[0]
        let fileName = file.name.split('.zip')[0]
    
        let zip = await JSZip.loadAsync(file)

        const itemPath = `${fileName}/assets/minecraft/textures/items`

        for(let material of materials) {
            for(let toolType of toolTypes) {
                let textureFile = zip.files[`${itemPath}/${material}_${toolType}.png`]
                if(!textureFile) continue
                let fileData = await textureFile.async('base64')
                let image = await dataToImage('data:image/png;base64,' + fileData)
                setTool(material as Material, toolType as ToolType, image)
            }
        }
    }

    return <input
        type='file'
        onChange={handleFileUpload}
    />
}

function loadZIP(e: UploadEvent) {

}