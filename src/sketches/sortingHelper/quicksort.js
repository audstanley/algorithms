const hexToNumberArray = str => str.split('').map(e => parseInt(e, 16));
const numberArrayToHex = arr => arr.map(e => e.toString(16).toUpperCase()).join("");
const swap = (arr, i, j) => [arr[i], arr[j]] = [arr[j], arr[i]];

// function* quickSort(arr, n, completeString, left = 0, right = arr.length - 1) {
//     if (right - left <= 0) {
//         yield numberArrayToHex(arr);
//         return;
//     }
//     let base = arr[left], i = left + 1, j = right;
//     while (j > i) {
//       if (arr[j] < base) {
//         if (arr[i] > base) {
//           swap(arr, i, j);
//           j--;
//         } else {
//           i++;
//         }
//       } else {
//         j--;
//       }
//     }
//     base > arr[j] && swap(arr, left, j);
    
//     if(n == 4) {
//         yield numberArrayToHex(arr);
//     }
//     yield* quickSort(arr, n - 1, completeString, left, j - 1);
//     yield numberArrayToHex(arr);
//     yield* quickSort(arr, n - 1, completeString, j + 1, right);
//     yield numberArrayToHex(arr);
//   }

// here is where your sorting algorithm will go.
// export default function* (data) {
//     let { str, completeString } = data;
//     let arr = hexToNumberArray(str);
//     yield str;
//     //yield* quickSort(arr, 4, completeString)

//     function* pivot (arr, start = 0, end = arr.length + 1) {
//         const swap = (list, a, b) => [list[a], list[b]] = [list[b], list[a]];
      
//         let pivot = arr[start],
//             pointer = start;
      
//         for (let i = start; i < arr.length; i++) {
//           if (arr[i] < pivot  ) {
//             pointer++;
//             swap(arr, pointer, i);
//             yield numberArrayToHex(arr);
//           }
//         }
//         swap(arr, start, pointer);
//         return pointer;
//       }

//     function* quickSort(arr, n, start = 0, end = arr.length) {
//         let pivotIndex = yield* pivot(arr, start, end);
//         if (start >= end) {
//             return arr;
//         }
//         console.log(`n: ${n}`);
//         if (n % 2 === 0) {
//             yield numberArrayToHex(arr);
//         }
//         yield* quickSort(arr, n+1,start, pivotIndex);
//         yield* quickSort(arr, n+1,pivotIndex + 1, end);
//         return arr;
//     }

//     yield* quickSort(arr, 0);


    
//     //yield completeString;
// }

export default function* (data) {
  let { str } = data;
  // yield the initial string for drawing.
  // yield str; // this yield will let the function draw the initial value of the algorithm
  let arr = hexToNumberArray(str);
  
  // insertion sort (DELETE ME):
  yield* quickSort(arr);
}

function* quickSort(arr, min = 0, max = arr.length) {
  if (max - min <= 1) {
      return arr;
  }
  
  let [pivot, less, greater] = [(arr[min]), [], []];
  for (let i = min + 1; i < max; i++) {
      if (arr[i] < pivot) { 
          less.push(arr[i]);
      } else {
          greater.push(arr[i]);
      }
      arr.splice(min, i - min + 1, ...less.concat(pivot, greater));
  }
  yield { str: numberArrayToHex(arr), pivot: pivot.toString() };
  yield* quickSort(arr, min, min + less.length);
  yield* quickSort(arr, min + less.length + 1, max);
}
