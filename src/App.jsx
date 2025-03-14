import Draws from "./components/draws.jsx";
import Releases from "./components/releases.jsx";
import Results from "./components/results.jsx";
import React, { useEffect, useRef, useState } from "react";
import "./scss/App.scss";
import { DiffOutlined, HighlightOutlined, BarChartOutlined, FileSyncOutlined, CloudUploadOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import { Tabs, FloatButton, message } from 'antd';

export const DrawContext = React.createContext();
export const ReleaseContext = React.createContext();
export const ResultContext = React.createContext();

function App() {
  const [draws, setDraws] = useState([]);
  const [releases, setReleases] = useState([]);
  const [results, setResults] = useState([]);
  const [drawFocusIdx, setDrawFocusIdx] = useState([0, 0]);
  const [relFocusIdx, setRelFocusIdx] = useState([0, 0]);
  const inputRef = useRef([[]]);
  const releaseInputRef = useRef([[]]);
  // const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    console.log("focusing...");
    const rowIdx = drawFocusIdx[0];
    const fieldIdx = drawFocusIdx[1];
    if (inputRef.current[rowIdx][fieldIdx]) {
      inputRef.current[rowIdx][fieldIdx].focus();
    }
  }, [draws, drawFocusIdx]);

  useEffect(() => {
    console.log("focusing...");
    const rowIdx = relFocusIdx[0];
    const fieldIdx = relFocusIdx[1];
    if (releaseInputRef.current[rowIdx][fieldIdx]) {
      releaseInputRef.current[rowIdx][fieldIdx].focus();
    }
  }, [releases, relFocusIdx]);

  // function openMessage (key, type, message) {
  //   messageApi.open({
  //     key,
  //     type: type,
  //     content: message,
  //   });
  // }

  async function backupData() {
    const binUrl = "https://api.jsonbin.io/v3/b/67d30f688960c979a570e782";
    const states = {
      draws: draws,
      releases: releases
    }
    console.log(JSON.stringify(states));
    console.log(import.meta.env.VITE_API_KEY);

    try {
      const response = await fetch(binUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "X-Access-Key": import.meta.env.VITE_API_KEY, //https://dev.to/ebereplenty/how-to-use-environment-variables-in-a-reactjs-app-with-vite-3lh0
          "X-Access-Key": "$2a$10$fCSP7fbhCIa4FwLQj9Z3kOhmc1vmRHGkom7/dNwjzlkOlyMSV/pVi"
        },
        body: JSON.stringify(states),
      });

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        console.error(errorMessage);
      }

      const data = await response.json();
      console.log("Update successful:", data);
    } catch (error) {
      console.error("Error updating resource:", error);
    }
  }
  // async function backupData() {
  //   const url = "https://api.jsonbin.io/v3/b/67d30f688960c979a570e782";
  //   const messageKey = "syncStates";
  //   console.log("backing up data...");
  //   const reuqestBody = {
  //     draws: draws,
  //     releases: releases
  //   }
    
  //   openMessage(messageKey, 'loading', "Backing up states...");
  //   const response = await fetch(url, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(reuqestBody)
  //   })

  //   if (!response.ok) {
  //     const errorMessage = `Error: ${response.status} ${response.statusText}`;
  //     openMessage(messageKey,"error", errorMessage)
  //     console.error(errorMessage);
  //   }

  //   openMessage(messageKey, "success", "Data retrieved successfully");
  //   const data = await response.json();
  //   console.log("Data retrieved successfully:", data);
  // }

  function retrieveData () {

  }

  function addDraw() {
    const updatedDraws = [...draws, ["", "", "", "", "", ""]];
    setDraws(updatedDraws);
    inputRef.current.push([]);
  }

  function updateDraw(drawIdx, fieldIdx, value) {
    if (value.length === 2) {
      const newFieldIdx = fieldIdx + 1 > 5 ? fieldIdx : fieldIdx + 1;
      setDrawFocusIdx([drawIdx, newFieldIdx]);
    } else {
      setDrawFocusIdx([drawIdx, fieldIdx]);
    }
    const updatedDraws = [...draws];
    updatedDraws[drawIdx][fieldIdx] = value.trimEnd().replace(/\*$/, "");
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
    updatedReleases[releaseIdx][fieldIdx] = value.trimEnd().replace(/\*$/, "");
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
  // function checkHandler() {
  //   let updatedRes = new Map(); // {drawId: {releaseId: [], releaseId: []}}
  //   // for each draw
  //   for (let dId = 0; dId < draws.length; dId++) {
  //     let draw = draws[dId];
  //     // for each release
  //     for (let rId = 0; rId < releases.length; rId++) {
  //       let release = releases[rId].slice(1);
  //       const temp = [];
  //       // compare is release numbers are exist in draw
  //       for (let i = 0; i < 7; i++) {
  //         if (release[i] !== '' && draw.includes(release[i])) {
  //           console.log(`found match: ${release[i]}`);
  //           temp.push(release[i]);
  //         }
  //       }
  //       console.log(JSON.stringify(temp));
  //       // if there're at least 3 matches, append it into corresponding drawId's array
  //       if (temp.length >= 3) {
  //         updatedRes.set("test", "haha")
  //         if (!updatedRes.has(dId)) {
  //           updatedRes.set(dId, new Map());
  //         }
  //         updatedRes.get(dId).set(rId, temp);
  //       }
  //     }
  //   }

  //   setResults(updatedRes);
  // }
  function checkHandler() {
    let newResults = []; // e.g. newResults[drawId][releaseId]
    
    for (let drawIdx = 0; drawIdx < draws.length; drawIdx++) {
      let draw = draws[drawIdx];
      
      for (let releaseIdx = 0; releaseIdx < releases.length; releaseIdx++) {
        let release = releases[releaseIdx].slice(1);
        let temp = [releases[releaseIdx][0]];

        for (let i = 0; i < 7; i++) {
          if (release[i] !== '' && draw.includes(release[i])) {
            temp.push(release[i]);
          }
        }
        if (temp.length >= 3) {
          if (newResults[drawIdx] === undefined) {
            newResults[drawIdx] = [];
          }
          newResults[drawIdx].push(temp);
        }
      }
    }
    setResults(newResults);
  }

  function onTabChange(key) {
    if (key === "3") {
      checkHandler();
    }
  }

  const DrawComponent = () => (
    <DrawContext.Provider
      value={{ draws, addDraw, updateDraw, deleteDraw, setDraws, inputRef }}
    >
      <Draws />
    </DrawContext.Provider>
  );

  const ReleaseComponent = () => (
    <ReleaseContext.Provider
      value={{
        releases,
        addRelease,
        updateRelease,
        deleteRelease,
        setReleases,
        releaseInputRef,
      }}
    >
      <Releases />
    </ReleaseContext.Provider>
  );

  const MatchComponent = () => (
    <ResultContext.Provider value={{ results, checkHandler }}>
      <Results />
    </ResultContext.Provider>
  );

  const tabNames = ["Draws", "Releases", "Matches"];

  return (
    <div className="main-container">
      <h1 className="titan-one-regular"> Mark Sixer </h1>
      <Tabs
        defaultActiveKey="1"
        centered
        onChange={onTabChange}
        items={[DiffOutlined, HighlightOutlined, BarChartOutlined].map(
          (Icon, i) => {
            const id = String(i + 1);
            return {
              key: id,
              label: `${tabNames[i]}`,
              children:
                id === "1" ? (
                  <DrawComponent />
                ) : id === "2" ? (
                  <ReleaseComponent />
                ) : (
                  <MatchComponent />
                ),
              icon: <Icon />,
            };
          }
        )}
      />
      <FloatButton.Group
        className="float-btn"
        trigger="click"
        type="primary"
        style={{
          insetInlineEnd: 24,
        }}
        icon={<FileSyncOutlined />}
      >
        {/* {contextHolder} */}
        <FloatButton icon={<CloudUploadOutlined />} onClick={backupData} tooltip="Backup states"/>
        <FloatButton icon={<CloudDownloadOutlined />} onClick={retrieveData} tooltip="Retrieve states"/>
      </FloatButton.Group>
    </div>
  );
}

export default App;
