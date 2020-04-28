import React from 'react'
import { Color, Facing, DrawEdge } from '../PixelLogic'

interface Props {
    imageData: Color[][]
    edges: DrawEdge[]
}

export default function DownloadModel(props: Props) {
    return <button style={{width: 100}}
        onClick={() => {
            let model = {
                textures: {
                    pick: 'item/pick'
                },
                elements: edgesToModel(props.edges)
            }
            downloadFile('model', model)
        }}
    />
}

function edgesToModel(edges: DrawEdge[]) {
    return edges.map(edge => {
        return {
            from: [edge.start.x, edge.start.y, 0],
            to: [edge.end.x, edge.end.y, 1],
            faces: {
                [normalToFace(edge.normalFacing)]: {
                    uv: [edge.start.x, 16-edge.start.y, edge.end.x, 16-edge.end.y],
                    texture: '#pick'
                }
            }
        }
    })
}

function normalToFace(normal: Facing): string {
    console.log(normal)
    if(normal.x === 1) return 'west'
    if(normal.x === -1) return 'east'
    if(normal.y === 1) return 'down'
    if(normal.y === -1) return 'up'
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