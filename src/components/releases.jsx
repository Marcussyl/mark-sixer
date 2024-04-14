import Release from './release.jsx'
import {useState} from 'react'

function Releases () {
    const [releases, setReleases] = useState([['', '', '', '', '', '']])

    const addHandler = () => {
        const newReleases = [...releases, ['', '', '', '', '', '']]
        setReleases(newReleases)
    }

    const changeHandler = (idx, inputIdx, value) => {
        const newReleases = [...releases]
        newReleases[idx][inputIdx] = value
    }

    const deleteHandler = (idx) => {
        const newReleases = [...releases.slice(0, idx), ...releases.slice(idx + 1)]
        setReleases(newReleases)
    }

    return (
        <>
            <h1>Releases</h1>
            {
                releases.map((release, idx) => (
                    <Release key={idx} release={release} onChange={(inputIdx, value) => changeHandler(idx, inputIdx, value)} deleteHandler={() => deleteHandler(idx)}/>
                ))
            }
            <button type='button' onClick={addHandler}>Add</button>
        </>
    )
}

export default Releases