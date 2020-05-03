import React, { useState } from 'react'
import PixelDisplay from './PixelDisplay'
import { PixelImage, blankPixelImage } from '../PixelLogic'

type Material = 'wooden' | 'stone' | 'iron' | 'golden' | 'diamond'
type ToolType = 'axe' | 'pickaxe' | 'shovel' | 'hoe' | 'sword'

type ToolGridData = {
    [material in Material]: {
        [toolType in ToolType]: PixelImage
    }
}

const blank = blankPixelImage()
const initTools: ToolGridData = {
    wooden: {axe: blank, pickaxe: blank, shovel: blank, hoe: blank, sword: blank},
    stone: {axe: blank, pickaxe: blank, shovel: blank, hoe: blank, sword: blank},
    iron: {axe: blank, pickaxe: blank, shovel: blank, hoe: blank, sword: blank},
    golden: {axe: blank, pickaxe: blank, shovel: blank, hoe: blank, sword: blank},
    diamond: {axe: blank, pickaxe: blank, shovel: blank, hoe: blank, sword: blank},
}
// TODO oh fuck no ^

export default function ToolGrid() {
    const [tools, setTools] = useState<ToolGridData>(initTools)

    const setTool = (material: Material, type: ToolType, image: PixelImage) => {
        let newTools: ToolGridData = JSON.parse(JSON.stringify(tools)) // TODO not this, this is balls slow
        newTools[material][type] = image
        setTools(newTools)
    }

    return <>
        <table style={{width: 100}}>
        <tbody>
        {Object.values(tools).map((toolMaterial, r) =>
            <tr key={r}>
            {Object.values(toolMaterial).map((tool, c) =>
                <td key={c} style={{padding: 8}}>
                    <ToolSpace imageData={tool}/>
                </td>
            )}
            </tr>
        )}
        </tbody>
        </table>
    </>
}

function ToolSpace({imageData}: {imageData: PixelImage}) {
    return <>
        {/* <div style={{width: 100, height: 100, backgroundColor: 'red'}}/> */}
        <PixelDisplay imageData={imageData} style={{width: 50, height: 50}}/>
    </>
}