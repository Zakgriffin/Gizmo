export interface Color {
    red: number
    green: number
    blue: number
    alpha: number
    depth?: boolean
}

export interface Point {
    x: number
    y: number
}

export interface Facing {
    x: number
    y: number
}

export interface Edge {
    start: Point
    end: Point
    normalFacing: Facing
    moving: Facing
    type: string
}

export interface DrawEdge {
    start: Point
    end: Point
    normalFacing: Facing
}

export interface EdgesPair {
    plain: Edge[]
    toDraw: DrawEdge[]
}

export type PixelImage = Color[][]