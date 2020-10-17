const hexToNumberArray = str => str.split('').map(e => parseInt(e, 16));
const numberArrayToHex = arr => arr.map(e => e.toString(16).toUpperCase()).join("");

// here is where your sorting algorithm will go.
export default function* (data) {
    let { str } = data;
    // yield the initial string for drawing.
    yield str; // this yield will let the function draw the initial value of the algorithm.
    
    
    let arr = hexToNumberArray(str);
    // aweful bubble sort (DELETE ME):
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++ ) {
            if(arr[j] > arr[i]) {
                let temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
                console.log(arr);
                yield numberArrayToHex(arr);
            }
        }
    }
}