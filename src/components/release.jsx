import PropTypes from 'prop-types'

function Release (props) {
    const {deleteHandler, changeReleaseHandler} = props

    return (
        <div className='release'>
            <input type="text" id="release" name="release" onChange={(event) => changeReleaseHandler(0, event.target.value)}></input> &nbsp;&nbsp; <input type="text" id="release" name="release"></input>-<input type="text" id="release" name="release"></input>-<input type="text" id="release" name="release"></input>-<input type="text" id="release" name="release"></input>-<input type="text" id="release" name="release"></input>-<input type="text" id="release" name="release"></input>
            <button type="button" onClick={deleteHandler}>delete</button>
        </div>
    )
}

Release.propTypes = {
    draw: PropTypes.number.isRequired,
    deleteHandler: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    changeReleaseHandler: PropTypes.func.isRequired,
};

export default Release