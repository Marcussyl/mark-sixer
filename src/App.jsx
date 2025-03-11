import Draws from "./components/draws.jsx";
import Releases from "./components/releases.jsx";
import Results from "./components/results.jsx";
import { useState, useEffect } from "react";
import "./scss/App.scss";
import { OpenCvProvider } from "opencv-react";
import { DiffOutlined, HighlightOutlined, BarChartOutlined } from '@ant-design/icons';
import { Tabs } from 'antd';

function App() {
  const [draws, setDraws] = useState([[]]); //draw
  const [releases, setReleases] = useState([[]]); //1st element: release number
  const [results, setResults] = useState([[]]); //[[[release no, draw1 & release1 matches], [release no, draw1 & release2 matches]],[[release no, draw2 & release1 matches]]]

  //storage persistence
  useEffect(() => {
    const draws = window.localStorage.getItem("Mark_Sixer_Draws");
    const releases = window.localStorage.getItem("Mark_Sixer_Releases");
    const results = window.localStorage.getItem("Mark_Sixer_Results");

    if (draws && releases && results) {
      try {
        setDraws(JSON.parse(draws));
        setReleases(JSON.parse(releases));
        setResults(JSON.parse(results));
      } catch (error) {
        console.error("Error parsing stored data:", error);
      }
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("Mark_Sixer_Draws", JSON.stringify(draws));
  }, [draws]);

  useEffect(() => {
    window.localStorage.setItem(
      "Mark_Sixer_Releases",
      JSON.stringify(releases)
    );
  }, [releases]);

  useEffect(() => {
    window.localStorage.setItem("Mark_Sixer_Results", JSON.stringify(results));
  }, [results]);

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
    <Draws draws={draws} setDraws={setDraws} />
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
