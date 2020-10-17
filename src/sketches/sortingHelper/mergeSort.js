const hexToNumberArray = str => str.split('').map(e => parseInt(e, 16));
const numberArrayToHex = arr => arr.map(e => e.toString(16).toUpperCase()).join("");

// here is where your sorting algorithm will go.
export default function* (data) {
    let { str } = data;
    // yield the initial string for drawing.
    yield str; // this yield will let the function draw the initial value of the algorithm.
    
    let arrOfNums = hexToNumberArray(str); // convert hex string to integers.

    function* mergeSort(arr) {
        let sorted = arr.slice();
        let n = sorted.length;
        let buffer = new Array(n);

        for (let size = 1; size < n; size *= 2) {
            for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
                let left = leftStart,
                    right = Math.min(left + size, n),
                    leftLimit = right,
                    rightLimit = Math.min(right + size, n),
                    i = left;
                while (left < leftLimit && right < rightLimit) {
                    if (sorted[left] <= sorted[right]) {
                        buffer[i++] = sorted[left++];
                    } else {
                        buffer[i++] = sorted[right++];
                    }
                    }
                    while (left < leftLimit) {
                        buffer[i++] = sorted[left++];
                    }
                    while (right < rightLimit) {
                        buffer[i++] = sorted[right++];
                    }
                }
            let temp = sorted;
            sorted = buffer;
            buffer = temp;
            yield numberArrayToHex(buffer);
        }
        yield numberArrayToHex(sorted);
      }

    let mergeSortGeneratorObject = mergeSort(arrOfNums);
    //console.log(`mergeSortGeneratorObject: ${JSON.stringify(mergeSortGeneratorObject)}`);
    yield* mergeSortGeneratorObject;
}