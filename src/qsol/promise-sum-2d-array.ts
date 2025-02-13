function sumOfARow(arr: number[][], rowIdx: number): Promise<number> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (arr.length > rowIdx) {
                let sum = 0;
                console.log(`Computing sum of row ${rowIdx} ... `);
                for (let i = 0; i < arr[rowIdx].length; i++) {
                    sum += arr[rowIdx][i];
                }
                resolve(sum);
            }
            else {
                reject(`Row Index ${rowIdx} must be within 0 and ${arr.length}`);
            }}, 
        0);
    });
}

const arr2D = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

let rowSumPromises: Promise<number>[] = [];

for (let x = 0; x < arr2D.length; x++) {
    rowSumPromises.push(sumOfARow(arr2D, x));
}

Promise.all(rowSumPromises)
    .then((rowSums) => {
        let sum = 0;
        console.log('Computing sum of all rows ... ');
        rowSums.forEach(rowSum => {
            sum += rowSum;
        });
        console.log(`Sum = ${sum}`);
    })
    .catch((error) => console.log(`Error Msg: ${error}`));

console.log('Computing sum of 2D array ... ');