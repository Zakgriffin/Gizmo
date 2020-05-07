import React, { useState } from 'react'
import { ToolGridData, ToolData, MaterialPalettes } from './PixelLogicInterfaces'
import ToolGrid from './components/ToolGrid'
import ToolDisplay from './components/ToolDisplay'
import PackUpload from './components/PackUpload'
import { arrayToObjectKeys } from './functions'
import { blankPixelImage } from './PixelLogic'
import { materials, Material, toolTypes } from './constants'
import MaterialSwatches from './components/MaterialSwatches'

export type EventListeners = {[eventName: string]: (event?: React.MouseEvent) => void}

const initMaterialPalettes: MaterialPalettes = arrayToObjectKeys(materials, [])

const blankTool = (material: Material) => ({
    texture: {
        pixelImage: blankPixelImage()
    },
    materialPalette: initMaterialPalettes[material]
})

const initGridData: ToolGridData = arrayToObjectKeys(materials, (material: Material) => 
    arrayToObjectKeys(toolTypes, () => blankTool(material))
)

export default function App() {
    const [tools, setTools] = useState(initGridData)
    // const [materialPalettes, setMaterialPalettes] = useState(initMaterialPalettes)
    const [currentTool, setCurrentTool] = useState<ToolData>(blankTool('diamond'))
    // const [sharedTextures, setSharedTextures] = useState<Texture[]>()

    const [choosingNew, setChoosingNew] = useState(false)
    console.log(choosingNew)

    return <div>
        <div style={{display: 'inline-block'}}>
            <ToolGrid {...{tools, setCurrentTool}}/>
            <PackUpload {...{tools, setTools}}/>
        </div>
        <div style={{display: 'inline-block'}}>
            <ToolDisplay toolData={currentTool} style={{width: 300}} resolutionScale={25} {...{choosingNew}}/>
            <MaterialSwatches palette={currentTool.materialPalette} {...{choosingNew, setChoosingNew}}/>
        </div>
        
    </div>
}

/*

App
    ToolGrid
    TextureEditor
        WorkingTexture
            PixelDisplay
        MaterialSwatches
            Swatch[]
        ErodeStages
            ErodeStage[]
                PixelDisplay
        Swatch
*/