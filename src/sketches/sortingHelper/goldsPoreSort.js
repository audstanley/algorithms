const hexToNumberArray = str => str.split('').map(e => parseInt(e, 16));
const numberArrayToHex = arr => arr.map(e => e.toString(16).toUpperCase()).join("");

// here is where your sorting algorithm will go.
export default function* (data) {
    let { str } = data;
    // yield the initial string for drawing.
    yield str; // this yield will let the function draw the initial value of the algorithm.
    let arr = hexToNumberArray(str);
    yield* oddevenSort(arr);
}

function* oddevenSort(arr){
    function swap(arr,i,j){
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    var sorted = false;
    while(!sorted){
        sorted = true;
        for(var i = 1; i<arr.length-1; i += 2){
            if(arr[i] > arr[i+1]){
                swap(arr,i,i+1);
                sorted = false;
            }
        }
        for(i=0; i<arr.length-1; i+=2){
            if(arr[i]>arr[i+1]);
            sorted = false;
        }
    }
}