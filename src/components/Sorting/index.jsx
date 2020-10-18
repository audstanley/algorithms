import React, { useContext } from 'react';
import p5Wrapper from '../P5Wrapper';
import { generate } from 'shortid';
import sortingSketch from '../../sketches/sorting-sketch';
import { AppDispatchContext, AppStateContext } from '../App/AppStateProvider';

const P5WrapperSorting = p5Wrapper(generate());

export default function Sorting() {
    const dispatch = useContext(AppDispatchContext);
    const { hexString,
            sortingFrames,
            insertionSortDone,
            goldsSortDone,
            mergeSortDone,
            quickSortDone } = useContext(AppStateContext);

    return (
        <div className="section section-content">
            <h5>Sorting Algorithms:</h5>
            <div style={{ fontSize: '1.2rem', marginLeft: '1rem', marginBottom: '1rem', marginTop: '2rem' }}>
                Randomly chosen hex to sort: { hexString } 
            </div>
             
            <div style={{ fontSize: '1.25rem', marginLeft: '1rem', marginBottom: '1rem' }}>
                Steps: { sortingFrames }
            </div> 
            <div style={{ display: 'flex',  justifyContent: 'space-between', fontSize: '1.25rem', marginLeft: '2.4rem', marginRight: '6rem' }}>
                <div style={{display: 'inline-flex', flexWrap: 'wrap' }}>
                    Insertion Sort
                </div>
                <div style={{display: 'inline-flex', flexWrap: 'wrap', paddingLeft: '2.4rem' }}>
                    Gold's Pore Sort
                </div>
                <div style={{display: 'inline-flex', flexWrap: 'wrap', marginLeft: '2.4rem', }}>
                    Merge Sort
                </div>
                <div style={{display: 'inline-flex', flexWrap: 'wrap', marginLeft: '4rem' }}>
                    Quick Sort
                </div>
            </div>


            {<P5WrapperSorting
                    dispatch={dispatch}
                    sketch={sortingSketch}
                    state={{ hexString: hexString }}
                />}

            <div style={{ display: 'flex',  justifyContent: 'space-between', fontSize: '1rem', marginLeft: '3.4rem', marginRight: '6rem' }}>
                <div style={{display: 'inline-flex', flexWrap: 'wrap' }}>
                    { (insertionSortDone)? 'done' : '------' }
                </div>
                <div style={{display: 'inline-flex', flexWrap: 'wrap' }}>
                    { (goldsSortDone)? 'done' : '------' }
                </div>
                <div style={{display: 'inline-flex', flexWrap: 'wrap' }}>
                    { (mergeSortDone)? 'done' : '------' }
                </div>
                <div style={{display: 'inline-flex', flexWrap: 'wrap', marginRight: '3.4rem' }}>
                    { (quickSortDone)? 'done' : '------' }
                </div>
                
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    )
}
