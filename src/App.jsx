import './App.css'
import Draws from './components/draws.jsx'
import Releases from './components/releases.jsx'
import Results  from './components/results.jsx'
import { useState } from 'react'

function App() {
  const [draws, setDraws] = useState([['', '', '', '', '', '']]) //draw
  const [releases, setReleases] = useState([['125', '1', '2', '3', '11', '12', '13'],['256', '2','3','4','5','6','7']]) //term number: release
  const [results, setResults] = useState([[['23','56','76'],['12','45','13']],[['43','15','67']]]) //[[[draw1 & release1 matches], [draw1 & release2 matches]],[[draw2 & release1 matches]]]

  //Draws handlers
  const addDrawHandler = () => {
      const newDraws = [...draws, ['', '', '', '', '', '']]
      setDraws(newDraws)
  }

  const changeDrawHandler = (idx, inputIdx, value) => {
      const newDraws = [...draws]
      newDraws[idx][inputIdx] = value
      //alert(`newDraws: ${newDraws}`)
      setDraws(newDraws)
  }

  const deleteDrawHandler = (idx) => {
      const newDraws = [...draws.slice(0, idx), ...draws.slice(idx + 1)]
      setDraws(newDraws)
  }

  
  //Releases handlers
  const addReleaseHandler = () => {
      const newReleases = [...releases, ['', '', '', '', '', '', '']]
      setReleases(newReleases)
  }

  const changeReleaseHandler = (idx, inputIdx, value) => {
      const newReleases = [...releases]
      newReleases[idx][inputIdx] = value
      setReleases(newReleases)
      //alert(`newReleases: ${newReleases[0]}`)
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
      //alert(`newResults: ${newResults}`)
      for(let releaseIdx = 0; releaseIdx < releases.length; releaseIdx++) {
        let tempResult = [];
        for (let i = 0; i < 6; i++) {
          if (draws[drawIdx][i] === releases[releaseIdx][i+1]) {
            tempResult.push(releases[releaseIdx][i+1]);
            alert(`draw ${draws[drawIdx][i]} and release ${releases[releaseIdx][i+1]} match`)
          }
        }
        if (tempResult.length >= 3) {
          newResults[drawIdx] = [...newResults[drawIdx], tempResult];
          //alert(`newResults: ${newResults}`)
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
      <Results results={results} releases={releases} draws={draws}/>
      <button type='button' onClick={checkHandler}>Check</button>
    </>
  )
}

export default App
