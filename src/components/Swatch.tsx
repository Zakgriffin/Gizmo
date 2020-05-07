import React from 'react'
import { EventListeners } from '../App'

interface SwatchProps {
    color: string
    listeners?: EventListeners
}

export default function Swatch({color, listeners}: SwatchProps) {
    return <div style={{width: 20, height: 20, border: 'gray 1px solid', backgroundColor: color}} {...listeners}>
    </div>
}