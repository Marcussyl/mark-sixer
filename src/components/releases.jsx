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
  const { releases, addRelease, setReleases, releaseInputRef, openMessage, contextHolder } =
    useContext(ReleaseContext);
  const [retCount, setRetCount] = useState(5);

  const handleMenuClick = (e) => {
    document.querySelector(
      "#dropdown-text"
    ).innerHTML = `Get draw results online (${e.key})`;
    setRetCount(e.key);
  };

  const handleButtonClick = async () => {
    try {
      openMessage('getReleases', 'loading', 'Getting draw results...', 0);
      // openMessage('getReleases', 'success', 'Get draw results successfully');
      const url = `https://mark-six-results-scraper.netlify.app/api/mark-six-results?count=${retCount}`;
      const response = await fetch(url, {
        method: "GET",
      })
  
      if (!response.ok) {
        const errorMessage = `Error: ${response.status} ${response.statusText}`;
        console.error('there is an error');
        setTimeout(() => {
          // openMessage('getReleases', 'success', 'Get draw results successfully');
          openMessage('getReleases', 'error', errorMessage);
        }, 100);
        console.error(errorMessage);
      }
  
      const data = await response.json()
      // console.log(JSON.stringify(data));

      if (data.length === 0) { 
        openMessage('getReleases', 'error', 'No draw results retrieved, please try again');
        return;
      }
  
      const transformedData = data.map((item) => {
        const id = item.id.split("/")[1];
        return [id, ...item.results];
      });
      // console.log(transformedData);
    
      setTimeout(() => {
        openMessage('getReleases', 'success', 'Get draw results successfully');
      }, 100); // delay message to ensure it shows after re-render (re-render will cover the message from showing up) 
      releaseInputRef.current.push(...Array.from({ length: transformedData.length }, () => []));
      const updatedRelease = [...transformedData, ...releases]; // newly retrieved releases should be added at the top of existing releases
      setReleases(updatedRelease);
    } catch (error) {
      console.error("Error fetching data:", error);
      openMessage('getReleases', 'error', 'Error fetching data');
    }
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
        {contextHolder}
        <Dropdown.Button
          menu={menuProps}
          placement="bottom"
          icon={<FieldNumberOutlined />}
          onClick={handleButtonClick}
        >
          <div id="dropdown-text">
            Get draw results online (5)
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
