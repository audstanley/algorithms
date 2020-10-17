import React, { useContext } from 'react';
import p5Wrapper from '../P5Wrapper';
import { generate } from 'shortid';
import sortingSketch from '../../sketches/sorting-sketch';
import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider';

const P5WrapperSorting = p5Wrapper(generate());

export default function Sorting() {
    const dispatch = useContext(AppDispatchContext);
    const { hexString } = useContext(AppStateContext);

    return (
        <div className="section section-content">
            <h2>Sorting</h2>
            {<P5WrapperSorting
                    dispatch={dispatch}
                    sketch={sortingSketch}
                    state={{ hexString: hexString }}
                />}
        </div>
    )
}
