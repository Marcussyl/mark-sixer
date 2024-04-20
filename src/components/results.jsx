import PropTypes from 'prop-types';
import '../scss/results.scss';

function Results (props) {
    const {results, releases} = props

    return (
        <div className='results-container'>
            <h2>Results</h2>
            <br></br>
            <table>
                <tr>
                    <th></th>
                    {
                        releases.map((release) => (
                            <th key={release[0]} className='header'>{release[0]}</th>
                        ))
                        
                    }
                </tr>
                
                {
                    results.map((result, drawIdx) => (
                        <tr key={drawIdx}>
                            <th className='header'>Draw {drawIdx}</th>
                            {
                                result.map((drawReleaseMatch, releaseIdx) => (
                                    <td key={releaseIdx} className='match'>{drawReleaseMatch.join(' ')}</td>
                                ))
                            }
                        </tr>
                    ))
                }
            </table>
        </div>
    )
}



Results.propTypes = {
    results: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    releases: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
    draws: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
}

export default Results