import Draws from "./components/draws.jsx";
import Releases from "./components/releases.jsx";
import Results from "./components/results.jsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./scss/App.scss";
import {
  DiffOutlined,
  HighlightOutlined,
  BarChartOutlined,
  CloudSyncOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import { Tabs, FloatButton, message } from 'antd';

export const DrawContext = React.createContext();
export const ReleaseContext = React.createContext();
export const ResultContext = React.createContext();
const binUrl = "https://api.jsonbin.io/v3/b/67d30f688960c979a570e782";

function App() {
  const [draws, setDraws] = useState([]);
  const [releases, setReleases] = useState([]);
  const [results, setResults] = useState([]);
  const [drawFocusIdx, setDrawFocusIdx] = useState([0, 0]);
  const [relFocusIdx, setRelFocusIdx] = useState([0, 0]);
  const drawInputRef = useRef([[]]);
  const releaseInputRef = useRef([[]]);
  const [messageApi, contextHolder] = message.useMessage();

  // const openMessage = (key, type, message, duration = 2) => {
  //   messageApi.open({
  //     key,
  //     type: type,
  //     content: message,
  //     duration: duration
  //   });
  // }

  const openMessage = useCallback((key, type, message, duration = 2) => {
    messageApi.open({
      key,
      type: type,
      content: message,
      duration: duration
    });
  }, [messageApi]);

  useEffect(() => {
    const rowIdx = drawFocusIdx[0];
    const fieldIdx = drawFocusIdx[1];
    if (drawInputRef.current[rowIdx][fieldIdx]) {
      drawInputRef.current[rowIdx][fieldIdx].focus();
    }
  }, [draws, drawFocusIdx]);

  // localstorage persistence
  useEffect(() => {
    const draws = window.localStorage.getItem('Mark_Sixer_Draws')
    const releases = window.localStorage.getItem('Mark_Sixer_Releases')
    const results = window.localStorage.getItem('Mark_Sixer_Results')
    // console.log(`draws: ${draws}, releases: ${releases}, results: ${results}`)

    if (draws && releases && results) {
      try {
        drawInputRef.current.push(...Array.from({ length: JSON.parse(draws).length }, () => []));
        releaseInputRef.current.push(...Array.from({ length: JSON.parse(releases).length }, () => []));
        setDraws(JSON.parse(draws));
        setReleases(JSON.parse(releases));
        setResults(JSON.parse(results));
      } catch (error) {
        console.error('Error parsing stored data:', error);
        openMessage('loadData', 'error', `Error parsing stored data from localstorage ${error}`);
      }
    }
  }, [openMessage])

  useEffect(() => {
    window.localStorage.setItem('Mark_Sixer_Draws', JSON.stringify(draws))
  }, [draws])

  useEffect(() => {
    window.localStorage.setItem('Mark_Sixer_Releases', JSON.stringify(releases))
  }, [releases])

  useEffect(() => {
    window.localStorage.setItem('Mark_Sixer_Results', JSON.stringify(results))
  }, [results])

  useEffect(() => {
    const rowIdx = relFocusIdx[0];
    const fieldIdx = relFocusIdx[1];
    if (releaseInputRef.current[rowIdx][fieldIdx]) {
      releaseInputRef.current[rowIdx][fieldIdx].focus();
    }
  }, [releases, relFocusIdx]);

  async function backupData() {
    openMessage("syncStates", "loading", "Backing up states...");
    
    const states = {
      draws: draws,
      releases: releases
    }

    try {
      const response = await fetch(binUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // "X-Access-Key": import.meta.env.VITE_API_KEY, //https://dev.to/ebereplenty/how-to-use-environment-variables-in-a-reactjs-app-with-vite-3lh0
          "X-Access-Key":
            "$2a$10$fCSP7fbhCIa4FwLQj9Z3kOhmc1vmRHGkom7/dNwjzlkOlyMSV/pVi",
        },
        body: JSON.stringify(states),
      });

      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        openMessage("syncStates", "error", errorMessage);
        console.error(errorMessage);
      }

      const data = await response.json();
      console.log("Update successful:", data);
      openMessage("syncStates", "success", "States received successfully");
    } catch (error) {
      console.error("Error updating resource:", error);
    }
  }

  async function retrieveData () {
    openMessage("syncStates", "loading", "Getting states...");
    const response = await fetch(binUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Access-Key":
          "$2a$10$fCSP7fbhCIa4FwLQj9Z3kOhmc1vmRHGkom7/dNwjzlkOlyMSV/pVi",
      },
    });

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
    }

    const data = await response.json();
    const prevDraws= data["record"]["draws"]
    const prevReleases = data["record"]["releases"];
    // console.log(`prevDraws: ${JSON.stringify(prevDraws)}`);
    // console.log(`prevDraws: ${JSON.stringify(prevReleases)}`);
    // console.log("Data retrieved successfully:", data);
    const updatedDraws = [...draws, ...prevDraws];
    const updatedReleases= [...releases, ...prevReleases];
    drawInputRef.current.push(...Array.from({length: prevDraws.length}, ()=>[]));
    releaseInputRef.current.push(
      ...Array.from({ length: prevReleases.length }, () => [])
    );
    console.log(`updatedDraws: ${JSON.stringify(updatedDraws)}`);
    console.log(`updateRelease: ${JSON.stringify(updatedReleases)}`);
    setDraws(updatedDraws);
    setReleases(updatedReleases);
    openMessage('syncStates', 'success', 'States retrieved successfully');
  }

  function addDraw() {
    const updatedDraws = [...draws, ["", "", "", "", "", ""]];
    setDraws(updatedDraws);
    drawInputRef.current.push([]);
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
    // first field should take 3 numbers
    if((fieldIdx === 0 && value.length === 3) || (fieldIdx !== 0 && value.length === 2)){
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
      value={{ draws, addDraw, updateDraw, deleteDraw, setDraws, drawInputRef }}
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
        openMessage,
        contextHolder
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
        icon={<CloudSyncOutlined />}
      >
        {contextHolder}
        <FloatButton
          icon={<CloudUploadOutlined />}
          onClick={backupData}
          tooltip="Backup states"
        />
        <FloatButton
          icon={<CloudDownloadOutlined />}
          onClick={retrieveData}
          tooltip="Retrieve states"
        />
      </FloatButton.Group>
    </div>
  );
}

export default App;
