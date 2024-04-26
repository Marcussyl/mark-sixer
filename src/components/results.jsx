import PropTypes from 'prop-types';
import '../scss/results.scss';

function Results (props) {
    const {results} = props
    

    return (
        <div className='results-container'>
            <h2>Results</h2>
            <br></br>
            <div className='result-container'>
                {
                    results.map((result, idx) => (
                        result.length > 0 && (
                            <div key={`draw ${idx}`} className='draw-match-container'>
                                <h4>{`Draw ${idx}`}</h4>
                                {
                                    result.map((releaseMatch, idx) => (
                                        <div key={`release ${idx}`} className='release-match-container'>
                                            <p className='release-number'>{`${releaseMatch[0]}: `}</p>
                                            <p>{releaseMatch.slice(1).join(', ')}</p>
                                        </div>
                                    ))
                                } 
                            </div>
                        )
                    ))
                }
            </div>
            
            
            
        </div>
    )
}



Results.propTypes = {
    results: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
}

export default Results