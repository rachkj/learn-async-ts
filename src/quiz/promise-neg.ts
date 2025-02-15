const array2D_3 = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, -9]
];

array2D_3.forEach(row => {
    if (row.some(num => num < 0)) {
        console.log(row);
    }
});
