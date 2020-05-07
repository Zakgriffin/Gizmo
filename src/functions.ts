import { useRef, useEffect } from 'react'

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

export function usePrevious<T>(value: T) {
    const ref = useRef<T>();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
}

export function mapNumber(n: number, start1: number, stop1: number, start2: number, stop2: number) {
    return ((n-start1)/(stop1-start1))*(stop2-start2)+start2
}