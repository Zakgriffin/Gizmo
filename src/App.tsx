import React, { useState } from 'react'
import ToolGrid, { ToolGridData, initTools, Material, ToolType } from './components/ToolGrid'
import PackUpload from './components/PackUpload'
import { PixelImage } from './PixelLogicInterfaces'

export default function App() {
    const [tools, setTools] = useState<ToolGridData>(initTools)

    const setTool = (material: Material, type: ToolType, image: PixelImage) => {
        let newTools: ToolGridData = {...tools}
        newTools[material] = {...newTools[material]}
        newTools[material][type] = image
        setTools(newTools)
    }
    
    return <>
        <ToolGrid {...{tools}}/>
        <PackUpload {...{setTool}}/>
    </>
}