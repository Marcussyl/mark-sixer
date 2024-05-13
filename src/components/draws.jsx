import Draw from './draw.jsx'
import PropTypes from 'prop-types'
import '../scss/draws.scss'
import { Modal } from 'antd'

function Draws(props) {
    const {draws, addDrawHandler, deleteDrawHandler, changeDrawHandler, onFileChange, isModalOpen, setIsModalOpen, match} = props

    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='draws-container'>
            <h2>Your Draws</h2>
            <input type="file" onChange={onFileChange} />
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
            <Modal title="Match results" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>{match}</p>
                <img  src='../assets/icon.png' alt='logo'/>
                <link rel="icon" type="image/png" href="./src/assets/icon.png" />
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
    match: PropTypes.string.isRequired
};

export default Draws