import React from 'react'
import { hot } from 'react-hot-loader'

import AppContent from '../AppContent'

import AppStateProvider from './AppStateProvider'

import './style.css'

function App() {
    return (
        <div>
            yo yo
        </div>
        // <AppStateProvider>
        //     <AppContent />
        // </AppStateProvider>
    )
}

export default module.hot ? hot(module)(App) : App
