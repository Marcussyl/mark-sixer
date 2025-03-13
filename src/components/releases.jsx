import Release from "./release.jsx";
import { useState, useContext } from "react";
import {
  PlusSquareOutlined,
  SearchOutlined,
  SyncOutlined,
  DownOutlined,
  DollarTwoTone,
} from "@ant-design/icons";
import { Button, Flex, Dropdown, Space } from "antd";
import { ReleaseContext } from "../App.jsx";

// const handleButtonClick = (e) => {
//   message.info("Click on left button.");
//   console.log("click left button", e);
// };


function Releases() {
  const { releases, addRelease } = useContext(ReleaseContext);
  const [loadings, setLoadings] = useState([]);
  const [retCount, setRetCount] = useState(5);

  const handleMenuClick = (e) => {
    document.querySelector(
      "#dropdown-text"
    ).innerHTML = `No. of rel to retrieve: ${e.key}`;
    setRetCount(e.key);
  };

  const menuItems = ((count) => {
    return Array.from({ length: count }, (_, index) => ({
      label: (index + 1).toString(),
      key: (index + 1).toString(),
      icon: <DollarTwoTone/>,
    }));
  })(10);

  const menuProps = {
    items: menuItems,
    onClick: handleMenuClick,
  };

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

  return (
    <div className="releases-container">
      <Flex gap="small" justify="center" wrap>
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
          Retrieve releases
        </Button>
        <Dropdown menu={menuProps}>
          <Button>
            <Space>
              <div id="dropdown-text">No. of rel to retrieve</div>
              <DownOutlined />
            </Space>
          </Button>
        </Dropdown>
      </Flex>
      <div className="release-container">
        {releases.map((release, idx) => (
          <div key={idx}>
            <Release id={idx} />
          </div>
        ))}
      </div>
      <PlusSquareOutlined className="add-btn" onClick={addRelease} />
    </div>
  );
}

export default Releases;
