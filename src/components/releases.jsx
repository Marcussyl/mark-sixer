import Release from "./release.jsx";
import PropTypes from "prop-types";
import { useState } from "react";
import {
  PlusSquareOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Flex, InputNumber } from "antd";

function Releases(props) {
  const { releases, setReleases } = props;
  const [loadings, setLoadings] = useState([]);

  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        return newLoadings;
      });
    }, 3000);
  };

  //Releases handlers
  const addReleaseHandler = () => {
    const newReleases = [...releases, ["", "", "", "", "", "", ""]];
    setReleases(newReleases);
  };

  const changeReleaseHandler = (idx, inputIdx, value) => {
    const newReleases = [...releases];
    newReleases[idx][inputIdx] = value;
    setReleases(newReleases);
  };

  const deleteReleaseHandler = (idx) => {
    const newReleases = [...releases.slice(0, idx), ...releases.slice(idx + 1)];
    setReleases(newReleases);
  };

  const onChange = (value) => {
    console.log('changed', value);
  };

  return (
    <div className="releases-container">
      <Flex gap="small" vertical>
        <Flex gap="small" align="center" wrap>
          <Button
            icon={<SearchOutlined />}
            loading={
              loadings[3] && {
                icon: <SyncOutlined spin />,
              }
            }
            onClick={() => enterLoading(3)}
            // style={{ background: "#F6D4D2" }}
          >
            Get releases
          </Button>
          <InputNumber min={1} max={10} defaultValue={5} onChange={onChange} changeOnWheel />
        </Flex>
      </Flex>
      <div className="release-container">
        {releases.map((release, idx) => (
          <div key={idx}>
            <Release
              id={idx}
              release={release}
              changeReleaseHandler={(inputIdx, value) =>
                changeReleaseHandler(idx, inputIdx, value)
              }
              deleteReleaseHandler={() => deleteReleaseHandler(idx)}
            />
          </div>
        ))}
      </div>
      <PlusSquareOutlined className="add-btn" onClick={addReleaseHandler} />
    </div>
  );
}

Releases.propTypes = {
  releases: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
  setReleases: PropTypes.func.isRequired,
};

export default Releases;
