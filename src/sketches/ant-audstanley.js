export default function (s) {
    s.state = {}; // this is for ReactJs
    s.dispatch = () => {};

    let matrix = [];
    let numberOfSquares = 41;
    let xPosition = 20;
    let lastXPosition = 20;
    let yPosition = 20;
    let lastYPosition = 20;
    let curCompassDirection = "east";
    let rectOffset = 2;
    let rectSize = 20; // the length of one side of the rectangle
    let height = rectSize * numberOfSquares;
    let width = rectSize * numberOfSquares;
    let lastMovedObject = { lastXPosition : lastXPosition, lastYPosition : lastYPosition, colorObj : s.color(0,0,0), compassDirection: "north" };

    let black = s.color(0,0,0);
    let white = s.color(255,255,255);
    let red = s.color(255,0,0);
    let green = s.color(0,255,0);
    let blue = s.color(0,0,255);
    let yellow = s.color(255,255,0);

    let convertRectPosToPixel = (pos) => pos * rectSize;
    let convertTriPosToPixel = (xPos, yPos, curCompassDirection) => {
        if (curCompassDirection == "north") {
            let [ x1, y1 ] = [ (xPos * rectSize) + (rectSize / 2) - 1, (yPos * rectSize) + 2 ];
            let [ x2, y2 ] = [ (xPos * rectSize) + 2, (yPos * rectSize) + rectSize - 4 ];
            let [ x3, y3 ] = [ (xPos * rectSize) + rectSize - 4, (yPos * rectSize) + rectSize - 4 ];
            console.log(`tri - ${x1} : ${y1} - ${x2} : ${y2} - ${x3} : ${y3}`);
            return [ x1, y1, x2, y2, x3, y3 ];
        } else if (curCompassDirection == "east") {
            let [ x1, y1 ] = [ (xPos * rectSize) + rectSize - 2, (yPos * rectSize) + (rectSize / 2) ];
            let [ x2, y2 ] = [ (xPos * rectSize) + 2 , (yPos * rectSize) + 2 ];
            let [ x3, y3 ] = [ (xPos * rectSize) + 2, (yPos * rectSize) + rectSize - 4 ];
            console.log(`tri - ${x1} : ${y1} - ${x2} : ${y2} - ${x3} : ${y3}`);
            return [ x1, y1, x2, y2, x3, y3 ];
        } else if (curCompassDirection == "south") {
            let [ x1, y1 ] = [ (xPos * rectSize) + (rectSize / 2) - 1, (yPos * rectSize) + rectSize - 4 ];
            let [ x2, y2 ] = [ (xPos * rectSize) + 2 , (yPos * rectSize) + 2 ];
            let [ x3, y3 ] = [ (xPos * rectSize) + rectSize - 4, (yPos * rectSize) + 2 ];
            console.log(`tri - ${x1} : ${y1} - ${x2} : ${y2} - ${x3} : ${y3}`);
            return [ x1, y1, x2, y2, x3, y3 ];
        } else if (curCompassDirection == "west") {
            let [ x1, y1 ] = [ (xPos * rectSize) + 2, (yPos * rectSize) + (rectSize / 2) ];
            let [ x2, y2 ] = [ (xPos * rectSize) + rectSize - 4, (yPos * rectSize) + 2 ];
            let [ x3, y3 ] = [ (xPos * rectSize) + rectSize - 4, (yPos * rectSize) + rectSize - 4 ];
            console.log(`tri - ${x1} : ${y1} - ${x2} : ${y2} - ${x3} : ${y3}`);
            return [ x1, y1, x2, y2, x3, y3 ];
        } 
    };

    let colorCodeToMoveObject = (rd, gn, bl) => {
        if (rd == 0 && gn == 0 && bl  == 0) {
            console.log(`black, left`);
            return { color :"black", dir: "left", colorObj: s.color(255,0,0), previousColorObj: s.color(0,0,0) };
        } else if (rd == 255 && gn == 0 && bl  == 0) {
            console.log(`red, right`);
            return { color :"red", dir: "right", colorObj: s.color(255,255,0), previousColorObj: s.color(255,0,0) };
        } else if (rd == 0 && gn == 255 && bl  == 0) {
            console.log(`green, left`);
            return { color :"green", dir: "left", colorObj: s.color(0,0,0), previousColorObj: s.color(0,255,0) };
        } else if (rd == 0 && gn == 0 && bl  == 255) {
            console.log(`blue, right`);
            return { color :"blue", dir: "right", colorObj: s.color(0,255,0), previousColorObj: s.color(0,0,255) };
        } else if (rd == 255 && gn == 255 && bl  == 0) {
            console.log(`yellow, left`);
            return { color :"yellow", dir: "left", colorObj: s.color(0,0,255), previousColorObj: s.color(255,255,0) };
        }
    };

    let goToCompassPosition = (nextMove) => {
        if (nextMove.dir == "left" && curCompassDirection == "north") {
            nextMove.compassDirection = "west";
            return nextMove;
        } else if (nextMove.dir == "right" && curCompassDirection == "north") {
            nextMove.compassDirection = "east";
            return nextMove;
        } else if (nextMove.dir == "left" && curCompassDirection == "east") {
            nextMove.compassDirection = "north";
            return nextMove;
        } else if (nextMove.dir == "right" && curCompassDirection == "east") {
            nextMove.compassDirection = "south";
            return nextMove;
        } else if (nextMove.dir == "left" && curCompassDirection == "south") {
            nextMove.compassDirection = "east";
            return nextMove;
        } else if (nextMove.dir == "right" && curCompassDirection == "south") {
            nextMove.compassDirection = "west";
            return nextMove;
        } else if (nextMove.dir == "left" && curCompassDirection == "west") {
            nextMove.compassDirection = "south";
            return nextMove;
        } else if (nextMove.dir == "right" && curCompassDirection == "west") {
            nextMove.compassDirection = "north";
            return nextMove;
        }
    };

    let convertPixelToPos = (pixel) => rectSize / pos;
    let goNorth = () => {
        //console.log(`yPosition: ${yPosition}`);
        lastXPosition = xPosition;
        if (yPosition == 0) {
            lastYPosition = yPosition;
            yPosition = numberOfSquares-1;
            return yPosition;
        } else {
            yPosition -= 1;
            return yPosition;
        }
    };
    let goEast = () => {
        //console.log(`xPosition: ${xPosition}`);
        lastYPosition = yPosition;
        if (xPosition == numberOfSquares-1) {
            lastXPosition = xPosition;
            xPosition = 0;
            return xPosition;
        } else {
            lastXPosition = xPosition;
            xPosition += 1;
            return xPosition;
        }
    };
    let goSouth = () => {
        //console.log(`yPosition: ${yPosition}`);
        lastXPosition = xPosition;
        if (yPosition == numberOfSquares-1) {
            lastYPosition = numberOfSquares-1;
            yPosition = 0;
            return yPosition;
        } else {
            lastYPosition = yPosition;
            yPosition += 1;
            return yPosition;
        }
    };
    let goWest = () => {
        //console.log(`xPosition: ${xPosition}`);
        lastYPosition = yPosition;
        if (xPosition == 0) {
            xPosition = numberOfSquares-1;
            return xPosition;
        } else {
            lastXPosition = xPosition;
            xPosition -= 1;
            return xPosition;
        }
    };

    let move = (nextDirection) => {
        if(nextDirection.compassDirection == "north") {
            nextDirection.lastCompassDirection = "north";
            goNorth();
            return nextDirection;
        } else if (nextDirection.compassDirection == "east") {
            nextDirection.lastCompassDirection = "east";
            goEast();
            return nextDirection;
        } else if (nextDirection.compassDirection == "south") {
            nextDirection.lastCompassDirection = "south";
            goSouth();
            return nextDirection;
        } else if (nextDirection.compassDirection == "west") {
            nextDirection.lastCompassDirection = "west";
            goWest();
            return nextDirection;
        } else {
            return nextDirection;
        }
    };
    

    s.setup = () => {
        s.createCanvas(width, height);
        // console.log('::: displayDensity:', s.displayDensity())
        // console.log('::: pixelDensity:', s.pixelDensity())
        s.background(255, 255, 255);
        s.stroke(255, 255, 255);

        let black = s.color(0,0,0);
        s.fill(black);
        s.noStroke();


        // populate the matrix of rectangles, and assign a color object to the matrix.
        for (let i = 0; i <= width; i += rectSize) {
            matrix = [];
            for(let j = 0; j <= height; j+= rectSize) {
                matrix[i] = [ [ { r:0, g:0, b:0 } ] ];
                s.rect(i, j, rectSize-rectOffset, rectSize-rectOffset);
            }
        }

        s.frameRate(s.state.slider);
    };


    let initialFrame = true;
    s.draw = () => {
        //console.log(`SLIDER ${s.map(s.state.slider, 1, 60, 1, 60)}`)
        s.frameRate(s.map(s.state.slider, 1, 60, 1, 60)); // For React to control the frame rate of the canvas.
        
        s.fill(white);
        s.noStroke();
        // draw curent position
        //s.rect(convertRectPosToPixel(goEast()), convertRectPosToPixel(20), rectSize-rectOffset, rectSize-rectOffset);
        //goNorth();
        
        // NEED TO WORK HERE

        let [ rd, gn, bl ] = s.get(convertRectPosToPixel(lastMovedObject.lastXPosition), convertRectPosToPixel(lastMovedObject.lastYPosition));
        console.log(`detected colors ${rd} ${gn} ${bl}`)
        let nextMove = colorCodeToMoveObject(rd, gn, bl);
        let nextDirection = goToCompassPosition(nextMove);
        let [x1, y1, x2, y2, x3, y3] = convertTriPosToPixel(xPosition, yPosition, nextMove.compassDirection);
        s.triangle(x1, y1, x2, y2, x3, y3);
        let moved = move(nextDirection);
        curCompassDirection = moved.compassDirection;

        console.log(`lastPos: ${lastXPosition},${lastYPosition}`)
        // draw last position black
        if (initialFrame) {
            initialFrame = false;
        } else {
            s.fill(lastMovedObject.colorObj);
            s.rect(convertRectPosToPixel(lastMovedObject.lastXPosition), convertRectPosToPixel(lastMovedObject.lastYPosition), rectSize-rectOffset, rectSize-rectOffset);
            // s.fill(lastMovedObject.previousColorObj);
            // s.rect(convertRectPosToPixel(lastXPosition), convertRectPosToPixel(lastYPosition), rectSize-rectOffset, rectSize-rectOffset);
            // s.fill(white);
            // s.triangle(x1, y1, x2, y2, x3, y3);
        }
        
        lastMovedObject = moved;
        lastMovedObject.lastXPosition = lastXPosition;
        lastMovedObject.lastYPosition = lastYPosition;

        //s.strokeWeight(s.map(s.state.slider, 0, 400, 0, 10))
        //s.stroke(255, 255, 255)
        //s.fill(255, 255, 255, s.map(s.state.slider, 0, 400, 255, 0))
        //s.ellipse(s.width / 2, s.height / 2, s.state.slider)
    };
}
