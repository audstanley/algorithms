export default function (s) {
    s.state = {}
    // s.dispatch = () => { }

    s.setup = () => {
        s.createCanvas(410, 410)

        // console.log('::: displayDensity:', s.displayDensity())
        // console.log('::: pixelDensity:', s.pixelDensity())

        console.log('::: sketch-1 has been initialized')
    }

    s.draw = () => {
        
        s.background(255, 255, 255)
        s.stroke(255, 255, 255)

        let black = s.color(0,0,0)
        s.fill(black)
        s.noStroke()

    
        for (let i = 10; i <= 410; i += 10) {
            for(let j = 10; j <= 410; j+= 10) {
                s.rect(i, j, 9, 9)
            }
        }
        


        //s.strokeWeight(s.map(s.state.slider, 0, 400, 0, 10))
        //s.stroke(255, 255, 255)
        //s.fill(255, 255, 255, s.map(s.state.slider, 0, 400, 255, 0))
        //s.ellipse(s.width / 2, s.height / 2, s.state.slider)
    }
}
