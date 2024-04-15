import PropTypes from 'prop-types'

function Results (props) {
    const {results, releases} = props

    return (
        <div>
            <h2>Results</h2>
            <p>{results.join(',')}</p>
            <table style={{ borderCollapse: 'collapse' }}>
                <tr>
                    <th style={{ border: '1px solid black', padding: '8px' }}></th>
                    {
                        releases.map((release) => (
                            <th key={release[0]} style={{ border: '1px solid black', padding: '8px' }}>{release[0]}</th>
                        ))
                        
                    }
                </tr>
                
                {
                    results.map((result, drawIdx) => (
                        <tr key={drawIdx}>
                            <th style={{ border: '1px solid black', padding: '8px' }}>Draw {drawIdx}</th>
                            {
                                result.map((drawReleaseMatch, releaseIdx) => (
                                    <td key={releaseIdx} style={{ border: '1px solid black', padding: '8px' }}>{drawReleaseMatch.join(' ')}</td>
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