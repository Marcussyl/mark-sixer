import PropTypes from 'prop-types'

function Release (props) {
    const {deleteHandler} = props

    return (
        <>
            <input type="number" id="release" name="release"></input> &nbsp;&nbsp;
            <input type="number" id="release" name="release"></input>-<input type="number" id="release" name="release"></input>-<input type="number" id="release" name="release"></input>-<input type="number" id="release" name="release"></input>-<input type="number" id="release" name="release"></input>-<input type="number" id="release" name="release"></input>
            <button type="button" onClick={deleteHandler}>delete</button>
        </>
    )
}

Release.propTypes = {
    dele: PropTypes.number.isRequired,
    draw: PropTypes.number.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired
};

export default Release