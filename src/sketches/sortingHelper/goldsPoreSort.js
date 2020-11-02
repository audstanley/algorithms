const hexToNumberArray = str => str.split('').map(e => parseInt(e, 16));
const numberArrayToHex = arr => arr.map(e => e.toString(16).toUpperCase()).join("");

// here is where your sorting algorithm will go.
export default function* (data) {
    let { str } = data;
    // yield the initial string for drawing.
    yield str; // this yield will let the function draw the initial value of the algorithm.
    let arr = hexToNumberArray(str);
    yield* goldsPoreSort(arr);
}

function* goldsPoreSort(a) {
    let sorted = false;
    while(!sorted){
        sorted = true;
        console.log(a, sorted);
        for(let i = 1; i < a.length - 1; i += 2) {
            if(a[i] > a[i + 1]) {
                let temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                sorted = false;
                yield numberArrayToHex(a);
            }
        }
        for(let i = 0; i < a.length - 1; i += 2) {
            if(a[i] > a[i + 1]) {
                let temp = a[i];
                a[i] = a[i + 1];
                a[i + 1] = temp;
                sorted = false;
                yield numberArrayToHex(a);
            }
        }
    }
    yield numberArrayToHex(a);
}