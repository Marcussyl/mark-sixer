import Draws from "./components/draws.jsx";
import Releases from "./components/releases.jsx";
import Results from "./components/results.jsx";
import React, { useCallback, useEffect, useRef, useState } from "react";
import "./scss/App.scss";
import {
  CloudSyncOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  SearchOutlined,
  SettingOutlined,
  UserOutlined,
  ExportOutlined,
  ImportOutlined,
} from "@ant-design/icons";
import { FloatButton, message, Tooltip } from "antd";
import {
  normalizeBallNumber,
  getPrizeTier,
  validateDrawLine,
  validateReleaseLine,
} from "./utils/balls";

export const DrawContext = React.createContext();
export const ReleaseContext = React.createContext();
export const ResultContext = React.createContext();
const binUrl = "https://api.jsonbin.io/v3/b/67d30f688960c979a570e782";

const TABS = [
  { key: "3", id: "matches", labelZh: "核對中獎" },
  { key: "1", id: "draws", labelZh: "我的獎券" },
  { key: "2", id: "releases", labelZh: "開獎結果" },
];

function App() {
  const [draws, setDraws] = useState([]);
  const [releases, setReleases] = useState([]);
  const [results, setResults] = useState([]);
  const [drawFocusIdx, setDrawFocusIdx] = useState([0, 0]);
  const [relFocusIdx, setRelFocusIdx] = useState([0, 0]);
  const [activeTabKey, setActiveTabKey] = useState("1");
  const drawInputRef = useRef([[]]);
  const releaseInputRef = useRef([[]]);
  const fileImportRef = useRef(null);
  const [messageApi, contextHolder] = message.useMessage();

  const openMessage = useCallback(
    (key, type, content, duration = 2) => {
      messageApi.open({ key, type, content, duration });
    },
    [messageApi]
  );

  useEffect(() => {
    const rowIdx = drawFocusIdx[0];
    const fieldIdx = drawFocusIdx[1];
    if (drawInputRef.current[rowIdx]?.[fieldIdx]) {
      drawInputRef.current[rowIdx][fieldIdx].focus();
    }
  }, [draws, drawFocusIdx]);

  useEffect(() => {
    const storedDraws = window.localStorage.getItem("Mark_Sixer_Draws");
    const storedReleases = window.localStorage.getItem("Mark_Sixer_Releases");
    const storedResults = window.localStorage.getItem("Mark_Sixer_Results");
    const storedTab = window.localStorage.getItem("Mark_Sixer_ActiveTabKey");

    if (storedDraws && storedReleases && storedResults) {
      try {
        const parsedDraws = JSON.parse(storedDraws);
        const parsedReleases = JSON.parse(storedReleases);
        drawInputRef.current.push(
          ...Array.from({ length: parsedDraws.length }, () => [])
        );
        releaseInputRef.current.push(
          ...Array.from({ length: parsedReleases.length }, () => [])
        );
        setDraws(parsedDraws);
        setReleases(parsedReleases);
        setResults(JSON.parse(storedResults));
      } catch (error) {
        console.error("Error parsing stored data:", error);
        openMessage(
          "loadData",
          "error",
          `無法讀取本機儲存資料：${error}`
        );
      }
    }

    if (storedTab) {
      setActiveTabKey(storedTab);
    }
  }, [openMessage]);

  useEffect(() => {
    window.localStorage.setItem("Mark_Sixer_Draws", JSON.stringify(draws));
  }, [draws]);

  useEffect(() => {
    window.localStorage.setItem("Mark_Sixer_Releases", JSON.stringify(releases));
  }, [releases]);

  useEffect(() => {
    window.localStorage.setItem("Mark_Sixer_Results", JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    window.localStorage.setItem("Mark_Sixer_ActiveTabKey", activeTabKey);
  }, [activeTabKey]);

  useEffect(() => {
    const rowIdx = relFocusIdx[0];
    const fieldIdx = relFocusIdx[1];
    if (releaseInputRef.current[rowIdx]?.[fieldIdx]) {
      releaseInputRef.current[rowIdx][fieldIdx].focus();
    }
  }, [releases, relFocusIdx]);

  async function backupData() {
    openMessage("syncStates", "loading", "正在備份…");
    const states = { draws, releases };
    try {
      const response = await fetch(binUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key":
            "$2a$10$fCSP7fbhCIa4FwLQj9Z3kOhmc1vmRHGkom7/dNwjzlkOlyMSV/pVi",
        },
        body: JSON.stringify(states),
      });
      if (!response.ok) {
        openMessage(
          "syncStates",
          "error",
          `錯誤：${response.status} ${response.statusText}`
        );
        return;
      }
      openMessage("syncStates", "success", "備份成功");
    } catch (error) {
      console.error("Error updating resource:", error);
      openMessage("syncStates", "error", "備份失敗");
    }
  }

  async function retrieveData() {
    openMessage("syncStates", "loading", "正在取得備份…");
    try {
      const response = await fetch(binUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key":
            "$2a$10$fCSP7fbhCIa4FwLQj9Z3kOhmc1vmRHGkom7/dNwjzlkOlyMSV/pVi",
        },
      });
      if (!response.ok) {
        openMessage(
          "syncStates",
          "error",
          `錯誤：${response.status} ${response.statusText}`
        );
        return;
      }
      const data = await response.json();
      const prevDraws = data.record.draws || [];
      const prevReleases = data.record.releases || [];
      drawInputRef.current.push(
        ...Array.from({ length: prevDraws.length }, () => [])
      );
      releaseInputRef.current.push(
        ...Array.from({ length: prevReleases.length }, () => [])
      );
      setDraws([...draws, ...prevDraws]);
      setReleases([...releases, ...prevReleases]);
      openMessage("syncStates", "success", "已成功還原備份");
    } catch (error) {
      console.error("Error retrieving:", error);
      openMessage("syncStates", "error", "還原失敗");
    }
  }

  function exportLocalJson() {
    const payload = {
      version: 1,
      exportedAt: new Date().toISOString(),
      draws,
      releases,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mark-sixer-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    openMessage("localExport", "success", "已匯出本機 JSON");
  }

  function importLocalJson(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        const nextDraws = Array.isArray(data.draws) ? data.draws : [];
        const nextReleases = Array.isArray(data.releases) ? data.releases : [];
        drawInputRef.current = Array.from(
          { length: Math.max(nextDraws.length, 1) },
          () => []
        );
        releaseInputRef.current = Array.from(
          { length: Math.max(nextReleases.length, 1) },
          () => []
        );
        setDraws(nextDraws);
        setReleases(nextReleases);
        setResults([]);
        openMessage(
          "localImport",
          "success",
          `已匯入 ${nextDraws.length} 注 / ${nextReleases.length} 期`
        );
      } catch (err) {
        openMessage("localImport", "error", `匯入失敗：${err.message}`);
      }
    };
    reader.readAsText(file);
  }

  function addDraw() {
    setDraws([...draws, ["", "", "", "", "", ""]]);
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
    updatedDraws[drawIdx] = [...updatedDraws[drawIdx]];
    updatedDraws[drawIdx][fieldIdx] = value.trimEnd().replace(/\*$/, "");
    setDraws(updatedDraws);
  }

  function deleteDraw(idx) {
    const updatedDraws = [...draws];
    updatedDraws.splice(idx, 1);
    setDraws(updatedDraws);
  }

  function clearDraws() {
    setDraws([]);
    drawInputRef.current = [[]];
  }

  function addRelease() {
    setReleases([...releases, ["", "", "", "", "", "", "", ""]]);
    releaseInputRef.current.push([]);
  }

  function updateRelease(releaseIdx, fieldIdx, value) {
    if (
      (fieldIdx === 0 && value.length === 3) ||
      (fieldIdx !== 0 && value.length === 2)
    ) {
      const newFieldIdx = fieldIdx + 1 > 7 ? fieldIdx : fieldIdx + 1;
      setRelFocusIdx([releaseIdx, newFieldIdx]);
    } else {
      setRelFocusIdx([releaseIdx, fieldIdx]);
    }
    const updatedReleases = [...releases];
    updatedReleases[releaseIdx] = [...updatedReleases[releaseIdx]];
    updatedReleases[releaseIdx][fieldIdx] = value.trimEnd().replace(/\*$/, "");
    setReleases(updatedReleases);
  }

  function deleteRelease(idx) {
    const updatedReleases = [...releases];
    updatedReleases.splice(idx, 1);
    setReleases(updatedReleases);
  }

  function clearReleases() {
    setReleases([]);
    releaseInputRef.current = [[]];
  }

  function checkHandler() {
    const newResults = [];

    for (let drawIdx = 0; drawIdx < draws.length; drawIdx++) {
      const draw = draws[drawIdx];
      const validation = validateDrawLine(draw);
      if (!validation.ok) continue;

      const drawNums = draw.map(normalizeBallNumber);
      const drawMatches = [];

      for (let releaseIdx = 0; releaseIdx < releases.length; releaseIdx++) {
        const release = releases[releaseIdx];
        if (!release || release.length < 8) continue;
        const relValidation = validateReleaseLine(release);
        if (!relValidation.ok) continue;

        const releaseId = release[0];
        const mainBalls = release.slice(1, 7).map(normalizeBallNumber);
        const specialBall = normalizeBallNumber(release[7]);

        const matchedMains = mainBalls.filter((n) => drawNums.includes(n));
        const specialHit = specialBall !== null && drawNums.includes(specialBall);
        const mainHits = matchedMains.length;
        const prize = getPrizeTier(mainHits, specialHit);

        // Include ALL valid draw×release comparisons (winners and non-winners)
        // so the Matches page can render non-winner ticket cards.
        drawMatches.push({
          releaseId,
          releaseIdx,
          prize,
          mainHits,
          specialHit,
          matchedMains,
          matchedSpecial: specialHit ? specialBall : null,
          drawNums,
          releaseMains: mainBalls,
          releaseSpecial: specialBall,
        });
      }

      if (drawMatches.length > 0) {
        newResults[drawIdx] = drawMatches;
      }
    }

    setResults(newResults);
    return newResults;
  }

  function onTabChange(key) {
    setActiveTabKey(key);
    if (key === "3") {
      checkHandler();
    }
  }

  const DrawComponent = () => (
    <DrawContext.Provider
      value={{
        draws,
        addDraw,
        updateDraw,
        deleteDraw,
        clearDraws,
        setDraws,
        drawInputRef,
        openMessage,
        onCheckMatches: () => {
          checkHandler();
          setActiveTabKey("3");
        },
      }}
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
        clearReleases,
        setReleases,
        releaseInputRef,
        openMessage,
        contextHolder,
      }}
    >
      <Releases />
    </ReleaseContext.Provider>
  );

  const MatchComponent = () => (
    <ResultContext.Provider
      value={{ results, checkHandler, draws, releases, openMessage }}
    >
      <Results />
    </ResultContext.Provider>
  );

  return (
    <div className="ms-app">
      {contextHolder}
      <header className="ms-header">
        <div className="ms-header__inner">
          <div className="ms-brand">
            <div className="ms-brand__mark" aria-hidden>
              <span className="material-symbols-outlined">verified</span>
            </div>
            <div className="ms-brand__text">
              <span className="ms-brand__name">Mark Sixer</span>
              <span className="ms-brand__zh">六合彩核對器</span>
            </div>
          </div>

          <nav className="ms-tabs" role="tablist" aria-label="主要導覽">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTabKey === tab.key}
                className={`ms-tabs__item${activeTabKey === tab.key ? " is-active" : ""}`}
                onClick={() => onTabChange(tab.key)}
              >
                <span className="ms-tabs__zh">{tab.labelZh}</span>
              </button>
            ))}
          </nav>

          <div className="ms-header__actions">
            <div className="ms-sync-badge ms-soon" title="即時馬會同步尚未接駁（即將推出）">
              <span className="ms-sync-badge__dot" />
              <span className="ms-sync-badge__label">
                馬會同步：<strong>即將推出</strong>
              </span>
            </div>
            <Tooltip title="搜尋（即將推出）">
              <button type="button" className="ms-icon-btn ms-soon" disabled aria-label="搜尋（即將推出）">
                <SearchOutlined />
              </button>
            </Tooltip>
            <Tooltip title="設定（即將推出）">
              <button type="button" className="ms-icon-btn ms-soon" disabled aria-label="設定（即將推出）">
                <SettingOutlined />
              </button>
            </Tooltip>
            <Tooltip title="帳戶（即將推出）">
              <button type="button" className="ms-icon-btn ms-avatar ms-soon" disabled aria-label="帳戶（即將推出）">
                <UserOutlined />
              </button>
            </Tooltip>
          </div>
        </div>
      </header>

      <main className="ms-main">
        <div className="ms-main__inner">
          {activeTabKey === "1" && <DrawComponent />}
          {activeTabKey === "2" && <ReleaseComponent />}
          {activeTabKey === "3" && <MatchComponent />}
        </div>
      </main>

      <footer className="ms-footer">
        <div className="ms-footer__inner">
          <div className="ms-footer__meta">
            <strong>Mark Sixer V2.4</strong>
            <span>獨立核對工具，與香港馬會無關</span>
          </div>
          <div className="ms-footer__links">
            <button type="button" className="ms-footer__link" onClick={exportLocalJson}>
              匯出 JSON
            </button>
            <button
              type="button"
              className="ms-footer__link"
              onClick={() => fileImportRef.current?.click()}
            >
              匯入備份
            </button>
            <input
              ref={fileImportRef}
              type="file"
              accept="application/json,.json"
              hidden
              onChange={(e) => {
                importLocalJson(e.target.files?.[0]);
                e.target.value = "";
              }}
            />
            <span className="ms-footer__link ms-soon" aria-disabled>
              雲端備份（即將推出）
            </span>
            <span className="ms-footer__link ms-soon" aria-disabled>
              開獎歷史（即將推出）
            </span>
            <span className="ms-footer__link ms-soon" aria-disabled>
              系統設置（即將推出）
            </span>
          </div>
        </div>
      </footer>

      <FloatButton.Group
        className="ms-float"
        trigger="click"
        type="primary"
        style={{ insetInlineEnd: 24 }}
        icon={<CloudSyncOutlined />}
      >
        <FloatButton
          icon={<CloudUploadOutlined />}
          onClick={backupData}
          tooltip="備份至雲端"
        />
        <FloatButton
          icon={<CloudDownloadOutlined />}
          onClick={retrieveData}
          tooltip="從雲端還原"
        />
        <FloatButton
          icon={<ExportOutlined />}
          onClick={exportLocalJson}
          tooltip="匯出本機 JSON"
        />
        <FloatButton
          icon={<ImportOutlined />}
          onClick={() => fileImportRef.current?.click()}
          tooltip="匯入本機 JSON"
        />
      </FloatButton.Group>
    </div>
  );
}

export default App;
