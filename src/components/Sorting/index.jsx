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
             
            {/* <div style={{ fontSize: '1.25rem', marginLeft: '1rem', marginBottom: '1rem' }}>
                Passes: { sortingFrames }
            </div>  */}
            <div style={{ display: 'flex',  justifyContent: 'space-between', fontSize: '1.25rem', marginLeft: '2.4rem', marginRight: '6rem' }}>
                <div style={{display: 'inline-flex', flexWrap: 'wrap' }}>
                    <a href="https://github.com/audstanley/algorithms/blob/audstanley/src/sketches/sortingHelper/insertionSort.js">Insertion Sort</a>
                </div>
                <div style={{display: 'inline-flex', flexWrap: 'wrap', paddingLeft: '2.4rem' }}>
                    <a href="https://github.com/audstanley/algorithms/blob/audstanley/src/sketches/sortingHelper/goldsPoreSort.js">Gold's Pore Sort</a>
                </div>
                <div style={{display: 'inline-flex', flexWrap: 'wrap', marginLeft: '2.4rem', }}>
                    <a href="https://github.com/audstanley/algorithms/blob/audstanley/src/sketches/sortingHelper/mergeSort.js">Merge Sort</a>
                </div>
                <div style={{display: 'inline-flex', flexWrap: 'wrap', marginLeft: '4rem' }}>
                    <a href="https://github.com/audstanley/algorithms/blob/audstanley/src/sketches/sortingHelper/quicksort.js">Quick Sort</a>
                </div>
            </div>


            {<P5WrapperSorting
                    dispatch={dispatch}
                    sketch={sortingSketch}
                    state={{ hexString: hexString }}
                />}

            <div style={{ display: 'flex',  justifyContent: 'space-between', fontSize: '1rem', marginLeft: '3.4rem', marginRight: '1rem' }}>
                <div style={{display: 'inline-flex', flexWrap: 'wrap' }}>
                    { (insertionSortDone.done)? `done in ${insertionSortDone.frame} swaps` 
                        : `---------${insertionSortDone.currentFrame || 0}---------` }
                </div>
                <div style={{display: 'inline-flex', flexWrap: 'wrap', marginLeft: '3.4rem' }}>
                    { (goldsSortDone.done)? `done in ${goldsSortDone.frame} swaps` 
                        : `---------${goldsSortDone.currentFrame || 0}---------` }
                </div>
                <div style={{display: 'inline-flex', flexWrap: 'wrap', marginLeft: '3.4rem' }}>
                    { (mergeSortDone.done)? `done in ${mergeSortDone.frame} changes` 
                        : `---------${mergeSortDone.currentFrame || 0}---------` }
                </div>
                <div style={{display: 'inline-flex', flexWrap: 'wrap', marginLeft: '3.4rem', marginRight: '1rem' }}>
                    { (quickSortDone.done)? `done in ${quickSortDone.frame} changes,` 
                        : `---------${quickSortDone.currentFrame || 0}---------` } pivot: {`${quickSortDone.pivot || null}`} 
                </div>
                
            </div>
            <div>
            <br/>   
                <table>
                    <tr>
                        <th style={{padding: '1rem'}}>Average Time Complexity</th>
                    </tr>
                    <tr>
                        <td>Insertion Sort</td>
                        <td style={{padding: '1rem'}}>Θ(n^2)</td>
                    </tr>
                    <tr>
                        <td>Gold's Pore Sort</td>
                        <td style={{padding: '1rem'}}>Θ(n^2)</td>
                    </tr>
                    <tr>
                        <td>Merge Sort</td>
                        <td style={{padding: '1rem'}}>Θ(n log(n))</td>
                    </tr>
                    <tr>
                        <td>Quick Sort</td>
                        <td style={{padding: '1rem'}}>Θ(n log(n))</td>
                    </tr>
                </table>
            </div>
            <br/>
            <br/>
            <br/>
        </div>
    )
}
