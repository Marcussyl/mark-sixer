import Draw from './draw.jsx'
import PropTypes from 'prop-types'
import '../scss/draws.scss'
import { Modal } from 'antd'
import { useState } from 'react'
import Tesseract from 'tesseract.js'

function Draws(props) {
    const [progress, setProgress] = useState(0);
    const [match, setMatch] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {draws, setDraws} = props

    //Draws handlers
    const addDrawHandler = () => {
        const newDraws = [...draws, ['', '', '', '', '', '']]
        setDraws(newDraws)
    }

    const changeDrawHandler = (idx, inputIdx, value) => {
        const newDraws = [...draws]
        newDraws[idx][inputIdx] = value
        setDraws(newDraws)
    }

    const deleteDrawHandler = (idx) => {
        const newDraws = [...draws.slice(0, idx), ...draws.slice(idx + 1)]
        setDraws(newDraws)
    }

    //Text extraction
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
        <div className='draws-container'>
            <h2>Your Draws</h2>
            <input type="file" onChange={onFileChange} />
            <progress value={progress} max={1} />
            <div className='draw-container'>
                {
                    draws.map((draw, idx) => (
                        <div key={idx}>
                            <Draw id={idx} draw={draw} changeDrawHandler={(inputIdx, value) => changeDrawHandler(idx, inputIdx, value)} deleteDrawHandler={() => deleteDrawHandler(idx)}/>
                        </div>
                        
                    ))
                }
            </div>
            <br></br>
            <button type="button" onClick={addDrawHandler}>Add</button>
            <Modal title="Match results" centered open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                {/* <p>{match}</p> */}
                {
                    match && match.map((mat, idx) => (
                        <input key={idx} value={mat} onChange={(event) => handleInputChange(idx, event.target.value)}/>
                    ))
                }
            </Modal>
        </div>
    )
}

Draws.propTypes = {
    draws: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    setDraws: PropTypes.func.isRequired,
};

export default Draws