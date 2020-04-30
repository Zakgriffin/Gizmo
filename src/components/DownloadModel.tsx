import React from 'react'
import { Color, Facing, DrawEdge, EdgesPair } from '../PixelLogicInterfaces'
import { getTrimmedData, toDrawEdge, getEdges, forInSquareBounds } from '../PixelLogic'

interface Props {
    imageData: Color[][]
    edgesPair: EdgesPair
}

export default function DownloadModel(props: Props) {
    return <>
        <button style={{width: 100}}
            onClick={() => {
                let trimmed = getTrimmedData(props.imageData, props.edgesPair.plain)
                let inner = getEdges(trimmed).map(e => toDrawEdge(e))
                let model = {
                    textures: {
                        pick: 'item/pick'
                    },
                    elements: [
                        ...edgesToModel(inner, 1),
                        ...edgesToModel(props.edgesPair.toDraw, 0.5)
                    ]
                }
                downloadJSON('model', model)
            }}
        />
        <button style={{width: 100}}
            onClick={() => {
                downloadPNG('ugh', props.imageData)
            }}
        />
    </>
}

interface ModelElement {
    from: number[]
    to: number[]
    faces: {
        [face: string]: {
            uv: number[]
            texture: string
        }
    }
}

function edgesToModel(edges: DrawEdge[], depth: number) {
    let model: ModelElement[] = [
        {
            from: [0, 0, 8 + depth / 2],
            to: [16, 16, 8 + depth / 2],
            faces: {
                south: {
                    uv: [0, 0, 16, 16],
                    texture: '#pick'
                }
            }
        },
        {
            from: [0, 0, 8 - depth / 2],
            to: [16, 16, 8 - depth / 2],
            faces: {
                north: {
                    uv: [16, 0, 0, 16],
                    texture: '#pick'
                }
            }
        }
    ]

    let inners = edges.map(edge => ({
        from: [edge.start.x, edge.start.y, 8 - depth / 2],
        to: [edge.end.x, edge.end.y, 8 + depth / 2],
        faces: {
            [normalToFace(edge.normalFacing)]: {
                uv: [
                    edge.start.x,
                    16 - edge.start.y,
                    edge.end.x - edge.normalFacing.x / 2,
                    16 - edge.end.y + edge.normalFacing.y / 2
                ],
                texture: '#pick'
            }
        }
    }))
    model = model.concat(inners)

    return model
}

function normalToFace(normal: Facing): string {
    console.log(normal)
    if(normal.x === 1) return 'east'
    if(normal.x === -1) return 'east'
    if(normal.y === 1) return 'down'
    if(normal.y === -1) return 'down'
    throw Error('No face to show')
}

function downloadJSON(fileName: string, data: object) {
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], {type: 'application/json'})
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = fileName + '.json'
    link.click()
}

function downloadPNG(fileName: string, data: Color[][]) {
    let size = data.length
    let arr = new Uint8ClampedArray(size * size * 4)
    forInSquareBounds(0, size - 1, (x, y) => {
        let pixel = data[x][y]
        let current = ((size - y - 1) * size + x) * 4
        arr[current] = pixel.red
        arr[current + 1] = pixel.green
        arr[current + 2] = pixel.blue
        arr[current + 3] = pixel.alpha
    })
    
    let canvas = document.createElement('canvas')
    canvas.width = size
    canvas.height = size
    let ctx = canvas.getContext('2d')
    if(!ctx) return

    let imgData = new ImageData(arr, size)
    ctx.putImageData(imgData, 0, 0)
    canvas.toBlob(blob => {
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        link.download = fileName + '.png'
        link.click()
    })
}