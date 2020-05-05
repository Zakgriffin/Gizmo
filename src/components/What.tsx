import React from 'react'

export interface BadThing {
    [a: string]: {[key: string]: number[] | undefined}
}

export default function What({nums, setNums}: {nums: BadThing, setNums: (a: BadThing) => void}) {
//         const [nums, setNums] = useState<BadThing>({
//         a: {z: undefined, x: undefined},
//         b: {z: undefined, x: undefined},
//         c: {z: undefined, x: undefined},
//         d: {z: undefined, x: undefined}
//    })

    return <>
        {
            Object.entries(nums).map(([key2, thing2], i2) =>
                <div key={key2}>
                {
                Object.entries(thing2).map(([key, thing], i) =>
                    <div key={i} style={{backgroundColor: 'red', width: 100, height: 100}} onClick={() => {
                        console.log('test')
                        let newNums = {...nums}
                        newNums[key2][key] = [thing ? thing[0] + 1 : 0]
                        setNums(newNums)
                    }}>{thing}</div>
                )
                }
                </div>
            )
        }
    </>
}