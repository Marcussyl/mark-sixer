import Draws from "./components/draws.jsx";
import Releases from "./components/releases.jsx";
import Results from "./components/results.jsx";
import React, { useEffect, useRef, useState } from "react";
import "./scss/App.scss";
import { DiffOutlined, HighlightOutlined, BarChartOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';

export const DrawContext = React.createContext();
export const ReleaseContext = React.createContext();
export const ResultContext = React.createContext();

function App() {
  const [draws, setDraws] = useState([]);
  const [releases, setReleases] = useState([]);
  const [results, setResults] = useState([[]]);
  const [drawFocusIdx, setDrawFocusIdx] = useState([0,0]);
  const [relFocusIdx, setRelFocusIdx] = useState([0,0]);
  const inputRef = useRef([[]]);
  const releaseInputRef = useRef([[]]);

  useEffect(() => {
    console.log("focusing...");
    const rowIdx = drawFocusIdx[0];
    const fieldIdx = drawFocusIdx[1];
    if (inputRef.current[rowIdx][fieldIdx]) {
      inputRef.current[rowIdx][fieldIdx].focus();
    }
  }, [draws, drawFocusIdx])
  
  useEffect(() => {
    console.log("focusing...");
    const rowIdx = relFocusIdx[0];
    const fieldIdx = relFocusIdx[1];
    if (releaseInputRef.current[rowIdx][fieldIdx]) {
      releaseInputRef.current[rowIdx][fieldIdx].focus();
    }
  }, [releases, relFocusIdx])

  function addDraw() {
    const updatedDraws = [...draws, ["", "", "", "", "", ""]];
    setDraws(updatedDraws);
    inputRef.current.push([])
  }
  
  function updateDraw(drawIdx, fieldIdx, value) {
    if(value.length === 2) {
      const newFieldIdx = (fieldIdx + 1) > 5 ? fieldIdx : fieldIdx + 1;
      setDrawFocusIdx([drawIdx, newFieldIdx]);
    } else {
      setDrawFocusIdx([drawIdx, fieldIdx])
    }
    const updatedDraws = [...draws];
    updatedDraws[drawIdx][fieldIdx] = value.trimEnd();
    setDraws(updatedDraws);
  }

  function deleteDraw(idx) {
    const updatedDraws = [...draws];
    updatedDraws.splice(idx, 1);
    setDraws(updatedDraws);
  }

  function addRelease() {
    const updatedReleases = [...releases, ["", "", "", "", "", "", ""]];
    setReleases(updatedReleases);
    releaseInputRef.current.push([]);
  }

  function updateRelease(releaseIdx, fieldIdx, value) {
    if (value.length === 2) {
      const newFieldIdx = fieldIdx + 1 > 8 ? fieldIdx : fieldIdx + 1;
      setRelFocusIdx([releaseIdx, newFieldIdx]);
    } else {
      setRelFocusIdx([releaseIdx, fieldIdx]);
    }
    const updatedReleases = [...releases];
    updatedReleases[releaseIdx][fieldIdx] = value.trimEnd();
    setReleases(updatedReleases);
  }

  function deleteRelease(idx) {
    const updatedReleases = [...releases];
    updatedReleases.splice(idx, 1);
    setReleases(updatedReleases);
  }

  /**
   * check if there are matches between draws and releases lists
   * store the matches in results state
   */
  const checkHandler = () => {
    let newResults = [];
    for (let drawIdx = 0; drawIdx < draws.length; drawIdx++) {
      let draw = draws[drawIdx];
      newResults[drawIdx] = [];
      for (let releaseIdx = 0; releaseIdx < releases.length; releaseIdx++) {
        let release = releases[releaseIdx].slice(1);
        let tempResult = [releases[releaseIdx][0]];
        for (let i = 0; i < 6; i++) {
          if (release.indexOf(draw[i]) !== -1) {
            tempResult.push(draw[i]);
          }
        }
        if (tempResult.length >= 4) {
          newResults[drawIdx].push(tempResult);
          setResults(newResults);
        }
      }
    }
  };

  const DrawComponent = () => (
    <DrawContext.Provider value={{draws, addDraw, updateDraw, deleteDraw, setDraws, inputRef}}>
      <Draws/>
    </DrawContext.Provider>
  )

  const ReleaseComponent = () => (
    <ReleaseContext.Provider value={{releases, addRelease, updateRelease, deleteRelease, setReleases, releaseInputRef}}> 
      <Releases/>
    </ReleaseContext.Provider>
  )

  const MatchComponent = () => (
    <ResultContext.Provider value={{results, checkHandler}}>
      <Results/>
    </ResultContext.Provider>
  )

  const tabNames = ['Draws', 'Releases', 'Matches'];

  return (
    <>
      {/* <h1>Hello world!</h1> */}
      <div className="main-container">
        <h1 className="titan-one-regular"> Mark Sixer </h1> 
        <Tabs
          defaultActiveKey="1"
          centered
          items={[DiffOutlined, HighlightOutlined, BarChartOutlined].map((Icon, i) => {
            const id = String(i + 1);
            return {
              key: id,
              label: `${tabNames[i]}`,
              children: id === '1' ? <DrawComponent/> : id === '2' ? <ReleaseComponent/> : <MatchComponent/>,
              icon: <Icon />,
            };
          })}
        />
      </div>
    </>
  );
}

export default App;
