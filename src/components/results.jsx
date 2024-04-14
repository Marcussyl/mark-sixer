import PropTypes from 'prop-types'

function Results (props) {
    const {results} = props

    return (
        <div>
            <h2>Results</h2>
            {results.map((row, rowIndex) => (
                <div key={rowIndex}>
                    {row.map((item, itemIndex) => {
                        // Extract the key and value from the dictionary
                        const [key, value] = Object.entries(item)[0];
                        return (
                            <div key={itemIndex}>
                                {/* Display the key */}
                                {key}: &nbsp;, 
                                {/* Display the array of numbers */}
                                {value.join(', ')}
                            </div>
                        );
                    })}
                    <br></br>
                </div>
            ))}
        </div>
    )
}

const dictionaryShape = PropTypes.shape({
    // Each dictionary has a single key-value pair, where the key is a number and the value is an array of numbers
    [PropTypes.number.isRequired]: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
});

Results.propTypes = {
    results: PropTypes.arrayOf(PropTypes.arrayOf(dictionaryShape)).isRequired,
}

export default Results