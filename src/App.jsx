import Draws from './components/draws.jsx'
import Releases from './components/releases.jsx'
import Results  from './components/results.jsx'
import { useState, useEffect } from 'react'
import './App.scss'

function App() {
  const [draws, setDraws] = useState([[]]) //draw
  const [releases, setReleases] = useState([[]]) //1st element: release number
  const [results, setResults] = useState([[]]) //[[[draw1 & release1 matches], [draw1 & release2 matches]],[[draw2 & release1 matches]]]

  useEffect(() => {
    const draws = window.localStorage.getItem('Mark_Sixer_Draws')
    const releases = window.localStorage.getItem('Mark_Sixer_Releases')
    const results = window.localStorage.getItem('Mark_Sixer_Results')
    console.log(`draws: ${draws}, releases: ${releases}, results: ${results}`)

    if (draws && releases && results) {
      try {
        setDraws(JSON.parse(draws));
        setReleases(JSON.parse(releases));
        setResults(JSON.parse(results));
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
    }
  }, [])

  useEffect(() => {
    window.localStorage.setItem('Mark_Sixer_Draws', JSON.stringify(draws))
    alert(`setting draws in localstorage ...`)
  }, [draws])

  useEffect(() => {
    window.localStorage.setItem('Mark_Sixer_Releases', JSON.stringify(releases))
    alert(`setting releases in localstorage ...`)
  }, [releases])

  useEffect(() => {
    window.localStorage.setItem('Mark_Sixer_Results', JSON.stringify(results))
    alert(`setting results in localstorage ...`)
  }, [results])

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

  function deepCopy(arr) {
      return JSON.parse(JSON.stringify(arr));
  }

  //Results handlers
  const checkHandler = () => {
    let newResults = deepCopy(results)
    for(let drawIdx = 0; drawIdx < draws.length; drawIdx++) {
      let draw = draws[drawIdx]
      newResults[drawIdx] = []
      //alert(`release length: ${releases.length}`)
      for(let releaseIdx = 0; releaseIdx < releases.length; releaseIdx++) {
        let release = releases[releaseIdx].slice(1);
        //alert(`comparing draw ${drawIdx}: ${draw} with release ${releaseIdx}: ${release}...`)
        let tempResult = [];
        for (let i = 0; i < 6; i++) {
          if (release.indexOf(draw[i]) !== -1) {
            tempResult.push(draw[i]);
            //alert(`draw ${drawIdx} and release ${releaseIdx} match: ${draw[i]}`)
          }
        }
        newResults[drawIdx] = [...newResults[drawIdx], tempResult];
        setResults(newResults);            
      }
    }
  }

  return (
    <>
      <h1>Mark Sixer</h1>
      <div className='main-container'>
        <div className='top-container'>
          <div className='input-container'>
          <Draws draws={draws} addDrawHandler={addDrawHandler} changeDrawHandler={changeDrawHandler} deleteDrawHandler={deleteDrawHandler}/>
          <Releases releases={releases} addReleaseHandler={addReleaseHandler} changeReleaseHandler={changeReleaseHandler} deleteReleaseHandler={deleteReleaseHandler}/>
          </div>
          <br></br>
          <button type='button' onClick={checkHandler} className='check-button'>Check</button>
        </div>
        <Results results={results} releases={releases} draws={draws}/>
      </div> 
    </>
  )
}

export default App
