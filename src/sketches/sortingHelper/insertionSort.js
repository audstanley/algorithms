const hexToNumberArray = str => str.split('').map(e => parseInt(e, 16));
const numberArrayToHex = arr => arr.map(e => e.toString(16).toUpperCase()).join("");

// for performance benchmarks
let startTime, endTime;

// for performance benchmarks
function start() {
  startTime = performance.now();
}

// for performance benchmarks
function end() {
  endTime = performance.now();
  return endTime - startTime;
}

export default function* (data) {
    let { str } = data;
    // yield the initial string for drawing.
    yield { str: str, time: 0 }; // this yield will let the function draw the initial value of the algorithm.
    start();

    // insertion sort:
    let arr = hexToNumberArray(str);
    let len = arr.length;
    for (let i = 1; i < len; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
        }
        arr[j + 1] = key;
        yield { str: numberArrayToHex(arr), time: end() };
        start();
    }
}