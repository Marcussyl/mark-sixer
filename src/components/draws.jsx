import Draw from './draw.jsx'
import PropTypes from 'prop-types'
function Draws(props) {
    const {draws, addDrawHandler, deleteDrawHandler, changeDrawHandler} = props

    return (
        <>
            <h2>Your Draws</h2>
            {
                draws.map((draw, idx) => (
                    <Draw key={idx} id={idx} draw={draw} changeDrawHandler={(inputIdx, value) => changeDrawHandler(idx, inputIdx, value)} deleteDrawHandler={() => deleteDrawHandler(idx)}/>
                ))
            }
            <br></br>
            <br></br>
            <button type="button" onClick={addDrawHandler}>Add</button>
        </>
    )
}

Draws.propTypes = {
    draws: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    addDrawHandler: PropTypes.func.isRequired,
    deleteDrawHandler: PropTypes.func.isRequired,
    changeDrawHandler: PropTypes.func.isRequired
};

export default Draws