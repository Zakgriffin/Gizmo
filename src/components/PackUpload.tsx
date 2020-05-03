import React from 'react'
import JSZip from 'jszip'
import {materials, toolTypes} from '../constants'
import { canvasImageDataToRGBA, dataToImage, b64toBlob } from '../PixelLogic'

export default function PackUpload() {
    return <input
        type='file'
        onChange={loadZIP}
    />
}

function loadZIP(e: React.ChangeEvent<HTMLInputElement>) {
    if(!e.target.files) return
    const file = e.target.files[0]
    let fileName = file.name.split('.zip')[0]

    const itemPath = `${fileName}/assets/minecraft/textures/items`

    let images = []
    JSZip.loadAsync(file).then(zip => {
        for(let material of materials) {
            for(let toolType of toolTypes) {
                let textureFile = zip.files[`${itemPath}/${material}_${toolType}.png`]
                if(!textureFile) continue
                textureFile.async('base64').then(fileData => {
                    dataToImage('data:image/png;base64,' + fileData).then(image => {
                        
                    })
                })
            }
        }
    })
}