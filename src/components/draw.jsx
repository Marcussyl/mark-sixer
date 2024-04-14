import PropTypes from 'prop-types'

function Draw (props) {

    return (
        <div className="draw">
            <label htmlFor="draw">{props.idx}</label>
            <input type="text" id="draw" name="draw"></input>-<input type="text" id="draw" name="draw"></input>-<input type="text" id="draw" name="draw"></input>-<input type="text" id="draw" name="draw"></input>-<input type="text" id="draw" name="draw"></input>-<input type="text" id="draw" name="draw"></input>
        </div>
    )

    
}

Draw.propTypes = {
    idx: PropTypes.number.isRequired
};

export default Draw