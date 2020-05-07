import React from 'react'
import { PixelImage } from './PixelLogicInterfaces'

interface ErodeViewerProps {
    currentImage: PixelImage | undefined
}

export default function ErodeViewer({currentImage}: ErodeViewerProps) {
    // const [erodeStages, setErodeStages] = useState<(PixelImage | undefined)[]>([undefined])

    // useEffect(() => {
    //     setErodeStages(Array(erodeStages.length).fill(currentImage))
    // }, [currentImage, erodeStages.length])

    // const addErodeStage = () => {
    //     setErodeStages([...erodeStages, undefined])
    // }
    // const removeErodeStage = () => {
    //     setErodeStages(erodeStages.slice(1))
    // }
    // const erodeAll = () => {
    //     let first = erodeStages[0]
    //     if(!first) return
    //     let newEroded = [first]

    //     for(let i = 1; i <= erodeStages.length; i++) {
    //         let toErode = newEroded[i - 1]
    //         if(!toErode) break
    //         let eroded = erode(toErode, {
    //             areaOfInfluence: 3,
    //             percentToRemain: 1,
    //             //carryEdgeColor: true,
    //             randomSurviveChance: 0.9,
    //             circular: true
    //         })
    //         newEroded[i] = eroded
    //     }
    //     console.log(newEroded)
    //     setErodeStages(newEroded)
    // }

    return <>
        {/* {
            erodeStages?.map((erodeStage, i) => 
                <PixelDisplay key={i} imageData={erodeStage} style={{border: 'red 1px solid', width: 150}}/>
            )
        }
        <button
            onClick={addErodeStage}
        >Add Erode Stage</button>
        <button
            onClick={removeErodeStage}
        >Remove Erode Stage</button>
        <button
            onClick={erodeAll}
        >Erode ALL</button> */}
    </>
}