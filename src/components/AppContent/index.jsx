import React from 'react';
import Ant from '../Ant';
import Sorting from '../Sorting';

export default function AppContent() {
    return (
        
        <div className="app-content section">
            <h5 className="algo-title">Algorithms</h5>
            <Sorting />
            <Ant />
        </div>
        
    )
}
