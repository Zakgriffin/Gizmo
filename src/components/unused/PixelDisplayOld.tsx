import React from 'react'
import { Color, PixelImage } from '../../PixelLogicInterfaces'

interface Props {
    imageData: PixelImage
    style?: object
    onClick?: () => void
}

interface PixelProps {
    cell: Color
    x: number
    y: number
}

// interface PixelRowProps {
//     pixelRow: ImageData
//     x: number
// }

export default function PixelDisplay(props: Props) {
    // const pixelSize = 32
    
    // const cellSize = 100 / pixelSize
    // const cellSizeNoSeams = cellSize * 1.04

    // const Pixel = ({cell, x, y}: PixelProps) => {
    //     const depth = cell.depth ? 1 : 0

    //     const xPos = x * cellSize
    //     const yPos = (100 - y * cellSize) - cellSize
        
    //     return <rect x={xPos + depth} y={yPos + depth}
    //         width={cellSizeNoSeams} height={cellSizeNoSeams}
    //         fill={colorToRGB(cell)}
    //     />
    // }

    return <svg viewBox='0 0 100 100' style={props.style} onClick={props.onClick}>
        {/* <rect fill='none' stroke='black' style={{width: '100%', height: '100%'}}/>
        {
            props.imageData?.map((pixelRow, x) => 
                pixelRow.map((cell, y) =>
                    <Pixel key={y} {...{cell, x, y}}/>
                )
            )
        } */}
    </svg>

    // return <table cellSpacing='0' cellPadding='0' style={{position: 'absolute', width: '100%', height: '100%'}}>
    //     <tbody>
    //     {props.imageData.map((pixelRow, x) =>
    //         <tr key={x}>
    //         {pixelRow.map((cell, y) =>
    //             <td key={y} style={{background: 'red', height: '10%', width: '10%'}}>
    //             </td>
    //         )}
    //         </tr>
    //     )}
    //     </tbody>
    // </table>
}


function colorToRGB(color: Color) {
    const {red, green, blue, alpha} = color
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}