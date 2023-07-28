const array = [1, 2, 3, 4, 5];
const array2 = [];

array2.push(
  ...array.map((arr) => {
    return arr;
  })
);
console.log(array2)
