import React, { useState } from 'react'
import ToolGrid, { ToolGridData, initTools} from './components/ToolGrid'
import PackUpload from './components/PackUpload'
import PixelDisplay from './components/PixelDisplay'
import { PixelImage } from './PixelLogicInterfaces'
import ErodeViewer from './components/ErodeViewer'

export default function App() {
    const [tools, setTools] = useState<ToolGridData>(initTools)
    const [currentTool, setCurrentTool] = useState<PixelImage>()

    return <>
        <ToolGrid {...{tools, setCurrentTool}}/>
        <PackUpload {...{tools, setTools}}/>
        <div>
            <PixelDisplay imageData={currentTool} style={{width: 400}}/>
        </div>
        
        <ErodeViewer currentImage={currentTool}/>
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