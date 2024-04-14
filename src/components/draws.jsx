
import { useState } from 'react'
import Draw from './draw.jsx'

function Draws() {
    const [draws, setDraws] = useState([])

    const addHandler = () => {
        setCount(count + 1)
    }

    const changeHandler = () => {
        const newDraws = [...draws]
        
    }

    return (
        <>
            <h1>Your Draws</h1>
            {
                draws.map((draw, idx) => (
                    <Draw idx={idx} draw={draw} onChange={() => }
                ))
            }
            <button type="button" onClick={addHandler}>Add</button>
        </>
    )
}

export default Draws