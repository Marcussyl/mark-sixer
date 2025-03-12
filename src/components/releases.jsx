import Release from "./release.jsx";
import { useState, useContext } from "react";
import {
  PlusSquareOutlined,
  SearchOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import { Button, Flex, InputNumber } from "antd";
import { ReleaseContext } from "../App.jsx";

function Releases() {
  const { releases, addRelease } = useContext(ReleaseContext);
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
            />
          </div>
        ))}
      </div>
      <PlusSquareOutlined className="add-btn" onClick={addRelease} />
    </div>
  );
}

export default Releases;
