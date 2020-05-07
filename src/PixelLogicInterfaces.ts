import { Material, ToolType } from './constants'

export interface Color {
    red: number
    green: number
    blue: number
    alpha: number
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

export type MaybeSyncedColor = Color | SyncedColor
export type SomeSyncedPixelImage = MaybeSyncedColor[][]

export type PixelImage = Color[][]

export type ToolGridData = {
    [material in Material]: {
        [toolType in ToolType]: ToolData
    }
}

type DepthMap = number[][]

export interface Texture {
    pixelImage: SomeSyncedPixelImage
    depthMap?: DepthMap
} 

export type MaterialPalettes = {
    [material in Material]: MaterialPalette
}

export type SyncedColor = number

export interface ToolData {
    texture: Texture
    materialPalette: MaterialPalette
}

export type MaterialPalette = Color[]