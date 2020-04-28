import React from 'react'
import { toPolyLine } from '../functions'
import { Color, DrawEdge } from '../PixelLogic'

interface Props {
    imageData: Color[][]
    toggleDepth: (x: number, y: number) => void
    edges: DrawEdge[]
    setEdges: (edges: DrawEdge[]) => void
}

export default function PixelEditor(props: Props) {
    const edgesToDraw = props.edges

    const pixelSize = 32
    
    const cellSize = 100 / pixelSize
    const cellSizeNoSeams = cellSize * 1.04

    const Pixel = ({cell, x, y}: {cell: Color, x: number, y: number}) => {
        const depth = cell.depth ? 1 : 0

        const xPos = x * cellSize
        const yPos = (100 - y * cellSize) - cellSize

        const drawPixelExtrusions = () => {
            return <>
                <polyline
                    fill={colorToRGB(brighten(cell, -30))}
                    points={toPolyLine([
                        [xPos, yPos],
                        [xPos, yPos + cellSizeNoSeams],
                        [xPos + depth, yPos + cellSizeNoSeams + depth],
                        [xPos + depth, yPos + depth]
                    ])}
                    onClick={() => {
                        props.toggleDepth(x, y)
                    }}
                />
                <polyline
                    fill={colorToRGB(brighten(cell, -20))}
                    points={toPolyLine([
                        [xPos, yPos],
                        [xPos + cellSizeNoSeams, yPos],
                        [xPos + cellSizeNoSeams + depth, yPos + depth],
                        [xPos + depth, yPos + depth]
                    ])}
                    onClick={() => {
                        props.toggleDepth(x, y)
                    }}
                />
            </>
        }
        
        return <>
            <rect x={xPos + depth} y={yPos + depth}
                width={cellSizeNoSeams} height={cellSizeNoSeams}
                onClick={() => {
                    props.toggleDepth(x, y)
                }}
                fill={colorToRGB(cell)}
                // stroke='black'
                // strokeWidth='0.2'
            />

            {depth && drawPixelExtrusions()}
        </>
    }

    function VisualEdge({edge}: {edge: DrawEdge}) {
        const {start, end} = edge
        return <>
            <line x1={start.x * cellSize} y1={100 - start.y * cellSize}
                x2={end.x * cellSize} y2={100 - end.y * cellSize}
                stroke='red'
                strokeWidth='0.3'
            />
        </>
    }

    // const pixels = () => {
    //     if(!props.imageData[0][0]) return
    //     let res = []
    //     for(let x = props.imageData.length - 1; x >= 0; x--) {
    //         for(let y = props.imageData[0].length - 1; y >= 0; y--) {
    //             res.push(drawPixel(props.imageData[x][y], x, y))
    //         }
    //     }
    //     return res
    // }

    return <svg viewBox='0 0 100 100' width='600px'>
        <rect width='100' height='100' fill='none' stroke='black'/>
        {
            props.imageData.map((cols, x) => 
                cols.map((cell, y) => <Pixel key={x + ',' + y} {...{cell, x, y}}/>)
            )
            // pixels()
        }
        {
            edgesToDraw.map((edge, i) => <VisualEdge key={i} edge={edge}/>)
        }
    </svg>
}

function colorToRGB(color: Color) {
    const {red, green, blue, alpha} = color
    return `rgba(${red}, ${green}, ${blue}, ${alpha})`
}

function brighten(color: Color, amt: number): Color {
    return {
        ...color,
        red: color.red + amt,
        green: color.green + amt,
        blue: color.blue + amt
    }
}