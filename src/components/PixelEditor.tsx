import React from 'react'
import { toPolyLine } from '../functions'
import { Color, DrawEdge, EdgesPair } from '../PixelLogicInterfaces'
import { erode } from '../PixelLogic'

interface Props {
    imageData: Color[][]
    setImageData: (newData: Color[][]) => void
    toggleDepth: (x: number, y: number) => void
    edgesPair: EdgesPair
}

export default function PixelEditor(props: Props) {
    const edgesToDraw = props.edgesPair.toDraw

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
        <circle r='10'
            onClick={() => {
                //const newData = getTrimmedData(props.imageData, props.edgesPair.plain)
                const newData = erode(props.imageData, {
                    circular: true,
                    areaOfInfluence: 3,
                    carryEdgeColor: false,
                    randomSurviveChance: 0.95,
                    percentToRemain: 1
                })
                props.setImageData(newData)
            }}
        />
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