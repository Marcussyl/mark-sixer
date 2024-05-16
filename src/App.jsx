import Draws from './components/draws.jsx'
import Releases from './components/releases.jsx'
import Results  from './components/results.jsx'
import { useState, useEffect } from 'react'
import './App.scss'


function App() {
  const [draws, setDraws] = useState([[]]) //draw
  const [releases, setReleases] = useState([[]]) //1st element: release number
  const [results, setResults] = useState([[]]) //[[[release no, draw1 & release1 matches], [release no, draw1 & release2 matches]],[[release no, draw2 & release1 matches]]] 

  //storage persistence
  useEffect(() => {
    const draws = window.localStorage.getItem('Mark_Sixer_Draws')
    const releases = window.localStorage.getItem('Mark_Sixer_Releases')
    const results = window.localStorage.getItem('Mark_Sixer_Results')
    
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
  }, [draws])

  useEffect(() => {
    window.localStorage.setItem('Mark_Sixer_Releases', JSON.stringify(releases))
  }, [releases])

  useEffect(() => {
    window.localStorage.setItem('Mark_Sixer_Results', JSON.stringify(results))
  }, [results])
  
  /**
   * check if there are matches between draws and releases lists
   * store the matches in results state
   */
  const checkHandler = () => {
    let newResults = []
    for(let drawIdx = 0; drawIdx < draws.length; drawIdx++) {
      let draw = draws[drawIdx]
      newResults[drawIdx] = []
      for(let releaseIdx = 0; releaseIdx < releases.length; releaseIdx++) {
        let release = releases[releaseIdx].slice(1);
        let tempResult = [releases[releaseIdx][0]];
        for (let i = 0; i < 6; i++) {
          if (release.indexOf(draw[i]) !== -1) {
            tempResult.push(draw[i]);
          }
        }
        if(tempResult.length >= 4){
          newResults[drawIdx].push(tempResult);
          setResults(newResults); 
        }
      }
    }
  }

  return (
    <>
      <div className='main-container'>
        <div className='left-container'>
          <div className='input-container'>
            <Draws draws={draws} setDraws={setDraws}/>
            <Releases releases={releases} setReleases={setReleases}/>
          </div>
          <button type='button' onClick={checkHandler} className='check-button'>Check</button>
        </div>
        <div className='right-container'>
          <h1>Mark Sixer</h1>
          <Results results={results}/>
        </div>
      </div> 
    </>
  )
}

export default App
