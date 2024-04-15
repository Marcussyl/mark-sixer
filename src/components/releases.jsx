import Release from './release.jsx'
import PropTypes from 'prop-types'

function Releases (props) {
    const {releases, addReleaseHandler, changeReleaseHandler, deleteReleaseHandler} = props

    return (
        <>
            <h2>Releases</h2>
            {
                releases.map((release, idx) => {
                    return <Release key={idx} release={release} changeReleaseHandler={(inputIdx, value) => changeReleaseHandler(idx, inputIdx, value)} deleteReleaseHandler={() => deleteReleaseHandler(idx)}/>
                })
            }
            <br></br>
            <br></br>
            <button type='button' onClick={addReleaseHandler}>Add</button>
        </>
    )
}

Releases.propTypes = {
    releases: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    addReleaseHandler: PropTypes.func.isRequired,
    deleteReleaseHandler: PropTypes.func.isRequired,
    changeReleaseHandler: PropTypes.func.isRequired
};

export default Releases