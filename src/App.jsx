import './App.css'
import Draws from './components/draws.jsx'
import Releases from './components/releases.jsx'
import Results  from './components/results.jsx'
import { useState } from 'react'

function App() {
  const [draws, setDraws] = useState([['a', 'b', 'c', 'd', 'e', 'f']])
  const [releases, setReleases] = useState({0:['a', 'b', 'c', 'd', 'e', 'f']})
  const [results, setResults] = useState([])

  //Draws handlers
  const addDrawHandler = () => {
      const newDraws = [...draws, ['', '', '', '', '', '']]
      setDraws(newDraws)
  }

  const changeDrawHandler = (idx, inputIdx, value) => {
      const newDraws = [...draws]
      newDraws[idx][inputIdx] = value
      alert(`newDraws: ${newDraws}`)
      setDraws(newDraws)
  }

  const deleteDrawHandler = (idx) => {
      const newDraws = [...draws.slice(0, idx), ...draws.slice(idx + 1)]
      setDraws(newDraws)
  }

  
  //Releases handlers
  const addReleaseHandler = () => {
      const newReleases = [...releases, {0:['', '', '', '', '', '']}]
      setReleases(newReleases)
  }

  const changeReleaseHandler = (idx, inputIdx, value) => {
      const newReleases = [...releases]
      newReleases[idx][inputIdx] = value
      alert(`newReleases: ${newReleases[0][0]}`)
  }

  const deleteReleaseHandler = (idx) => {
      const newReleases = [...releases.slice(0, idx), ...releases.slice(idx + 1)]
      setReleases(newReleases)
  }

  //Results handlers
  const checkHandler = () => {
    const newResults = [...results]
    for(let drawIdx = 0; drawIdx < draws.length; drawIdx++) {
          newResults[drawIdx] = []
          for (let releaseIdx = 0; releaseIdx < releases.length; releaseIdx++) {
            let tempResult = [];
            for (let i = 0; i < 6; i++) {
              if (draws[drawIdx][i] === releases[releaseIdx][i]) {
                tempResult.push(releases[releaseIdx][i]);
              }
            }
            if (tempResult.length >= 3) {
              newResults[drawIdx] = [...newResults[drawIdx], {releaseIdx: tempResult}];
              setResults(newResults);
            }              
        }
    }
  }

  return (
    <>
      <h1>Mark Sixer</h1>
      <Draws draws={draws} addDrawHandler={addDrawHandler} changeDrawHandler={changeDrawHandler} deleteDrawHandler={deleteDrawHandler}/>
      <Releases releases={releases} addReleaseHandler={addReleaseHandler} changeReleaseHandler={changeReleaseHandler} deleteReleaseHandler={deleteReleaseHandler}/>
      <Results results={results}/>
      <button type='button' onClick={checkHandler}>Check</button>
    </>
  )
}

export default App
