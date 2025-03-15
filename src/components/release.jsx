import PropTypes from 'prop-types';
import { DeleteOutlined } from "@ant-design/icons";
import { ReleaseContext } from '../App';
import { useContext } from 'react';

function Release (props) {
    const { id } = props
    const { releases, updateRelease, deleteRelease, releaseInputRef } = useContext(ReleaseContext)
    const release = releases[id];

    return (
      <div className="release">
        <label htmlFor="draw" className="caveat-400">
          {id + 1}&nbsp;&nbsp;
        </label>
        <div className="input-container">
          <input
            type="tel"
            id="termNum"
            name="termNum"
            value={release[0]}
            ref={(el) => {
              releaseInputRef.current[id][0] = el;
            }}
            onChange={(event) => updateRelease(id, 0, event.target.value)}
          />
          &nbsp;
          <input
            type="tel"
            id="releaseNum1"
            name="releaseNum1"
            value={release[1]}
            ref={(el) => {
              releaseInputRef.current[id][1] = el;
            }}
            onChange={(event) => updateRelease(id, 1, event.target.value)}
          />
          -
          <input
            type="tel"
            id="releaseNum2"
            name="releaseNum2"
            value={release[2]}
            ref={(el) => {
              releaseInputRef.current[id][2] = el;
            }}
            onChange={(event) => updateRelease(id, 2, event.target.value)}
          />
          -
          <input
            type="tel"
            id="releaseNum3"
            name="releaseNum3"
            value={release[3]}
            ref={(el) => {
              releaseInputRef.current[id][3] = el;
            }}
            onChange={(event) => updateRelease(id, 3, event.target.value)}
          />
          -
          <input
            type="tel"
            id="releaseNum4"
            name="releaseNum4"
            value={release[4]}
            ref={(el) => {
              releaseInputRef.current[id][4] = el;
            }}
            onChange={(event) => updateRelease(id, 4, event.target.value)}
          />
          -
          <input
            type="tel"
            id="releaseNum5"
            name="releaseNum5"
            value={release[5]}
            ref={(el) => {
              releaseInputRef.current[id][5] = el;
            }}
            onChange={(event) => updateRelease(id, 5, event.target.value)}
          />
          -
          <input
            type="tel"
            id="releaseNum6"
            name="releaseNum6"
            value={release[6]}
            ref={(el) => {
              releaseInputRef.current[id][6] = el;
            }}
            onChange={(event) => updateRelease(id, 6, event.target.value)}
          />
          &nbsp;
          <input
            type="tel"
            id="releaseNum7"
            name="releaseNum7"
            value={release[7]}
            ref={(el) => {
              releaseInputRef.current[id][7] = el;
            }}
            onChange={(event) => updateRelease(id, 7, event.target.value)}
          />
        </div>
        &nbsp;&nbsp;
        <DeleteOutlined
          onClick={() => deleteRelease(id)}
          className="delete-btn"
        />
      </div>
    );
}

Release.propTypes = {
    id: PropTypes.number.isRequired,
};

export default Release