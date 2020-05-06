export function toPolyLine(points: number[][]) {
    let res = ''
    for(let point of points) {
        res += point[0] + ',' + point[1] + ' '
    }
    return res
}

export function arrayToObjectKeys(array: any[], value: any) {
    let result: any = {}
    for(let key of array) {
        result[key] = typeof value === 'function' ? value(key) : value
    }
    return result
}