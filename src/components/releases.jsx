import Release from './release.jsx'
import PropTypes from 'prop-types'
import './releases.css'

function Releases (props) {
    const {releases, addReleaseHandler, changeReleaseHandler, deleteReleaseHandler} = props

    return (
        <div className='releases-container'>
            <h2>Releases</h2>
            {
                releases.map((release, idx) => (
                    <div key={idx}>
                        <Release release={release} changeReleaseHandler={(inputIdx, value) => changeReleaseHandler(idx, inputIdx, value)} deleteReleaseHandler={() => deleteReleaseHandler(idx)}/>
                    </div>
                    
                ))
            }
            <br></br>
            <button type='button' onClick={addReleaseHandler}>Add</button>
        </div>
    )
}

Releases.propTypes = {
    releases: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    addReleaseHandler: PropTypes.func.isRequired,
    deleteReleaseHandler: PropTypes.func.isRequired,
    changeReleaseHandler: PropTypes.func.isRequired
};

export default Releases