import { Facing, Point, Color, Edge, DrawEdge } from "./PixelLogicInterfaces"

export function getEdges(data: Color[][]) {
    let startIndex = findStartIndex(data)
    let moving: Facing = {x: 1, y: 0}
    let current: Point = {...startIndex}

    let currentEdgeStart: Point = {...current}
    let facing: Facing = {x: 0, y: -1}

    let edges: Edge[] = []

    function newEdge(type: string) {
        edges.push({
            start: currentEdgeStart,
            end: {...current},
            normalFacing: facing,
            moving,
            type
        })
    }

    while(true) {
        let blockingPos = getBlockingPos(data, current, moving, facing)
        if(blockingPos) {
            newEdge('blocking')

            let justMoving = {...moving}
            moving = {...facing}
            facing = invertFacing(justMoving)
            current = blockingPos
            currentEdgeStart = {...current}
        } else if(!isValid(data[current.x + moving.x][current.y + moving.y])) {
            newEdge('outturn')

            let justMoving = {...moving}
            moving = invertFacing(facing)
            facing = {...justMoving}
            currentEdgeStart = {...current}
        } else {
            current.x += moving.x
            current.y += moving.y
        }

        if(startIndex.x === current.x && startIndex.y === current.y && facing.x === 0 && facing.y === -1) {
            break
        }
    }

    return edges
}

function findStartIndex(data: Color[][]): Point {
    for(let y = 0; y < 32; y++) {
        for(let x = 0; x < 32; x++) {
            if(isValid(data[x][y])) return {x, y}
        }
    }
    throw Error('no start index')
}

function getBlockingPos(data: Color[][], current: Point, moving: Facing, facing: Facing) {
    let ahead: Point = {
        x: current.x + moving.x + facing.x,
        y: current.y + moving.y + facing.y
    }
    return isValid(data[ahead.x][ahead.y]) ? ahead : null
}

function invertFacing(facing: Facing): Facing {
    return {
        x: -facing.x,
        y: -facing.y
    }
}

function isValid(c: Color) {
    return c && (c.alpha) > 0
}

export function toDrawEdge(edge: Edge) {
    let newEdge: DrawEdge = {
        start: {...edge.start},
        end: {...edge.end},
        normalFacing: {...edge.normalFacing}
    }

    if((edge.normalFacing.y === 1 && edge.moving.x === -1) || edge.normalFacing.x === 1) {
        newEdge.start.x += 1
    }
    if((edge.normalFacing.x === 1 && edge.moving.y === 1) || edge.normalFacing.y === 1) {
        newEdge.end.y += 1
    }
    if((edge.normalFacing.x === -1 && edge.moving.y === -1) || edge.normalFacing.y === 1) {
        newEdge.start.y += 1
    }
    if((edge.normalFacing.y === -1 && edge.moving.x === 1) || edge.normalFacing.x === 1) {
        newEdge.end.x += 1
    }

    newEdge.start.x /= 2
    newEdge.start.y /= 2
    newEdge.end.x /= 2
    newEdge.end.y /= 2
    
    return newEdge
}

export function getTrimmedData(data: Color[][], edges: Edge[]) {
    let clonedData: Color[][] = JSON.parse(JSON.stringify(data))
    edges.forEach(edge => {
        forAllWithin(edge, (x, y) => {
            clonedData[x][y] = {
                red: 0, green: 0, blue: 0, alpha: 0
            }
        })
    })

    return clonedData
}

function forAllWithin(edge: Edge, callback: (x: number, y: number) => void) {
    let minX = Math.min(edge.start.x, edge.end.x)
    let maxX = Math.max(edge.start.x, edge.end.x)
    let minY = Math.min(edge.start.y, edge.end.y)
    let maxY = Math.max(edge.start.y, edge.end.y)

    for(let x = minX; x <= maxX; x++) {
        for(let y = minY; y <= maxY; y++) {
            callback(x, y)
        }
    }
}