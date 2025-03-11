import Draws from "./components/draws.jsx";
import Releases from "./components/releases.jsx";
import Results from "./components/results.jsx";
import React, { useState } from "react";
import "./scss/App.scss";
import { OpenCvProvider } from "opencv-react";
import { DiffOutlined, HighlightOutlined, BarChartOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';

export const DrawContext = React.createContext();

function App() {
  const [draws, setDraws] = useState([]);
  const [releases, setReleases] = useState([]); //1st element: release number
  const [results, setResults] = useState([[]]); //[[[release no, draw1 & release1 matches], [release no, draw1 & release2 matches]],[[release no, draw2 & release1 matches]]]

  function updateDraw(drawIdx, fieldIdx, value) {
    // In React, you should never mutate state directly because it can lead to inconsistencies in the UI and prevent React from detecting changes properly.
    console.log("Updating...");
    console.log("old draws:"+JSON.stringify(draws));
    const updatedDraws = [...draws];
    updatedDraws[drawIdx][fieldIdx] = value;
    setDraws(updatedDraws);
    console.log("updated draws:" + JSON.stringify(draws));
  }

  function addDraw() {
    const updatedDraws = [...draws, ["", "", "", "", "", ""]];
    setDraws(updatedDraws);
  }

  function deleteDraw(idx) {
    const updatedDraws = [...draws];
    updatedDraws.splice(idx, 1);
    setDraws(updatedDraws);
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
      <Draws draws={draws} setDraws={setDraws} />
    </DrawContext.Provider>
  )

  const ReleaseComponent = () => (
    <div>
      <OpenCvProvider>
        <Releases releases={releases} setReleases={setReleases} />
      </OpenCvProvider>
    </div>
  )

  const MatchComponent = () => (
    <Results results={results} checkHandler={checkHandler}/>
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
