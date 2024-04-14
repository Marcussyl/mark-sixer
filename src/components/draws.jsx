
import { useState } from 'react'

function Draws() {
    const [count, setCount] = useState(0)

    const addHandler = () => {
        setCount(count + 1)
    }

    return (
        <>
            <h1>Your Draws</h1>
            <div className="draw">
                <label htmlFor="draw1">{count}</label>
                <input type="text" id="draw1" name="draw"></input>-<input type="text" id="draw2" name="draw"></input>-<input type="text" id="draw3" name="draw"></input>-<input type="text" id="draw4" name="draw"></input>-<input type="text" id="draw5" name="draw"></input>-<input type="text" id="draw6" name="draw"></input>
            </div>
            <button type="button" onClick={addHandler}>Add</button>
        </>
    )
}

export default Draws