import '../scss/draws.scss'
import { Modal } from 'antd'
import { useState, useContext } from 'react'
import Tesseract from 'tesseract.js'
import Draw from './draw.jsx'
import { DrawContext } from '../App.jsx'
import { PlusSquareOutlined } from "@ant-design/icons";
import { Flex, Progress } from "antd";

function Draws() {
    const [progress, setProgress] = useState(0);
    const [match, setMatch] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    //Draws handlers
    const {draws, addDraw, setDraws} = useContext(DrawContext);

    const processResult = (result) => {
        const pattern = /(\d+\+\d+\+\d+\+\d+\+\d+\+\d+)/g;
        const matches = result.match(pattern);

        if (matches) {
        setMatch(matches)
        } else {
            console.log("No matches found.");
        }
        
        setIsModalOpen(true);
    };

    const onFileChange = (e) => {
        Tesseract.recognize(e.target.files[0], 'eng', {
        logger: (m) => {
            //console.log(m);
            if (m.status === "recognizing text") {
            setProgress(m.progress);
            }
        },
        })
        .then(({ data: { text } }) => {
            console.log(`Raw text: ${text}`);
            processResult(text);
        });
    };

    //Modal handlers
    const handleInputChange = (idx, value) => {
        const updatedMatch = [...match]
        updatedMatch[idx] = value
        console.log(updatedMatch)
        setMatch(updatedMatch)
    }

    const handleOk = () => {
        setIsModalOpen(false);
        //update the draws list
        const convertedMatch = match.map((mat) => (mat.split('+')))
        const updatedDraws = [...draws, ...convertedMatch]
        setDraws(updatedDraws)
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
      <div className="draws-container">
        {/* <h2>Your Draws</h2> */}
        <div>
          <div className={"tesseract-container"}>
            <input type="file" onChange={onFileChange} />
            {/* <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
                <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from
                  uploading company data or other banned files.
                </p>
              </Dragger> */}
            {/* <progress value={progress} max={1} /> */}
            <Flex
              vertical
              gap="small"
              style={{
                width: 180,
              }}
            >
              <Progress percent={progress*100} size="small" showInfo={false}/>
            </Flex>
          </div>
          <div className="draw-container">
            {draws.map((draw, idx) => (
              <Draw key={idx} id={idx} />
            ))}
          </div>
        </div>
        <br></br>
        <PlusSquareOutlined className='add-btn' onClick={addDraw} />

        {/* pop-up window for users to confirm matches after extracting text from image */}
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
            ))}
        </Modal>
      </div>
    );
}

export default Draws