import sortingSketch from "../sorting-sketch";

const hexToNumberArray = str => str.split('').map(e => parseInt(e, 16));
const numberArrayToHex = arr => arr.map(e => e.toString(16).toUpperCase()).join("");


function* pivotSplit() {

};
// here is where your sorting algorithm will go.
export default function* (data) {
    let { str } = data;
    // yield the initial string for drawing.
    yield str; // this yield will let the function draw the initial value of the algorithm.
    
    
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
    yield numberArrayToHex(arr);
    yield* quickSort(arr, min, min + less.length);
    yield* quickSort(arr, min + less.length + 1, max);
}