import Release from "./release.jsx";
import { useState, useContext } from "react";
import {
  PlusSquareOutlined,
  FieldNumberOutlined,
  DollarTwoTone,
  ClearOutlined
} from "@ant-design/icons";
import { Button, Flex, Dropdown, Tooltip } from "antd";
import { ReleaseContext } from "../App.jsx";

function Releases() {
  const { releases, addRelease, setReleases, openMessage } = useContext(ReleaseContext);
  const [retCount, setRetCount] = useState(5);

  const handleMenuClick = (e) => {
    document.querySelector(
      "#dropdown-text"
    ).innerHTML = `Get latest draw results online (count: ${e.key})`;
    setRetCount(e.key);
  };

  const handleButtonClick = async () => {
    console.log('Button clicked');
    openMessage('getDrawResult', 'loading', 'Getting draw results...');
    const url = `https://mark-six-results-scraper.netlify.app/api/mark-six-results?count=${retCount}`;
    console.log(`url: ${url}`);
    const response = await fetch(url, {
      method: "GET",
    })

    if (!response.ok) {
      const errorMessage = `Error: ${response.status} ${response.statusText}`;
      openMessage("getDrawResult", "error", errorMessage);
      console.error(errorMessage);
    }

    const data = await response.json()
    console.log(JSON.stringify(data));
    openMessage("getDrawResult", "success", "Get draw results successfully");
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

  return (
    <div className="releases-container">
      <Flex gap="small" justify="center" wrap>
        <Dropdown.Button
          menu={menuProps}
          placement="bottom"
          icon={<FieldNumberOutlined />}
          onClick={handleButtonClick}
        >
          <div id="dropdown-text">
            Get latest draw results online
          </div>
        </Dropdown.Button>
      </Flex>
      <div className="release-container">
        {releases.map((release, idx) => (
          <div key={idx}>
            <Release id={idx} />
          </div>
        ))}
      </div>
      <PlusSquareOutlined className="add-btn" onClick={addRelease} />
      <Tooltip title="Clear all entries" className="clear-btn">
        <Button
          type="default"
          shape="circle"
          icon={<ClearOutlined />}
          onClick={() => setReleases([])}
        />
      </Tooltip>
    </div>
  );
}

export default Releases;
