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
        sketch1L,
        sketch1R,
    } = useContext(AppStateContext)

    return (
        <div className="section">
            <h5>Cella Ant #x15</h5> 
            <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '0.2rem', fontSize: '1.25rem', marginLeft: '1rem' }}>
                Frame: <div style={{marginLeft: '3.6rem'}}>{frame}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-start', padding: '0.2rem', fontSize: '1.25rem', marginLeft: '1rem' }}>
                Frame Rate: <div style={{marginLeft: '0.8rem'}}>{frameRate}fps</div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', fontSize: '1.25rem', marginTop: '1rem' }}>
                Continue the animation past frame 1,000 by left clicking anywhere in the browser window.
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '1rem' }}>
                <button style={{ backgroundColor: 'Gainsboro', 
                            border: 'none', 
                            outline: 'none', 
                            padding: '0.6rem', 
                            fontSize: '1.25rem', 
                            textDecoration: 'none', 
                            borderRadius: '0.5rem', 
                            boxShadow: 'inset 0 0.2rem 0.2rem -0.2rem #000000' 
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
                            border: 'none', 
                            outline: 'none', 
                            padding: '0.6rem', 
                            fontSize: '1.25rem', 
                            textDecoration: 'none', 
                            borderRadius: '0.5rem', 
                            boxShadow: 'inset 0 0.2rem 0.2rem -0.2rem #000000' 
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
        </div>
    )
}
