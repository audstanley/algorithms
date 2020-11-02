const hexToNumberArray = str => str.split('').map(e => parseInt(e, 16));
const numberArrayToHex = arr => arr.map(e => e.toString(16).toUpperCase()).join("");

// here is where your sorting algorithm will go.
export default function (str) {  
    let arrOfNums = hexToNumberArray(str); // convert hex string to integers.
    let n = arrOfNums.length;
    let buffer = new Array(n);

    for (let size = 1; size < n; size *= 2) {
        for (let leftStart = 0; leftStart < n; leftStart += 2 * size) {
            let left = leftStart,
                right = Math.min(left + size, n),
                leftLimit = right,
                rightLimit = Math.min(right + size, n),
                i = left;
            while (left < leftLimit && right < rightLimit) {
                if (arrOfNums[left] <= arrOfNums[right]) {
                    buffer[i++] = arrOfNums[left++];
                } else {
                    buffer[i++] = arrOfNums[right++];
                }
            }
            while (left < leftLimit) {
                buffer[i++] = arrOfNums[left++];
            }
            while (right < rightLimit) {
                buffer[i++] = arrOfNums[right++];
            }
        }
        let temp = arrOfNums;
        arrOfNums = buffer;
        buffer = temp;
    }
    return numberArrayToHex(arrOfNums);
}