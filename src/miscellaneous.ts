/**
 * TASK 1: Check if property exists in the object
 */
const checkExist = () => {
    const obj = { name: 'a', age: 1 };
    const exist1 = Object.keys(obj).includes('age')
    const exist2 = obj.hasOwnProperty('age')
    const exist3 = 'age' in obj
    return { exist1, exist2, exist3 };
}

/**
 * TASK 2: Implement object prototype delay
 */
const objPrototypeDelay = () => {
    return 1
}

/**
 * TASK 3: devide to sub arrays and tun it in paralel with 1 sec timeout
 */
const devider = (arr: number[], numberOfElems: number) => {
    const res = []

    let count = 0
    while (arr.length !== count) {
        const subArr = []
        for (let i = count; subArr.length < numberOfElems && arr[i]; i++) {
            subArr.push(arr[i])
            count = count + 1
        }
        res.push(subArr)

    }
    return res
}
// function async delay() {}
// for () {
// 	await delay()
// }
// const promise1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('foo');
//   }, 1000);
// });


/**
 * TASK 4: Sort a given string by number in every word.
 * Example: 'is2 Thi1s T4est 3a' -> 'Thi1s is2 3a T4est'
 */
export function order(words: string): string {
    let orderList: { word: string; orderIndex: any }[] = []

    // extract indexes from words
    const wordList: string[] = words.split(' ')
    wordList.forEach((word: string) => {
        const orderIndex = word.split('').find(_ => !Number.isNaN(parseInt(_)))
        orderList.push({ word, orderIndex })
    })

    // sort by index
    orderList = orderList.sort((a: any, b: any) => a.orderIndex.localeCompare(b.orderIndex));

    // compose string array
    const orderedList: string[] = []
    orderList.forEach(obj => {
        orderedList.push(obj.word)
    })

    return orderedList.join(' ')
}

/**
 * TASK 5: There is an array with some numbers.
 * All numbers are equal except for one. Try to find it
 * Example: findUniq([ 1, 1, 1, 2, 1, 1 ]) === 2
 */
export function findUniq(arr: number[]): any {
    // count number occurrence
    const occurrence: { [key: string]: number } = {}
    for (let i = 0; i < arr.length; i++) {
        occurrence[arr[i]] = occurrence[arr[i]] ? occurrence[arr[i]] + 1 : 1
    }

    // find required that appeared once
    const result = Object.keys(occurrence).find(key => occurrence[key] === 1)
    return (Number(result!));
}

/**
 * TASK 6: Given a list of integers and a single sum value.
 * We should return the first two values (from the left) in order of appearance that add up to form the sum.
 * sumPairs([11, 3, 7, 5],          10)
 *               ^--^       3 + 7 = 10
 * Result: [3, 7]
 */
export function sumPairs(arr: number[], sum: number): number[] | undefined {
    /**
     * O(n^2) algorithm complexity
     * @returns number[] | undefined
     */
    const _firstSolution = () => {
        // generate all possible results
        let possibleResults: number[][] = [], jIndexes: number[] = []
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                let result = arr[i] + arr[j] === sum ? [arr[i], arr[j]] : undefined
                if (result !== undefined && i === j) continue
                if (result !== undefined) {
                    possibleResults.push(result)
                    jIndexes.push(j)
                }
            }
        }

        // check which result has nearest to the left side second param (as required)
        if (possibleResults.length < 1) {
            return undefined
        } else if (possibleResults.length === 1) {
            return possibleResults[0]
        } else {
            const leftNearest = jIndexes.indexOf(Math.min(...jIndexes))
            return possibleResults[leftNearest]
        }
    }

    /**
     * O(n) algorithm complexity
     * @returns number[] | undefined
     */
    const _secondSolution = () => {
        const seen = new Map();
        for (let i = 0; i < arr.length; i++) {
            const complement = sum - arr[i];
            if (seen.has(complement)) {
                return [complement, arr[i]];
            }
            seen.set(arr[i], i);
        }
        return undefined;
    }

    return _secondSolution()
}

/**
 * TASK 7:
 * Result:
 */


// --->   RUN TASKS   <---
checkExist()                        // TASK 1
objPrototypeDelay()                 // TASK 2
devider([1, 2, 3, 4, 5], 2)         // TASK 3
order("is2 Thi1s T4est 3a")         // TASK 4
findUniq([0, 0, 0.55, 0, 0])        // TASK 5
sumPairs([10, 5, 2, 3, 7, 5], 10);  // TASK 6
