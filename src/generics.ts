
/**
 * GENERICS [typescrypt basics]
 */

// Example 1
type genericType<T> = {
    data: T;
};
type Emample = genericType<{
    firstName: string;
}>;

// Example 2
const addIdToObject = <T>(obj: T) => {
    return { ...obj, id: "123" }
}
const result = addIdToObject({firstName: "Matt", lastName: "D"})
console.log(result);

// Example 3
