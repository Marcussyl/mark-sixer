import Draw from './draw.jsx'
import PropTypes from 'prop-types'
import '../scss/draws.scss'
import { Modal } from 'antd'

function Draws(props) {
    const {draws, addDrawHandler, deleteDrawHandler, changeDrawHandler, onFileChange, isModalOpen, setIsModalOpen, match, progress, handleInputChange, setDraws} = props

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
    addDrawHandler: PropTypes.func.isRequired,
    deleteDrawHandler: PropTypes.func.isRequired,
    changeDrawHandler: PropTypes.func.isRequired,
    onFileChange: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool.isRequired,
    setIsModalOpen: PropTypes.func.isRequired,
    match: PropTypes.arrayOf(PropTypes.string).isRequired,
    progress: PropTypes.number.isRequired,
    handleInputChange: PropTypes.func.isRequired,
    setDraws: PropTypes.func.isRequired,
};

export default Draws