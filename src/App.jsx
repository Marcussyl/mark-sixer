import Draws from "./components/draws.jsx";
import Releases from "./components/releases.jsx";
import Results from "./components/results.jsx";
import React, { useState } from "react";
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

  function addDraw() {
    const updatedDraws = [...draws, ["", "", "", "", "", ""]];
    setDraws(updatedDraws);
  }
  
  function updateDraw(drawIdx, fieldIdx, value) {
    const updatedDraws = [...draws];
    updatedDraws[drawIdx][fieldIdx] = value;
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
  }

  function updateRelease(releaseIdx, fieldIdx, value) {
    const updatedReleases = [...releases];
    updatedReleases[releaseIdx][fieldIdx] = value;
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
    <DrawContext.Provider value={{draws, addDraw, updateDraw, deleteDraw, setDraws}}>
      <Draws/>
    </DrawContext.Provider>
  )

  const ReleaseComponent = () => (
    <ReleaseContext.Provider value={{releases, addRelease, updateRelease, deleteRelease, setReleases}}> 
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
