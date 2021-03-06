import React from 'react'
import { ToolGridData } from '../PixelLogicInterfaces'
import JSZip from 'jszip'
import { materials, toolTypes } from '../constants'
import { base64ToImage } from '../PixelLogic'


interface PackUploadProps {
    tools: ToolGridData
    setTools: (newTools: ToolGridData) => void
}

type UploadEvent = React.ChangeEvent<HTMLInputElement>

export default function PackUpload({tools, setTools}: PackUploadProps) {
    const handleFileUpload = async (e: UploadEvent) => {
        if(!e.target.files) return
        const file = e.target.files[0]
        let fileName = file.name.split('.zip')[0]
    
        let zip = await JSZip.loadAsync(file)

        const itemPath = `${fileName}/assets/minecraft/textures/item`

        let newTools: ToolGridData = {...tools}
        
        for(let material of materials) {
            for(let toolType of toolTypes) {
                let textureFile = zip.files[`${itemPath}s/${material}_${toolType}.png`]
                textureFile = textureFile ?? zip.files[`${itemPath}/${material}_${toolType}.png`]
                if(!textureFile) continue
                let fileData = await textureFile.async('base64')
                let image = await base64ToImage('data:image/png;base64,' + fileData)
                
                newTools[material][toolType] = {...newTools[material][toolType]}
                newTools[material][toolType].texture.pixelImage = image
            }
        }
        setTools(newTools)
    }

    return <input
        type='file'
        onChange={handleFileUpload}
    />
}