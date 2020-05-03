import React, { useState } from 'react'
import PixelDisplay from './PixelDisplay'
import { blankPixelImage } from '../PixelLogic'
import { PixelImage } from '../PixelLogicInterfaces'

export type Material = 'wooden' | 'stone' | 'iron' | 'golden' | 'diamond'
export type ToolType = 'axe' | 'pickaxe' | 'shovel' | 'hoe' | 'sword'

export type ToolGridData = {
    [material in Material]: {
        [toolType in ToolType]: PixelImage
    }
}

const blank = blankPixelImage()
export const initTools: ToolGridData = {
    wooden: {axe: blank, pickaxe: blank, shovel: blank, hoe: blank, sword: blank},
    stone: {axe: blank, pickaxe: blank, shovel: blank, hoe: blank, sword: blank},
    iron: {axe: blank, pickaxe: blank, shovel: blank, hoe: blank, sword: blank},
    golden: {axe: blank, pickaxe: blank, shovel: blank, hoe: blank, sword: blank},
    diamond: {axe: blank, pickaxe: blank, shovel: blank, hoe: blank, sword: blank},
}
// TODO oh fuck no ^

interface ToolGridProps {
    tools: ToolGridData
}

export default function ToolGrid({tools}: ToolGridProps) {
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