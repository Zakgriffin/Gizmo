export function toPolyLine(points: number[][]) {
    let res = ''
    for(let point of points) {
        res += point[0] + ',' + point[1] + ' '
    }
    return res
}