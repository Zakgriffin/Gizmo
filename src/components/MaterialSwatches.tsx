import React from 'react'
import Swatch from './Swatch'
import { MaterialPalette } from '../PixelLogicInterfaces'
import { colorToRGB } from '../PixelLogic'

interface MaterialSwatchesProps {
    palette: MaterialPalette
    choosingNew: boolean
    setChoosingNew: (choosingNew: boolean) => void
}

export default function MaterialSwatches({palette, choosingNew, setChoosingNew}: MaterialSwatchesProps) {

    return <div style={{width: 80, height: 200, border: 'gray 1px solid'}}>
        {
            palette.map(color => <Swatch color={colorToRGB(color)}/>)
        }
        <Swatch color='gray' listeners={{
            onClick: () => setChoosingNew(!choosingNew)
        }}/>
    </div>
}