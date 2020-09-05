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
            <h5>Frame: {frame}</h5>
            <h5>Frame Rate: {frameRate}fps</h5>
            <button
                    type="button"
                    onClick={event => dispatch({
                        type: 'FRAME_RATE',
                        payload: (frameRate == 64)? frameRate : frameRate*2,
                    })}
                >
                    Double the Frame Rate
            </button>
            <button
                    type="button"
                    onClick={event => dispatch({
                        type: 'FRAME_RATE',
                        payload: (frameRate == 0.25)? frameRate : frameRate/2,
                    })}
                >
                    Half the Frame Rate
            </button>
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
