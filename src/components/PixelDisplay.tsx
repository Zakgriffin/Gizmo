import React from 'react'
import { Color } from '../PixelLogicInterfaces'

interface Props {
    imageData: Color[][]
    style: object
}

export default function PixelDisplay(props: Props) {
    const pixelSize = 32
    
    const cellSize = 100 / pixelSize
    const cellSizeNoSeams = cellSize * 1.04

    const Pixel = ({cell, x, y}: {cell: Color, x: number, y: number}) => {
        const depth = cell.depth ? 1 : 0

        const xPos = x * cellSize
        const yPos = (100 - y * cellSize) - cellSize
        
        return <>
            <rect x={xPos + depth} y={yPos + depth}
                width={cellSizeNoSeams} height={cellSizeNoSeams}
                fill={colorToRGB(cell)}
            />
        </>
    }

    return <svg viewBox='0 0 100 100' style={props.style}>
        <rect fill='none' stroke='black' style={{width: '100%'}}/>
        {
            props.imageData.map((cols, x) => 
                cols.map((cell, y) => <Pixel key={x + ',' + y} {...{cell, x, y}}/>)
            )
        }
    </svg>
}

function colorToRGB(color: Color) {
    const {red, green, blue, alpha} = color
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}