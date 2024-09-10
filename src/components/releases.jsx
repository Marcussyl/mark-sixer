import Release from "./release.jsx";
import PropTypes from "prop-types";
import "../scss/releases.scss";
import { useState } from "react";
import Tesseract from "tesseract.js";
import { useOpenCv } from "opencv-react";
import { Modal } from "antd";

function Releases(props) {
  const { releases, setReleases } = props;
  const [progress, setProgress] = useState(0);
  const [match, setMatch] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loaded, cv } = useOpenCv();

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
    const matches = result.trim().split("\n");

    if (matches) {
      setMatch(matches);
    } else {
      console.log("No matches found.");
    }

    setIsModalOpen(true);

    console.log(typeof result);
  };

  const processImage = (image) => {
    return new Promise((resolve) => {
      if (!loaded) {
        console.error("OpenCV is not loaded");
        resolve(null);
        return;
      }

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);

        let src = cv.imread(canvas);
        const dst = new cv.Mat(src.rows, src.cols, cv.CV_8UC3);

        for (let y = 0; y < src.rows; y++) {
          for (let x = 0; x < src.cols; x++) {
            const pixel = src.ucharPtr(y, x);
            if (pixel[0] !== 0 || pixel[1] !== 0 || pixel[2] !== 0) {
              dst.ucharPtr(y, x)[0] = 255;
              dst.ucharPtr(y, x)[1] = 255;
              dst.ucharPtr(y, x)[2] = 255;
            } else {
              dst.ucharPtr(y, x)[0] = pixel[0];
              dst.ucharPtr(y, x)[1] = pixel[1];
              dst.ucharPtr(y, x)[2] = pixel[2];
            }
          }
        }

        cv.imshow(canvas, dst);
        src.delete();
        dst.delete();

        resolve(canvas.toDataURL("image/png"));
      };
      img.src = URL.createObjectURL(image);
    });
  };

  const onFileChange = (e) => {
    const image = e.target.files[0];
    processImage(image).then((processedImage) => {
      Tesseract.recognize(processedImage, "eng", {
        logger: (m) => {
          //console.log(m);
          if (m.status === "recognizing text") {
            setProgress(m.progress);
          }
        },
      }).then(({ data: { text } }) => {
        //console.log(`Raw text: ${text}`);
        processResult(text);
      });
    });
  };

  //Modal handlers
  const handleInputChange = (idx, value) => {
    const updatedMatch = [...match];
    updatedMatch[idx] = value;
    console.log(updatedMatch);
    setMatch(updatedMatch);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    //update the draws list
    const convertedMatch = match.map((mat) => mat.split(" "));
    const updatedReleases = [...releases, ...convertedMatch];
    setReleases(updatedReleases);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="releases-container">
      <h2> Releases </h2>{" "}
      {loaded ? (
        <div className={"tesseract-container"}>
          <input type="file" onChange={onFileChange} />{" "}
          <progress value={progress} max={1} />{" "}
        </div>
      ) : (
        <p> Loading OpenCV... </p>
      )}{" "}
      <div className="release-container">
        {" "}
        {releases.map((release, idx) => (
          <div key={idx}>
            <Release
              release={release}
              changeReleaseHandler={(inputIdx, value) =>
                changeReleaseHandler(idx, inputIdx, value)
              }
              deleteReleaseHandler={() => deleteReleaseHandler(idx)}
            />{" "}
          </div>
        ))}{" "}
      </div>{" "}
      <br />
      <button type="button" onClick={addReleaseHandler}>
        Add{" "}
      </button>{" "}
      <Modal
        title="Match results"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {match &&
          match.map((mat, idx) => (
            <input
              key={idx}
              value={mat}
              onChange={(event) => handleInputChange(idx, event.target.value)}
            />
          ))}{" "}
      </Modal>{" "}
    </div>
  );
}

Releases.propTypes = {
  releases: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  setReleases: PropTypes.func.isRequired,
};

export default Releases;
