import React from 'react'
import { Color, Facing, DrawEdge, EdgesPair } from '../PixelLogicInterfaces'
import { getTrimmedData, toDrawEdge, getEdges } from '../PixelLogic'

interface Props {
    imageData: Color[][]
    edgesPair: EdgesPair
}

export default function DownloadModel(props: Props) {
    return <button style={{width: 100}}
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
            downloadFile('model', model)
        }}
    />
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

async function downloadFile(fileName: string, data: object) {
    const json = JSON.stringify(data, null, 2)
    const blob = new Blob([json], {type: 'application/json'})
    const link = document.createElement('a')
    link.href = await URL.createObjectURL(blob)
    link.download = fileName + '.json'
    link.click()
}