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
    let clonedData: Color[][] = JSON.parse(JSON.stringify(data)) // TODO not this, this is balls slow
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

    // for(let x = minX; x <= maxX; x++) {
    //     for(let y = minY; y <= maxY; y++) {
    //         callback(x, y)
    //     }
    // }
    forInBounds(minX, maxX, minY, maxY, callback)
}

interface ErodeOptions {
    areaOfInfluence?: number
    percentToRemain?: number
    carryEdgeColor?: boolean
    randomSurviveChance?: number
    circular?: boolean
}
export function erode(data: Color[][], options?: ErodeOptions) {
    let areaOfInfluence = options?.areaOfInfluence ?? 3
    let percentToRemain = options?.percentToRemain ?? 1
    let carryEdgeColor = options?.carryEdgeColor ?? false
    let randomSurviveChance = options?.randomSurviveChance ?? 0
    let circular = options?.circular ?? false

    let newData: Color[][] = JSON.parse(JSON.stringify(data)) // TODO not this, this is balls slow

    let influenceMask: number[][] = []

    let halfInfluence = Math.ceil((areaOfInfluence - 1) / 2)
    forInSquareBounds(-halfInfluence, halfInfluence, (xi, yi) => {
        if(!circular || Math.sqrt(Math.pow(xi, 2) + Math.pow(yi, 2)) <= halfInfluence) {
            influenceMask.push([xi, yi])
        }
    })
    let neededSurround = influenceMask.length * percentToRemain

    forInSquareBounds(0, data.length - 1, (x, y) => {
        // loop each pixel in data
        if(!isValid(data[x][y])) return // no reason to erode already empty pixel

        let totalSurround = 0
        for(let [xi, yi] of influenceMask) {
            // test if pixel will be eroded with influenceMask
            let xSearch = x + xi, ySearch = y + yi
            if(withinRange(xSearch, ySearch) && isValid(data[xSearch][ySearch])) {
                totalSurround++
            }
        }

        if(totalSurround < neededSurround && Math.random() > randomSurviveChance) {
            //pixel eroded
            if(carryEdgeColor) {
                // for(let [xi, yi] of influenceMask) {
                //     let xSearch = x + xi, ySearch = y + yi
                //     if(withinRange(xSearch, ySearch) && isValid(newData[xSearch][ySearch])) {
                //         newData[xSearch][ySearch] = {...data[x][y]}
                //     }
                // }
            }

            newData[x][y] = {
                red: 0, green: 0, blue: 0, alpha: 0
            }
        }
    })

    return newData
}

type PointCallback = (x: number, y: number) => void

function forInSquareBounds(min: number, max: number, callback: PointCallback) {
    forInBounds(min, max, min, max, callback)
}

function forInBounds(minX: number, maxX: number, minY: number, maxY: number, callback: PointCallback) {
    for(let x = minX; x <= maxX; x++) {
        for(let y = minY; y <= maxY; y++) {
            callback(x, y)
        }
    }
}

function withinRange(x: number, y: number) {
    return x >= 0 && x < 32 && y >= 0 && y < 32
}