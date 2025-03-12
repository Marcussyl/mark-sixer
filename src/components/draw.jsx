import PropTypes from 'prop-types'
import { useContext } from 'react'
import { DrawContext } from '../App'
import { DeleteOutlined } from "@ant-design/icons";
import { InputNumber } from 'antd';

function Draw (props) {
    const {id} = props
    const {draws, deleteDraw, updateDraw, inputRef} = useContext(DrawContext)
    const draw = draws[id]

    // const onChange = (value) => {
    //     console.log(value);
    //     updateDraw(id, 1, value)
    // };

    return (
      <div className="draw">
        <label htmlFor="draw" className='caveat-400'>{id + 1}</label> &nbsp;&nbsp;
        <div className='input-container'>    
            <input
            type="tel"
            id="drawNum1"
            name="drawNum1"
                    value={draw[0]}
                    ref={(el) => {inputRef.current[id][0] = el}}
            onChange={(event) => updateDraw(id, 0, event.target.value)}
                />
//                 <InputNumber size="small" min={1} max={100000} onChange={(value) => updateDraw(id, 0, value)} value={draw[0]} type='tel'/>
            -
            <input
            type="tel"
            id="drawNum2"
            name="drawNum2"
                    value={draw[1]}
                    ref={(el) => {inputRef.current[id][1] = el}}
            onChange={(event) => updateDraw(id, 1, event.target.value)}
            />
            -
            <input
            type="tel"
            id="drawNum3"
            name="drawNum3"
                    value={draw[2]}
                    ref={(el) => {inputRef.current[id][2] = el}}
            onChange={(event) => updateDraw(id, 2, event.target.value)}
            />
            -
            <input
            type="tel"
            id="drawNum4"
            name="drawNum4"
                    value={draw[3]}
                    ref={(el) => {inputRef.current[id][3] = el}}
            onChange={(event) => updateDraw(id, 3, event.target.value)}
            />
            -
            <input
            type="tel"
            id="drawNum5"
            name="drawNum5"
                    value={draw[4]}
                    ref={(el) => {inputRef.current[id][4] = el}}
            onChange={(event) => updateDraw(id, 4, event.target.value)}
            />
            -
            <input
            type="tel"
            id="drawNum6"
            name="drawNum6"
                    value={draw[5]}
                    ref={(el) => {inputRef.current[id][5] = el}}
            onChange={(event) => updateDraw(id, 5, event.target.value)}
            />
        </div>
        &nbsp;&nbsp;
        <DeleteOutlined onClick={() => deleteDraw(id)} className='delete-btn'/>
      </div>
    );
    
}

Draw.propTypes = {
    id: PropTypes.number.isRequired,
};

export default Draw