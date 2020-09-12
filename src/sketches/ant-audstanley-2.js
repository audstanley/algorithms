//** Richard Stanley        */
//** Hector Bernal          */
//** Christopher Millones   */
//** Eulices Martinez De La Cruz */

export default function (s) {
    s.state = {}; // This is for ReactJs
    s.dispatch = () => {}; // This is for ReactJs

    const numberOfSquares = 41;  // How many squares wide, as well as tall.
    let xPosition = 20; // The x position
    let lastXPosition = 20; // The x position on the last frame
    let yPosition = 20; // The y position
    let lastYPosition = 20; // The y position on the last frame
    let curCompassDirection = "east"; // The current heading, starting north since on black we will go west on the first frame (starting north, left would face the ant west on the first frame)
    const rectOffset = 2; // The rectangle offset is padding for the black square that are populated on the canvas.
    const rectSize = 20; // The length of one side of the rectangle
    const height = rectSize * numberOfSquares; // Pixels high
    const width = rectSize * numberOfSquares;  // Pixels wide
    const squareSize = rectSize-rectOffset;
    let lastMovedObject = { 
        lastXPosition : lastXPosition, 
        lastYPosition : lastYPosition, 
        colorObj : s.color(255,0,0),
        compassDirection: "north" 
    }; // We will use this object literal to store direcitonal and compass data for each frame.

    // Define colors for readbility.
    const black = s.color(0,0,0);
    const white = s.color(255,255,255);
    const red = s.color(255,0,0);
    const green = s.color(0,255,0);
    const blue = s.color(0,0,255);
    const yellow = s.color(200,200,0);

    //** convertRectPosToPixel is a function that converts a position to the pixel location of the position.*/
    const convertRectPosToPixel = (pos) => pos * rectSize;
    //** convertTriPosToPixel takes and "x" and "y" position along with the current compass direction, and returns the */
    //** orientation of the triangle, in this case the "ant's" orientation.  */
    const convertTriPosToPixel = (xPos, yPos, curCompassDirection) => {
        if (curCompassDirection == "north") {
            let [ x1, y1 ] = [ (xPos * rectSize) + (rectSize / 2) - 1, (yPos * rectSize) + 2 ];
            let [ x2, y2 ] = [ (xPos * rectSize) + 2, (yPos * rectSize) + rectSize - 4 ];
            let [ x3, y3 ] = [ (xPos * rectSize) + rectSize - 4, (yPos * rectSize) + rectSize - 4 ];
            return [ x1, y1, x2, y2, x3, y3 ];
        } else if (curCompassDirection == "east") {
            let [ x1, y1 ] = [ (xPos * rectSize) + rectSize - 2, (yPos * rectSize) + (rectSize / 2) ];
            let [ x2, y2 ] = [ (xPos * rectSize) + 2 , (yPos * rectSize) + 2 ];
            let [ x3, y3 ] = [ (xPos * rectSize) + 2, (yPos * rectSize) + rectSize - 4 ];
            return [ x1, y1, x2, y2, x3, y3 ];
        } else if (curCompassDirection == "south") {
            let [ x1, y1 ] = [ (xPos * rectSize) + (rectSize / 2) - 1, (yPos * rectSize) + rectSize - 4 ];
            let [ x2, y2 ] = [ (xPos * rectSize) + 2 , (yPos * rectSize) + 2 ];
            let [ x3, y3 ] = [ (xPos * rectSize) + rectSize - 4, (yPos * rectSize) + 2 ];
            return [ x1, y1, x2, y2, x3, y3 ];
        } else if (curCompassDirection == "west") {
            let [ x1, y1 ] = [ (xPos * rectSize) + 2, (yPos * rectSize) + (rectSize / 2) ];
            let [ x2, y2 ] = [ (xPos * rectSize) + rectSize - 4, (yPos * rectSize) + 2 ];
            let [ x3, y3 ] = [ (xPos * rectSize) + rectSize - 4, (yPos * rectSize) + rectSize - 4 ];
            return [ x1, y1, x2, y2, x3, y3 ];
        } 
    };

    //** colorCodeToMoveObject is a function that take the RGB values passed, and returns an object that is assiciated */
    //** with the color that detected.  This is simply a clean way to assiciate a color with a direction that needs to */
    //** be performed. */
    const colorCodeToMoveObject = (rd, gn, bl) => {
        if (rd == 0 && gn == 0 && bl  == 0) {
            return { color :"black", dir: "left", colorObj: red };
        } else if (rd == 255 && gn == 0 && bl  == 0) {
            return { color :"red", dir: "right", colorObj: yellow };
        } else if (rd == 0 && gn == 255 && bl  == 0) {
            return { color :"green", dir: "left", colorObj: black };
        } else if (rd == 0 && gn == 0 && bl  == 255) {
            return { color :"blue", dir: "right", colorObj: green };
        } else if (rd == 200 && gn == 200 && bl  == 0) {
            return { color :"yellow", dir: "left", colorObj: blue };
        }
    };

    //** goToCompassPosition will take an object that has direction and a current compass direction and will change the */
    //** compass orientation based on whether or not the mouse should move left or right */
    const goToCompassPosition = (nextMove) => {
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

    //** goNorth is a function that will prepare the mouse to move north */
    //** this function mitigates wrapping around the canvas when the maximum height limit is reached */
    const goNorth = () => {
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

    //** goEast is a function that will prepare the mouse to move east */
    //** this function mitigates wrapping around the canvas when the maximum width limit is reached */
    const goEast = () => {
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

    //** goSouth is a function that will prepare the mouse to move south */
    //** this function mitigates wrapping around the canvas when the minimum height limit is reached */
    const goSouth = () => {
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

    //** goWest is a function that will prepare the mouse to move west */
    //** this function mitigates wrapping around the canvas when the minimum width limit is reached */
    const goWest = () => {
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

    //** move is a function that will take an obejct that has a compass direction and record the current compass direction */
    //** as the last compass direction, and call one of the compass direction movement functions such as goNorth() */
    const move = (nextDirection) => {
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
    
    // p5 will run this first, then call on the draw function to continue the animation loop
    s.setup = () => {
        // Create the canvas, set the backgroud to white.
        s.createCanvas(width, height);
        s.background(255, 255, 255);
        s.stroke(255, 255, 255);

        // Set the fill to black, and no stroke.
        let black = s.color(0,0,0);
        s.fill(black);
        s.noStroke();

        // Populate black rectangles
        for (let i = 0; i <= width; i += rectSize) {
            for(let j = 0; j <= height; j+= rectSize) {
                s.rect(i, j, squareSize, squareSize);
            }
        }

        // Start the frameRate at "one frame per second" which can
        // be controlled by buttons on the screen.
        s.frameRate(1);
    };
    
    // p5 will continue to run the draw function and animate the canvas.
    let frame = 0;
    let isLooping = true; // we are going to use our own is looping bool, instead of p5's 'isLooping' function.
    s.draw = () => {
        // When we hit 1000 frames - stop the loop for varification of the drawn pattern.
        if (frame == 1000  && isLooping) {
            s.noLoop();
            isLooping = false;
            s.dispatch({ type: "ANT_STOPPED",  payload: true});
            s.dispatch({ type: "FRAME_RATE",  payload: 1});
        } else {
            // Get the color within the pixel boundry before we deploy the mouse.
            const [ rd, gn, bl ] = s.get(convertRectPosToPixel(xPosition), convertRectPosToPixel(yPosition));
            
            // Change the color the square behind the mouse.
            s.fill(lastMovedObject.colorObj);
            s.rect(convertRectPosToPixel(lastMovedObject.lastXPosition), 
                convertRectPosToPixel(lastMovedObject.lastYPosition), 
                squareSize, 
                squareSize);

            // Prepare for the next move, and prepare changing the color under the mouse (currently).
            let nextMove = colorCodeToMoveObject(rd, gn, bl);
            let nextDirection = goToCompassPosition(nextMove);

            // Change the color under the mouse currently.
            s.fill(nextDirection.colorObj);
            s.rect(convertRectPosToPixel(xPosition), 
                convertRectPosToPixel(yPosition), 
                squareSize, 
                squareSize);
            
            // Draw the mouse
            s.fill(white);
            const [x1, y1, x2, y2, x3, y3] = convertTriPosToPixel(xPosition, yPosition, nextMove.compassDirection);
            s.triangle(x1, y1, x2, y2, x3, y3);

            // Get the mouse ready to move for the next frame.
            const moved = move(nextDirection);
            curCompassDirection = moved.compassDirection;
            lastMovedObject = moved;
            lastMovedObject.lastXPosition = lastXPosition;
            lastMovedObject.lastYPosition = lastYPosition;

            frame += 1;
        }
        
    };
    // Within each frame, the draw function runs at an average of 100 microseconds after running performance tests.

    // This setInterval function will be used to poll the numder of frames every 50ms, and set the frameRate state when
    // a button that changes the frameRate has been clicked. 
    //  - these are React specific. -
    setInterval(() => {
        s.dispatch({ type: "FRAME_COUNT",  payload: `${frame}`}); // React: dispatch the FRAME_COUNT payload (updates page)
        s.frameRate(s.state.frameRate); // React: allow the state of the frameRate to change the animation at the end of the render process.
    },110);

    // Once we hit frame 1,000, pause to check the look of the canvas. Click the mouse to continue the animation onwward.
    s.mousePressed = () => {
        // Resume the animation.
        if (frame == 1000 && !isLooping) {
            frame += 1;
            s.dispatch({ type: "ANT_STOPPED",  payload: false});
            // This is used a debouncer.
            setTimeout(() => {
                frame -= 1;
            },60);
        }
        isLooping = true;
        s.loop();
    }
    
}
