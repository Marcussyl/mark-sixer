import PropTypes from 'prop-types'
import { useContext } from 'react'
import { DrawContext } from '../App'
import { DeleteOutlined } from "@ant-design/icons";

function Draw (props) {
    const {id} = props
    const {draws, deleteDraw, updateDraw} = useContext(DrawContext)
    const draw = draws[id]

    return (
      <div className="draw">
        <label htmlFor="draw" className='caveat-400'>{id+1}</label> &nbsp;&nbsp;
        <input
          type="text"
          id="drawNum1"
          name="drawNum1"
          value={draw[0]}
          onChange={(event) => updateDraw(id, 0, event.target.value)}
        />
        -
        <input
          type="text"
          id="drawNum2"
          name="drawNum2"
          value={draw[1]}
          onChange={(event) => updateDraw(id, 1, event.target.value)}
        />
        -
        <input
          type="text"
          id="drawNum3"
          name="drawNum3"
          value={draw[2]}
          onChange={(event) => updateDraw(id, 2, event.target.value)}
        />
        -
        <input
          type="text"
          id="drawNum4"
          name="drawNum4"
          value={draw[3]}
          onChange={(event) => updateDraw(id, 3, event.target.value)}
        />
        -
        <input
          type="text"
          id="drawNum5"
          name="drawNum5"
          value={draw[4]}
          onChange={(event) => updateDraw(id, 4, event.target.value)}
        />
        -
        <input
          type="text"
          id="drawNum6"
          name="drawNum6"
          value={draw[5]}
          onChange={(event) => updateDraw(id, 5, event.target.value)}
        />
        &nbsp;&nbsp;
        <DeleteOutlined onClick={() => deleteDraw(id)} className='delete-btn'/>
      </div>
    );
    
}

Draw.propTypes = {
    id: PropTypes.number.isRequired,
};

export default Draw