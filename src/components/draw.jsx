import PropTypes from 'prop-types'

function Draw (props) {
    const {id, draw, deleteHandler, changeDrawHandler} = props

    return (
        <div className="draw">
            <label htmlFor="draw">{id}</label> &nbsp;&nbsp;
            <input type="text" id="draw" name="draw" placeholder={draw[0]} onChange={changeDrawHandler}/>-<input type="text" id="draw" name="draw"/>-<input type="text" id="draw" name="draw"/>-<input type="text" id="draw" name="draw"/>-<input type="text" id="draw" name="draw"/>-<input type="text" id="draw" name="draw"/>
            <button type='button' onClick={deleteHandler}>delete</button>
        </div>
    )
    
}

Draw.propTypes = {
    key: PropTypes.number.isRequired,
    draw: PropTypes.number.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    changeDrawHandler: PropTypes.func.isRequired
};

export default Draw