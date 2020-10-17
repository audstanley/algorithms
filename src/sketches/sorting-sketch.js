import insertionSort_generator from "./sortingHelper/insertionSort";
import mergeSort_generator from "./sortingHelper/mergeSort";
import example_generator from "./sortingHelper/exampleSort";

let modFrame = 0;
let width = 820;
let height = width / 16;
let beginingOffset = 6;
let offset = 7;
let yPos = parseInt(width / 32) + 6;
let xPos_algo1 = beginingOffset + parseInt(width * 0.01) + offset;
let xPos_algo2 = beginingOffset + parseInt(width * 0.25) + offset;
let xPos_algo3 = parseInt(width * 0.50) + offset;
let xPos_algo4 = parseInt(width * 0.74) + offset;

// right now, these functions are static strings,
// we will randomize the string the will be sent to all these functions
let algo1 = insertionSort_generator({ str: "BAACAAAAAAAAAAA" });    // insertion sort generator
let algo2 = example_generator({ str: "BCBBBBBBBBBBBBB" });          
let algo3 = mergeSort_generator({ str: "FEDCBA9876543210" });       //merge sort generator
let algo4 = example_generator({ str: "DEDDDDDDDDDDDDD" });          

let firstFrames = true;
let algo1Done = false;
let algo2Done = false;
let algo3Done = false;
let algo4Done = false;
let algo1Time = 0;
let algo2Time = 0;
let algo3Time = 0;
let algo4Time = 0;

// renderBackgroundColorOfAlgo wipes the text away or another drawing pass.
const renderBackgroundColorOfAlgo = (s, x, y) => {
    s.fill(35, 35, 35); // background grey
    s.rect(x , y - 10 * 2, 195, 30); // write over the text for next frame.
    s.fill(255, 255, 255); // white
};

export default function (s) {
    s.state = {}; // this is for ReactJs
    s.dispatch = () => {}; // this is for ReactJs

    let backgroundColor = s.color(35, 35, 35);

    s.setup = () => {
        s.createCanvas(width, height);
        s.background(backgroundColor);
        s.textSize(18);
        s.frameRate(4);
    };

    s.draw = () => {
        s.noStroke();

        if ((modFrame % 4 === 0 && !algo1Done) || (firstFrames && modFrame % 4 === 0)) {
            let algo1GenObj = algo1.next();
            let algo2Value = algo1GenObj.value;
            algo1Done = algo1GenObj.done;
            if(!algo1Done) {
                algo1Time += algo2Value.time;
                console.log(`algo1Time: ${algo1Time}`);
                renderBackgroundColorOfAlgo(s, xPos_algo1, yPos);
                s.text(algo2Value.str, xPos_algo1, yPos);
            }
        } else if ((modFrame % 4 === 1 && !algo2Done) || (firstFrames  && modFrame % 4 === 1)) {
            let algo2GenObj = algo2.next();
            let algo2Value = algo2GenObj.value;
            algo2Done = algo2GenObj.done;
            if(!algo2Done) {
                renderBackgroundColorOfAlgo(s, xPos_algo2, yPos);
                s.text(algo2Value, xPos_algo2, yPos);
            }
        } else if ((modFrame % 4 === 2 && !algo3Done) || (firstFrames && modFrame % 4 === 2)) {
            let algo3GenObject = algo3.next();
            console.log(`algo3GenObject: ${JSON.stringify(algo3GenObject)}`)
            let algo3Value = algo3GenObject.value;
            algo3Done = algo3GenObject.done;
            if(!algo3Done) {
                renderBackgroundColorOfAlgo(s, xPos_algo3, yPos);
                s.text(algo3Value, xPos_algo3, yPos);
            } 
        } else if ((modFrame % 4 === 3 && !algo4Done) || (firstFrames  && modFrame % 4 === 3)) {
            let algo4GenObject = algo4.next();
            let algo4Value = algo4GenObject.value;
            algo4Done = algo4GenObject.done;
            if(!algo4Done) {
                renderBackgroundColorOfAlgo(s, xPos_algo4, yPos);
                s.text(algo4Value, xPos_algo4, yPos);
            }
        }

        // once we are done with all sorting, the generators will be done. We can stop the animation.
        // otherwise increment the draw animation.
        if (algo1Done && algo2Done && algo3Done && algo4Done && !firstFrames) {
            console.log('all done');
            s.noLoop();
        } else {
            modFrame += 1;
            if(modFrame >= 4) {
                modFrame = modFrame % 4;
                firstFrames = false;
            }
        }
    };
}
