import React from 'react'
import PixelDisplay from './PixelDisplay'
import { PixelImage } from '../PixelLogicInterfaces'
import { Material, ToolType } from '../constants'

export type ToolGridData = {
    [material in Material]: {
        [toolType in ToolType]: PixelImage | undefined
    }
}

//const blank = blankPixelImage()
export const initTools: ToolGridData = {
    wooden: {sword: undefined, pickaxe: undefined, shovel: undefined, axe: undefined, hoe: undefined},
    stone: {sword: undefined, pickaxe: undefined, shovel: undefined, axe: undefined, hoe: undefined},
    iron: {sword: undefined, pickaxe: undefined, shovel: undefined, axe: undefined, hoe: undefined},
    golden: {sword: undefined, pickaxe: undefined, shovel: undefined, axe: undefined, hoe: undefined},
    diamond: {sword: undefined, pickaxe: undefined, shovel: undefined, axe: undefined, hoe: undefined},
}
// TODO oh fuck no ^

interface ToolGridProps {
    tools: ToolGridData
    setCurrentTool: (image: PixelImage | undefined) => void
}

export default function ToolGrid({tools, setCurrentTool}: ToolGridProps) {
    return <>
        <table style={{width: 100}}>
        <tbody>
        {Object.values(tools).map((toolMaterialRow, r) =>
            <tr key={r}>
            {Object.values(toolMaterialRow).map((tool, c) =>
                <td key={c} style={{padding: 8}}>
                    <ToolSpace imageData={tool} onClick={() => setCurrentTool(tool)}/>
                </td>
            )}
            </tr>
        )}
        </tbody>
        </table>
    </>
}

interface ToolSpace {
    imageData: PixelImage | undefined
    onClick?: () => void
}

function ToolSpace({imageData, onClick}: ToolSpace) {
    return <>
        {/* <div style={{width: 100, height: 100, backgroundColor: 'red'}}/> */}
        <PixelDisplay {...{imageData, onClick}} style={{width: 50, height: 50}}/>
    </>
}