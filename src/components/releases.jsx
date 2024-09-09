import Release from "./release.jsx";
import PropTypes from "prop-types";
import "../scss/releases.scss";
import { useState } from "react";
import Tesseract from "tesseract.js";
function Releases(props) {
  const { releases, setReleases } = props;
  const [progress, setProgress] = useState(0);

  //Releases handlers
  const addReleaseHandler = () => {
    const newReleases = [...releases, ["", "", "", "", "", "", ""]];
    setReleases(newReleases);
  };

  const changeReleaseHandler = (idx, inputIdx, value) => {
    const newReleases = [...releases];
    newReleases[idx][inputIdx] = value;
    setReleases(newReleases);
  };

  const deleteReleaseHandler = (idx) => {
    const newReleases = [...releases.slice(0, idx), ...releases.slice(idx + 1)];
    setReleases(newReleases);
  };

  //Text extraction
  const processResult = (result) => {
    // const pattern = /(\d+\+\d+\+\d+\+\d+\+\d+\+\d+)/g;
    // const matches = result.match(pattern);

    // if (matches) {
    //   setMatch(matches);
    // } else {
    //   console.log("No matches found.");
    // }

    // setIsModalOpen(true);

    console.log(result);
  };

  const onFileChange = (e) => {
    Tesseract.recognize(e.target.files[0], "eng", {
      logger: (m) => {
        //console.log(m);
        if (m.status === "recognizing text") {
          setProgress(m.progress);
        }
      },
    }).then(({ data: { text } }) => {
      console.log(`Raw text: ${text}`);
      processResult(text);
    });
  };

  return (
    <div className="releases-container">
      <h2>Releases</h2>
      <div className={"tesseract-container"}>
        <input type="file" onChange={onFileChange} />
        <progress value={progress} max={1} />
      </div>
      <div className="release-container">
        {releases.map((release, idx) => (
          <div key={idx}>
            <Release
              release={release}
              changeReleaseHandler={(inputIdx, value) =>
                changeReleaseHandler(idx, inputIdx, value)
              }
              deleteReleaseHandler={() => deleteReleaseHandler(idx)}
            />
          </div>
        ))}
      </div>
      <br></br>
      <button type="button" onClick={addReleaseHandler}>
        Add
      </button>
    </div>
  );
}

Releases.propTypes = {
  releases: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  setReleases: PropTypes.func.isRequired,
};

export default Releases;
