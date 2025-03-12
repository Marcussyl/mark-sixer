import PropTypes from 'prop-types';
import { DeleteOutlined } from "@ant-design/icons";

function Release (props) {
    const {id, release, deleteReleaseHandler, changeReleaseHandler} = props

    return (
        <div className="release">
        <label htmlFor="draw" className='caveat-400'>{id+1}</label> &nbsp;&nbsp;
        <input
          type="text"
          id="termNum"
          name="termNum"
          value={release[0]}
          onChange={(event) => changeReleaseHandler(0, event.target.value)}
        />{" "}
        &nbsp;
        <input
          type="text"
          id="releaseNum1"
          name="releaseNum1"
          value={release[1]}
          onChange={(event) => changeReleaseHandler(1, event.target.value)}
        />
        -
        <input
          type="text"
          id="releaseNum2"
          name="releaseNum2"
          value={release[2]}
          onChange={(event) => changeReleaseHandler(2, event.target.value)}
        />
        -
        <input
          type="text"
          id="releaseNum3"
          name="releaseNum3"
          value={release[3]}
          onChange={(event) => changeReleaseHandler(3, event.target.value)}
        />
        -
        <input
          type="text"
          id="releaseNum4"
          name="releaseNum4"
          value={release[4]}
          onChange={(event) => changeReleaseHandler(4, event.target.value)}
        />
        -
        <input
          type="text"
          id="releaseNum5"
          name="releaseNum5"
          value={release[5]}
          onChange={(event) => changeReleaseHandler(5, event.target.value)}
        />
        -
        <input
          type="text"
          id="releaseNum6"
          name="releaseNum6"
          value={release[6]}
          onChange={(event) => changeReleaseHandler(6, event.target.value)}
        />
        &nbsp; / &nbsp;
        <input
          type="text"
          id="releaseNum7"
          name="releaseNum7"
          value={release[7]}
          onChange={(event) => changeReleaseHandler(7, event.target.value)}
        />
        &nbsp;&nbsp;
        <DeleteOutlined onClick={deleteReleaseHandler} className="delete-btn" />
      </div>
    );
}

Release.propTypes = {
    id: PropTypes.number.isRequired,
    release: PropTypes.arrayOf(PropTypes.string).isRequired,
    deleteReleaseHandler: PropTypes.func.isRequired,
    changeReleaseHandler: PropTypes.func.isRequired,
};

export default Release