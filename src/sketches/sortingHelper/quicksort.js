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
    
    // insertion sort:
    let arr = hexToNumberArray(str);
    let len = arr.len;
    for (let i = 1; i < len; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            yield numberArrayToHex(arr);
        }
        arr[j + 1] = key;
    }
    

    // if you want to just see random values generated:
    // for(let i = 0; i < count; i++ ) {
    //     let nextValue = genRanHex(15);
    //     console.log(hexToNumberArray(nextValue));
    //     yield nextValue;
    // }

}