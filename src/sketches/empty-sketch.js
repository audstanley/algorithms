export default function (s) {
    s.state = {}; // this is for ReactJs
    s.dispatch = () => {};

    s.setup = () => {
        s.createCanvas(width, height);
        // console.log('::: displayDensity:', s.displayDensity())
        // console.log('::: pixelDensity:', s.pixelDensity())
        s.background(255, 255, 255);
        s.stroke(255, 255, 255);

        let black = s.color(0,0,0);
        s.fill(black);
        s.noStroke();



        s.frameRate(1);
    };


    s.draw = () => {
        
        s.fill(white);
        s.noStroke();
    

    };
}
