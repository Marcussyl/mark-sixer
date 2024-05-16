import Release from './release.jsx'
import PropTypes from 'prop-types'
import '../scss/releases.scss'

function Releases (props) {
    const {releases, setReleases} = props

    //Releases handlers
    const addReleaseHandler = () => {
        const newReleases = [...releases, ['', '', '', '', '', '', '']]
        setReleases(newReleases)
    }

    const changeReleaseHandler = (idx, inputIdx, value) => {
        const newReleases = [...releases]
        newReleases[idx][inputIdx] = value
        setReleases(newReleases)
    }

    const deleteReleaseHandler = (idx) => {
        const newReleases = [...releases.slice(0, idx), ...releases.slice(idx + 1)]
        setReleases(newReleases)
    }

    return (
        <div className='releases-container'>
            <h2>Releases</h2>
            <div className='release-container'>
                {
                    releases.map((release, idx) => (
                        <div key={idx}>
                            <Release release={release} changeReleaseHandler={(inputIdx, value) => changeReleaseHandler(idx, inputIdx, value)} deleteReleaseHandler={() => deleteReleaseHandler(idx)}/>
                        </div>
                        
                    ))
                }
            </div>
            <br></br>
            <button type='button' onClick={addReleaseHandler}>Add</button>
        </div>
    )
}

Releases.propTypes = {
    releases: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    setReleases: PropTypes.func.isRequired
};

export default Releases