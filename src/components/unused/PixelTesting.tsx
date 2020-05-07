import React, { useState, useEffect } from 'react'
import PixelEditor from './PixelEditor'
import ImageUploader from './ImageUploader'
import DownloadModel from './DownloadModel'
import { getEdges, toDrawEdge } from '../../PixelLogic'
import { Color, EdgesPair } from '../../PixelLogicInterfaces'
import { downloadFolder } from '../../FileHandling'

let initData = [...Array(32)].map(() => Array<Color>(32))
function f(x: number, y: number) {
    initData[x][y] = {red: 0, green: 255, blue: 0, alpha: 1}
}

for(let y = 0; y < 32; y++) {
    for(let x = 0; x < 32; x++) {
        initData[x][y] = {red: 0, green: 0, blue: 0, alpha: 0}
    }
}

f(2, 2)
f(3, 2)
f(4, 2)
f(4, 3)
f(4, 4)
f(4, 5)
f(5, 5)
f(6, 5)
f(4, 6)
f(3, 3)
f(3, 3)

const plainInit = getEdges(initData)
const initEdges = {
    plain: plainInit,
    toDraw: plainInit.map(e => toDrawEdge(e))
}

export default function PixelTesting() {
    let [imageData, setImageData] = useState<Color[][]>(initData)
    let [edgesPair, setEdgesPair] = useState<EdgesPair>(initEdges)

    useEffect(() => {
        let plain = getEdges(imageData)
        setEdgesPair({
            plain,
            toDraw: plain.map(e => toDrawEdge(e))
        })
    }, [imageData])

    const getImageDataCopy = () => {
        return imageData.map(arr => arr.slice())
    }

    const toggleDepth = (x: number, y: number) => {
        let clone = getImageDataCopy()
        // clone[x][y].depth = !clone[x][y].depth
        setImageData(clone)
    }

    return <>
        <PixelEditor setImageData={setImageData} imageData={imageData} toggleDepth={toggleDepth} edgesPair={edgesPair}/>
        <ImageUploader setImageData={setImageData}/>
        <DownloadModel imageData={imageData} edgesPair={edgesPair}/>
        <button
            onClick={downloadFolder}
        >UH</button>
    </>
}