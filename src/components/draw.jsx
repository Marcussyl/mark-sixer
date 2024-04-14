import PropTypes from 'prop-types'

function Draw (props) {
    const {id, draw, deleteHandler} = props

    return (
        <div className="draw">
            <label htmlFor="draw">{id}</label> &nbsp;&nbsp;
            <input type="text" id="draw" name="draw" placeholder={draw[0]}></input>-<input type="text" id="draw" name="draw"></input>-<input type="text" id="draw" name="draw"></input>-<input type="text" id="draw" name="draw"></input>-<input type="text" id="draw" name="draw"></input>-<input type="text" id="draw" name="draw"></input>
            <button type='button' onClick={deleteHandler}>delete</button>
        </div>
    )
    
}

Draw.propTypes = {
    key: PropTypes.number.isRequired,
    draw: PropTypes.number.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
};

export default Draw