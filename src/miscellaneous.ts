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
declare global {
    interface Function {
        delay(this: Function, delayTime: number): (...args: any[]) => void;
    }
}
Function.prototype.delay = function (this: Function, delayTime: number): (...args: any[]) => void {
    const originalFunction = this;
    return function (this: any, ...args: any[]) {
        setTimeout(() => {
            originalFunction.apply(this, args);
        }, delayTime);
    };
};
function greet(name: string) {
    return `TASK 2: Hello, ${name}!`;
}
const delayedGreet = greet.delay(1000);

/**
 * TASK 3: devide to sub arrays and tun it in paralel with 1 sec timeout
 */
const devider = <ArrayType>(arr: ArrayType[], numberOfElems: number): ArrayType[][] => {
    /**
     * O(n^2) algorithm complexity
     */
    const _firstSolution = () => {
        const res: ArrayType[][] = []

        let count = 0
        while (arr.length !== count) {
            const subArr: ArrayType[] = []
            for (let i = count; subArr.length < numberOfElems && arr[i]; i++) {
                subArr.push(arr[i])
                count = count + 1
            }
            res.push(subArr)

        }
        return res
    }

    /**
     * O(n) algorithm complexity
     */
    const _secondSolution = () => {
        const splitFiles: ArrayType[][] = []
        for (let i = 0; i < arr.length; i += numberOfElems) {
            splitFiles.push(arr.slice(i, i + numberOfElems));
        }
        return splitFiles
    }

    return _secondSolution()
}



/**
 * TASK 4: Sort a given string by number in every word.
 * Example: 'is2 Thi1s T4est 3a' -> 'Thi1s is2 3a T4est'
 */
export function order(words: string): string {
    const wordList: string[] = words.split(' ')
    const orderList: string[] = new Array(wordList.length)
    wordList.forEach((word: string) => {
        const orderIndex: any = word.split('').find(_ => !Number.isNaN(parseInt(_)))
        orderList[orderIndex - 1] = word
    })
    return orderList.join(' ')
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
 * TASK 7: Assume that <n> people are put into a circle and that they are eliminated in steps of <step> elements
 * n=7, step=3 => means 7 people in a circle one every 3 is eliminated until one remains
 * Example: [1,2,3,4,5,6,7] -> [1,2,4,5,6,7] -> [1,2,4,5,7] -> [1,4,5,7] -> [1,4,5] -> [1,4] -> [4]
 */
export function josephusSurvivor(n: number, step: number) {
    const filled = Array.from({ length: n }, (value, index) => index + 1);

    let index = step - 1
    while (filled.length !== 1) {
        if (filled[index]) {
            filled.splice(index, 1) // remove item
            index = index + step - 1
        } else {
            index = Math.abs(filled.length - index)
        }
    }
    return filled[0]
}

/**
 * TASK 8: We are given an array <arr> of strings and an integer k. 
 * Need to return the first longest string consisting of k consecutive strings taken in the array.
 * Example: longestConsec(["zone", "abigail", "theta", "form", "libe", "zas"], 2) => "abigailtheta"
 */
export function longestConsec(arr: string[], k: number): string {
    const concatenated: string[] = []
    for (let i = 0; i <= arr.length - k; i++) {
        let res = arr[i]
        for (let j = 1; j < k; j++) {
            res = res.concat(arr[i + j])
        }
        concatenated.push(res)
    }

    if (concatenated.length === 0) {
        return ''
    }

    try {
        const calcSizes = concatenated.map((e) => e.length)
        const maxIndex = calcSizes.indexOf(Math.max(...calcSizes))
        return concatenated[maxIndex]
    } catch (error) {
        return ''
    }
}

/**
 * TASK 9: Check if braces have valid structure.
 * Example: "(){}[]" => true, "([{}])" => true, "(}" => false, "[(])" => false
 */
export function validBraces(braces: string): boolean {
    const brSymbols: { [key: string]: string } = {
        '(': ')',
        '[': ']',
        '{': '}',
    }
    const openBraces = Object.keys(brSymbols)
    const closeBraces = Object.values(brSymbols)

    const stack: string[] = []
    for (const brace of braces) {
        if (openBraces.includes(brace)) {
            stack.push(brace);
        } else if (closeBraces.includes(brace)) {
            const last: string | undefined = stack.pop()
            if (!last || brSymbols[last] !== brace) {
                return false
            }
        }
    }

    return stack.length === 0;
}

/**
 * TASK 10: Make an wave array 
 * Example: word => ["Word", "wOrd", "woRd", "worD"]
 */
export function wave(str: string): Array<string> {
    const res: string[] = []
    for (let i = 0; i < str.length; i++) {
        const splited = str.split('')
        if (splited[i] === ' ') continue
        splited[i] = splited[i].toUpperCase()
        res.push(splited.join(''))
    }
    return res;
}

/**
 * TASK 11: There is an array of strings. All strings contains similar letters except one. Need to find it.
 * Example: findUniq([ 'Aa', 'aaa', 'aaaaa', 'BbBb', 'Aaaa', 'AaAaAa', 'a' ]) === 'BbBb'
 */
export function findUniqStr(arr: string[]): string {
    /**
     * O(2*n^2) algorithm complexity
     * @returns string
     */
    const _firstSolution = () => {
        // remove similar letters, prepare to compare
        const normalized: string[] = []
        for (let i = 0; i < arr.length; i++) {
            const splited = arr[i].split('')
            const occurrences: { [key: string]: number } = {}
            for (let j = 0; j < splited.length; j++) {
                const str = splited[j].toLowerCase()
                occurrences[str] = occurrences[str] ? occurrences[str] + 1 : 1
            }
            normalized.push(Object.keys(occurrences).sort().join(''))
        }

        // compare and find unique
        let nonUnique: string = ''
        for (let i = 0; i < normalized.length; i++) {
            const iStr: string = normalized[i]
            for (let j = i + 1; j < normalized.length; j++) {
                const jStr: string = normalized[j]
                const match = iStr === jStr
                if (match) {
                    nonUnique = normalized[i]
                }
            }
        }
        const uniqueIndex = normalized.findIndex(e => e !== nonUnique)
        const res = arr[uniqueIndex]
        return res;
    }

    /**
    * O(2n) algorithm complexity
    * @returns string
    */
    const _secondSolution = () => {
        const normalizedMap: Map<string, number> = new Map();
        const originalMap: Map<string, string> = new Map();

        // Normalize strings and populate maps
        for (const str of arr) {
            const normalized = Array.from(new Set(str.toLowerCase().split('').sort())).join('');
            normalizedMap.set(normalized, (normalizedMap.get(normalized) || 0) + 1);
            if (!originalMap.has(normalized)) {
                originalMap.set(normalized, str);
            }
        }

        // Find the unique normalized string
        for (const [key, count] of normalizedMap) {
            if (count === 1) {
                return originalMap.get(key) as string;
            }
        }

        throw new Error('No unique string found');
    }

    return _secondSolution()
}

/**
 * TASK 12: args is object that contains all the arguments passed to the function
 * @param args 
 */
function exampleFunction(...args: any[]) {
    return `TASK 12: ${args}`;
}

/**
 * TASK 13: delay as method for func
 */
const greetObj = {
    name: 'Kiko',
    delay(timeout: number) {
        setTimeout(() => {
            return `TASK 13: ${this.name}`;
        }, timeout);
    }
};

/**
 * TASK 14: Promise.all()
 */
function fetchUserData(userId: number): Promise<{ id: number, name: string }> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const users = [
                { id: 1, name: "John" },
                { id: 2, name: "Alice" },
                { id: 3, name: "Bob" }
            ];

            const user = users.find(user => user.id === userId);

            if (user) {
                resolve(user);
                console.log("User Posts:", user);
            } else {
                reject(new Error("User not found"));
            }
        }, 1000);
    });
}
function fetchUserPosts(userId: number): Promise<string[]> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const posts = [
                "Post 1",
                "Post 2",
                "Post 3"
            ];
            resolve(posts);
            console.log("User Data:", posts);
        }, 1500);
    });
}
function fetchUserDataAndPosts(userId: number) {
    try {
        // Run both promises concurrently and wait for all of them to resolve
        // const [userData, userPosts] = await Promise.all([ ... ])
        Promise.all([
            fetchUserData(userId),
            fetchUserPosts(userId)
        ]);
    } catch (error) {
        console.error("Error:", (error as Error).message);
    }
}


// TASK DATA
const ARR_8 = ["it", "wkppv", "ixoyx", "3452", "zzzzzzzzzzzz"]

// --->   RUN TASKS   <---
checkExist();                               // TASK 1
delayedGreet('Kiko')                        // TASK 2
devider([1, 2, 3, 4, 5], 2);                // TASK 3
order("is2 Thi1s T4est 3a");                // TASK 4
findUniq([0, 0, 0.55, 0, 0]);               // TASK 5
sumPairs([10, 5, 2, 3, 7, 5], 10);          // TASK 6
josephusSurvivor(11, 19);                   // TASK 7
longestConsec(ARR_8, 3);                    // TASK 8
validBraces('([{}])()');                    // TASK 9
wave("two words")                           // TASK 10
findUniqStr(['abc', 'foo', 'bca', 'cba'])   // TASK 11
exampleFunction(1, 'hello', true);          // TASK 12
greetObj.delay(2000);                       // TASK 13
fetchUserDataAndPosts(2);                   // TASK 13
