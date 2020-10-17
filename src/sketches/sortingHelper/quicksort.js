const hexToNumberArray = str => str.split('').map(e => parseInt(e, 16));
const numberArrayToHex = arr => arr.map(e => e.toString(16).toUpperCase()).join("");

// here is where your sorting algorithm will go.
export default function* (data) {
    let { str } = data;
    // yield the initial string for drawing.
    yield str; // this yield will let the function draw the initial value of the algorithm.
    
    
    let arr = hexToNumberArray(str);
    // insertion sort (DELETE ME):
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
}