import React from 'react'
import ToolDisplay from './ToolDisplay'
import { ToolGridData, ToolData } from '../PixelLogicInterfaces'

interface ToolGridProps {
    tools: ToolGridData
    setCurrentTool: (newTool: ToolData) => void
}

export default function ToolGrid({tools, setCurrentTool}: ToolGridProps) {
    return <>
        <table style={{width: 100}}>
        <tbody>
        {Object.values(tools).map((toolMaterialRow, r) =>
            <tr key={r}>
            {Object.values(toolMaterialRow).map((tool, c) =>
                <td key={c} style={{padding: 8}}>
                    <ToolDisplay toolData={tool} listeners={{onClick: () => setCurrentTool(tool)}}/>
                </td>
            )}
            </tr>
        )}
        </tbody>
        </table>
    </>
}