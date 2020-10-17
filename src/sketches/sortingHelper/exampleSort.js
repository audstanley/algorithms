// genRanHex will just return a random hex string.
// this is just to who how generator functions work.
// you won't use this in your code.
const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('').toUpperCase();
const hexToNumberArray = str => str.split('').map(e => parseInt(e, 16));
const numberArrayToHex = arr => arr.map(e => e.toString(16).toUpperCase()).join("");

// here is where your sorting algorithm will go.
export default function* (data) {
    let { str } = data;
    // yield the initial string for drawing.
    yield str; // this yield will let the function draw the initial value of the algorithm.
    
    // aweful bubble sort:
    let arr = hexToNumberArray(str);
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++ ) {
            if(arr[j] > arr[i]) {
                let temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
                yield numberArrayToHex(arr);
            }
        }
    }
}