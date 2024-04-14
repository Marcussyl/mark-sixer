import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Draws from './components/draws.jsx'
import Releases from './components/releases.jsx'
import Results  from './components/results.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Draws />
    <Releases />
    <Results />
  </React.StrictMode>,
)
