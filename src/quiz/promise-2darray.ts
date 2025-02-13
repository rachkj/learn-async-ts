/**
 * Asynchronously sums a single row of numbers.
 * @param row - Array of numbers representing a row.
 * @param rowIndex - Index of the row for logging purposes.
 * @returns A promise that resolves to the sum of the row.
 */
function sumRow(row: number[], rowIndex: number): Promise<number> {
    return new Promise<number>((resolve) => {
        // Use setTimeout to simulate an asynchronous (and possibly expensive) operation
        setTimeout(() => {
            let rowSum = 0;
            for (let i = 0; i < row.length; i++) {
                console.log(`Row ${rowIndex}: adding ${row[i]}`);
                rowSum += row[i];
            }
            console.log(`Row ${rowIndex}: computed sum = ${rowSum}`);
            resolve(rowSum);
        }, 0);
    });
}

/**
 * An asynchronous function that sums all numbers in a 2D array
 * @param arr 2D array of numbers
 * @returns a promise that resolves to the sum of all numbers in the 2D array
 * or rejects if the array is empty
 */
function sum2DArray(arr: number[][]): Promise<number> {
    console.log('Sum called ...');
    if (arr.length === 0) {
        return Promise.reject('Cannot sum an empty array');
    }

    // Map each row to a promise that computes its sum concurrently
    const rowSumPromises = arr.map((row, index) => sumRow(row, index));

    // We also use setTimeout here to simulate scheduling the aggregation in the next event loop cycle,
    // keeping the spirit of the original example.
    return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            Promise.all(rowSumPromises)
                .then((rowSums) => {
                    const totalSum = rowSums.reduce((acc, curr) => acc + curr, 0);
                    console.log('Total sum computed:', totalSum);
                    resolve(totalSum);
                })
                .catch(reject);
        }, 0);
    });
}

// Example usage:
const array2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

const sumPromise1 = sum2DArray(array2D);
console.log('sumPromise1:', sumPromise1);

const sumPromise2 = sum2DArray([]);
console.log('sumPromise2:', sumPromise2);

// Added catch handlers to handle rejected promises and avoid unhandled promise rejections.
sumPromise1
    .then(total => console.log('Result of sumPromise1:', total))
    .catch(err => console.error('Error in sumPromise1:', err));

sumPromise2
    .then(total => console.log('Result of sumPromise2:', total))
    .catch(err => console.error('Caught error for sumPromise2:', err));
