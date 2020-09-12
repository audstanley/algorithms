import React, { useContext } from 'react'

import { generate } from 'shortid'

import sketch1Src from '../../sketches/ant-audstanley'
import sketch2Src from '../../sketches/ant-audstanley-2'
import Section1 from '../Section1/index'

import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider'
import p5Wrapper from '../P5Wrapper'

const P5Wrapper1 = p5Wrapper(generate())
const P5Wrapper2 = p5Wrapper(generate())

export default function Section2() {
    const dispatch = useContext(AppDispatchContext)
    const {
        slider,
        frame,
        frameRate,
        antStopped,
        sketch1L,
        sketch1R,
    } = useContext(AppStateContext)

    return (
        <div className="section">
            <h5>Cella Ant #x15</h5>
            <div style={{ display: 'flex', justifyContent: 'center', padding: '0.2rem', fontSize: '1.25rem', marginLeft: '1rem' }}>
                <a href="https://github.com/audstanley/algorithms">
                    GitHub Project
                </a>
                <div style={{ display: 'flex', padding: '0.2rem', fontSize: '0.8rem', marginLeft: '1rem' }}>
                    ⬤
                </div>
                
                <a href="https://github.com/audstanley/algorithms/blob/master/src/sketches/ant-audstanley-2.js" style={{marginLeft: '1rem', marginRight: '2.4rem'}}>
                    Source Code
                </a>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '0.2rem', fontSize: '1.25rem', marginLeft: '1rem' }}>
                Frame: <div style={{marginLeft: '3.6rem'}}>{frame} {(antStopped)? '(paused)' : ''}</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '0.2rem', fontSize: '1.25rem', marginLeft: '1rem' }}>
                Frame Rate: <div style={{marginLeft: '0.8rem'}}>{frameRate}fps</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', fontSize: '1rem', marginTop: '2rem', marginBottom: '2rem', marginLeft:'2rem', marginRight:'1.4rem',
            letterSpacing: '2px',
            lineHeight: '25px'}}>
                The animation will be paused and the frame rate will be set to 1fps at frame one thousand.
                The color state change of the cell beneath the mouse is drawn, as well as the cell behind the mouse
                from the mouse's curent cell position. Continue the animation past frame one thousand by left clicking anywhere in the browser window.
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '3rem', marginBottom: '2rem' }}>
                <button style={{ backgroundColor: 'Gainsboro',
                            // border: 'none',
                            borderColor: '#FFF',
                            outline: 'none',
                            padding: '0.7rem 1rem',
                            fontSize: '1.25rem',
                            textDecoration: 'none',
                            borderRadius: '0.5rem',
                            boxShadow: 'inset 0 0.2rem 0.2rem -0.2rem #000000',
                            backgroundColor: 'transparent',
                            color: '#FFF',
                            letterSpacing: '2px',
                            lineHeight: '28px',
                            maxWidth: '45%',
                        }}
                        type="button"
                        onClick={event => dispatch({
                            type: 'FRAME_RATE',
                            payload: (frameRate == 64)? frameRate : frameRate*2,
                        })}
                    >
                        Double the Frame Rate
                </button>

                <button style={{ backgroundColor: 'Gainsboro',
                            // border: 'none',
                            borderColor: '#FFF',
                            outline: 'none',
                            padding: '0.7rem 1rem',
                            fontSize: '1.25rem',
                            textDecoration: 'none',
                            borderRadius: '0.5rem',
                            boxShadow: 'inset 0 0.2rem 0.2rem -0.2rem #000000',
                            backgroundColor: 'transparent',
                            color: '#FFF',
                            letterSpacing: '2px',
                            lineHeight: '28px',
                            maxWidth: '45%',
                        }}
                        type="button"
                        onClick={event => dispatch({
                            type: 'FRAME_RATE',
                            payload: (frameRate == 0.25)? frameRate : frameRate/2,
                        })}
                    >
                        Half the Frame Rate
                </button>
            </div>

            <div className="section section-content">
                {/* <div className="section-content-controller">
                    <Section1 />
                </div> */}
                {sketch1L && (
                    <P5Wrapper1
                        dispatch={dispatch}
                        sketch={sketch2Src}
                        state={{ slider: slider, frame: frame, frameRate: frameRate }}
                    />
                )}
            </div>

            <div style={{ marginLeft: '1rem' }}>
                <h4 style={{ marginLeft: '0.4rem', marginRight: '1.4rem' }}>Complexity Order:</h4>
                <div style={{ display: 'flex', justifyContent: 'flex-start', fontSize: '1rem', marginTop: '2rem', marginBottom: '2rem', marginLeft:'2rem', marginRight:'1.4rem',
                    letterSpacing: '2px',
                    lineHeight: '25px'}}>
                        The complexity order for the animation is O(n^2) based on the box number for only when the animation
                        is initially set up using the setup function (if you consider that the input "n" to the animation is 41, 
                        and we need to be able to draw 41x41 2d array of black squares). 
                        After the p5 setup function has populated all of the black boxes, each additional frame used by p5's 
                        draw() function is an O(1) operation.  Since 
                        we are animating, an O(1) operation per frame is ideal.  There is no continuous "input," other than 
                        the calling of the draw function.  It would be unnecessary to add additional processing 
                        by drawing every single box each time the draw function is called. The most complex operation is the 
                        function used to draw the triangle, which is calculated using the xPosition and yPosition 
                        ~= line 42: O(7) + line 43: O(6) + line 44: O(7) + line 45: O(2) 
                        is equal to an operation of O(22). Since the inner workings of JavaScript are fairly complex, it's difficult to define this as exactly O(22), 
                        but what is true, for sure, is that when the mouse goes north, it's a set constant operation each time, 
                        and this makes the function that converts an x and y position of boxes to an x1, y1, x2, y2, x3, y3 
                        pixel location an O(1) operation.  There isn't any variable that will change the fact that this function 
                        will always run at a constant predictable time.
                        <br/><br/>
                        There were some choices that were made to increase readability at the expense of time complexity.  For example, 
                        on line 171, we have defined a function that takes an object which has a "compassDirection" property.  This 
                        compassDirection property could have saved some low level time by making the type of property a Number rather than 
                        a string object, but since the size of the string will always predictable - "north" "east" "south" or "west" - it 
                        was a design choice to use a string even though technically, it would be less efficient than using a Number to represent
                        the compassDirection.
                        <br/><br/>
                        Finally, we added some things that make the animation a little more reactive, so there is some additional operations that update the 
                        users browser when the frame rate changes, and when the mouse progresses additional frames. An additional couter that keeps track 
                        of the current frame, as well as the frameRate, which allows the user to be able to change the frameRate of the animation at any given moment.
                        This was not part of the assignment's core rules, but was added in order to see what the pattern of the animation 
                        looks like at exactly frame 1,000, and be able to continue that animation if desired.

                    </div>
            </div>

        </div>
    )
}
