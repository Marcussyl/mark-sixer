import { useState } from 'react'
import Draw from './draw.jsx'

function Draws() {
    const [draws, setDraws] = useState([['', '', '', '', '', '']])

    const addHandler = () => {
        const newDraws = [...draws, ['', '', '', '', '', '']]
        setDraws(newDraws)
    }

    const changeHandler = (idx, inputIdx, value) => {
        const newDraws = [...draws]
        newDraws[idx][inputIdx] = value
        setDraws(newDraws)
    }

    const deleteHandler = (idx) => {
        const newDraws = [...draws.slice(0, idx), ...draws.slice(idx + 1)]
        setDraws(newDraws)
    }

    return (
        <>
            <h1>Your Draws</h1>
            {
                draws.map((draw, idx) => (
                    <Draw key={idx} id={idx} draw={draw} onChange={(inputIdx, value) => changeHandler(idx, inputIdx, value)} deleteHandler={() => deleteHandler(idx)}/>
                ))
            }
            <button type="button" onClick={addHandler}>Add</button>
        </>
    )
}

export default Draws