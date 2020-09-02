import React, { useContext } from 'react'

import { generate } from 'shortid'

import sketch1Src from '../../sketches/ant-audstanley'
import Section1 from '../Section1/index'

import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider'
import p5Wrapper from '../P5Wrapper'

const P5Wrapper1 = p5Wrapper(generate())
const P5Wrapper2 = p5Wrapper(generate())

export default function Section2() {
    const dispatch = useContext(AppDispatchContext)
    const {
        slider,
        sketch1L,
        sketch1R,
    } = useContext(AppStateContext)

    return (
        <div className="section">
            <h5>Cella Ant #x15</h5>
            <div className="section section-content">
                <div className="section-content-controller">
                    <Section1 />
                </div>
                {sketch1L && (
                    <P5Wrapper1
                        dispatch={dispatch}
                        sketch={sketch1Src}
                        state={{ slider: slider }}
                    />
                )}
            </div>
        </div>
    )
}
