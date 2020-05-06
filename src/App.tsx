import React, { useState } from 'react'
import { ToolGridData, ToolData, MaterialPalettes } from './PixelLogicInterfaces'
import ToolGrid from './components/ToolGrid'
import ToolDisplay from './components/ToolDisplay'
import PackUpload from './components/PackUpload'
import { arrayToObjectKeys } from './functions'
import { blankPixelImage } from './PixelLogic'
import { materials, Material, toolTypes } from './constants'

export type EventListeners = {[eventName: string]: (event?: React.MouseEvent) => void}

const initMaterialPalettes: MaterialPalettes = arrayToObjectKeys(materials, [])
console.log(initMaterialPalettes)

const blankTool = (material: Material) => ({
    texture: {
        pixelImage: blankPixelImage()
    },
    materialPalette: initMaterialPalettes[material]
})

const initGridData: ToolGridData = arrayToObjectKeys(materials, (material: Material) => 
    arrayToObjectKeys(toolTypes, blankTool(material))
)

export default function App() {
    const [tools, setTools] = useState(initGridData)
    // const [materialPalettes, setMaterialPalettes] = useState(initMaterialPalettes)
    const [currentTool, setCurrentTool] = useState<ToolData>()
    // const [sharedTextures, setSharedTextures] = useState<Texture[]>()

    return <>
        <ToolGrid {...{tools, setCurrentTool}}/>
        <PackUpload {...{tools, setTools}}/>
        <div>
            <ToolDisplay toolData={currentTool} style={{width: 400}}/>
        </div>
        
        {/* <ErodeViewer currentImage={currentTool}/> */}
    </>
}

/*

App
    ToolGrid
    TextureEditor
        WorkingTexture
            PixelDisplay
        MaterialPalette
            Swatch[]
        ErodeStages
            ErodeStage[]
                PixelDisplay
        Swatch
*/