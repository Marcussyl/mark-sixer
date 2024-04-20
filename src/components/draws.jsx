import Draw from './draw.jsx'
import PropTypes from 'prop-types'
import '../scss/draws.scss'

function Draws(props) {
    const {draws, addDrawHandler, deleteDrawHandler, changeDrawHandler} = props

    return (
        <div className='draws-container'>
            <h2>Your Draws</h2>
            {
                draws.map((draw, idx) => (
                    <div key={idx}>
                        <Draw id={idx} draw={draw} changeDrawHandler={(inputIdx, value) => changeDrawHandler(idx, inputIdx, value)} deleteDrawHandler={() => deleteDrawHandler(idx)}/>
                    </div>
                    
                ))
            }
            <br></br>
            <button type="button" onClick={addDrawHandler}>Add</button>
        </div>
    )
}

Draws.propTypes = {
    draws: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    addDrawHandler: PropTypes.func.isRequired,
    deleteDrawHandler: PropTypes.func.isRequired,
    changeDrawHandler: PropTypes.func.isRequired
};

export default Draws