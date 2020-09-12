import React, { useContext } from 'react'

import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider'

export default function Section1() {
    const dispatch = useContext(AppDispatchContext)
    const {
        slider,
        sketch1L,
        sketch2,
        sketchAudio,
        bgndColor,
    } = useContext(AppStateContext)

    return (
        <div
            className="section"
            style={{ background: bgndColor }}
        >
            <h5>Framerate</h5>
            <div className="inputs-wrapper">

                {/* Slider Value */}
                <em>{slider}</em>
                <input
                    type="range"
                    min={1}
                    max={60}
                    step={1}
                    value={slider}
                    className="slider"
                    onChange={event => dispatch({
                        type: 'SET_SLIDER_VALUE',
                        payload: +event.target.value,
                    })}
                />
            </div>
            <br />
            <div className="inputs-wrapper">
                {/* <button
                    type="button"
                    onClick={() => dispatch({
                        type: 'TOGGLE_SKETCH',
                        payload: {
                            key: 'sketch1L',
                            value: !sketch1L,
                        },
                    })}
                >
                    Toggle Ant Algorithm
                </button> */}
                {/* <button
                    type="button"
                    onClick={() => dispatch({
                        type: 'TOGGLE_SKETCH',
                        payload: {
                            key: 'sketch1R',
                            value: !sketch1R,
                        },
                    })}
                >
                    Toggle Sketch 1R
                </button>
                <br />
                <button
                    type="button"
                    onClick={() => dispatch({
                        type: 'TOGGLE_SKETCH',
                        payload: {
                            key: 'sketch2',
                            value: !sketch2,
                        },
                    })}
                >
                    Toggle Sketch 2
                </button>
                <br />
                <button
                    type="button"
                    onClick={() => {
                        dispatch({
                            type: 'TOGGLE_SKETCH',
                            payload: {
                                key: 'sketchAudio',
                                value: !sketchAudio,
                            },
                        })
                        dispatch({
                            type: 'SET_PLAY_AUDIO',
                            payload: false,
                        })
                    }}
                >
                    Toggle Sketch Audio
                </button> */}
            </div>
        </div>
    )
}
