import PropTypes from 'prop-types'

function Draw (props) {
    const {id, draw, deleteDrawHandler, changeDrawHandler} = props

    return (
        <div className="draw">
            <label htmlFor="draw">{id}</label> &nbsp;&nbsp;
            <input type="text" id="drawNum1" name="drawNum1" value={draw[0]} onChange={(event) => changeDrawHandler(0, event.target.value)}/>-
            <input type="text" id="drawNum2" name="drawNum2" value={draw[1]} onChange={(event) => changeDrawHandler(1, event.target.value)}/>-
            <input type="text" id="drawNum3" name="drawNum3" value={draw[2]} onChange={(event) => changeDrawHandler(2, event.target.value)}/>-
            <input type="text" id="drawNum4" name="drawNum4" value={draw[3]} onChange={(event) => changeDrawHandler(3, event.target.value)}/>-
            <input type="text" id="drawNum5" name="drawNum5" value={draw[4]} onChange={(event) => changeDrawHandler(4, event.target.value)}/>-
            <input type="text" id="drawNum6" name="drawNum6" value={draw[5]} onChange={(event) => changeDrawHandler(5, event.target.value)}/>
            <button type='button' onClick={deleteDrawHandler}>delete</button>
        </div>
    )
    
}

Draw.propTypes = {
    id: PropTypes.number.isRequired,
    draw: PropTypes.number.isRequired,
    deleteDrawHandler: PropTypes.func.isRequired,
    changeDrawHandler: PropTypes.func.isRequired
};

export default Draw