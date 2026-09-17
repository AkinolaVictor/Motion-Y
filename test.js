// console.log("A");

// setTimeout(() => {
//   console.log("B");
// }, 0);

// Promise.resolve().then(() => {
//   console.log("C");
// });

// console.log("D");
// function findPair(arr, target) {
//   const seen = new Set();

//   for (const num of arr) {
//     if (seen.has(target - num)) {
//       return [target - num, num];
//     }
//     seen.add(num);
//   }

//   return null;
// }

// const fjf = findPair([2, 7, 11, 15], 9);
// console.log(fjf); // Output: [2, 7]

// [3, 1, 5, 2, 4]
function findMax(arr) {
    const max_index = [0, 0]
    let num = -Infinity;
    for(let i=0; i<arr.length; i++){
        if(arr[i] > num){
            num = arr[i];
            max_index[0] = arr[i];
            max_index[1] = i;
        }
    }

    arr.splice(max_index[1], 1);
    return Math.max(...arr);
}

console.log(findMax([3, 1, 5, 2, 4])); // Output: 4

