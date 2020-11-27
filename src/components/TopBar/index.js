import React from "react";
import {Layout} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars} from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

const {Header} = Layout;

const TopBar = ({onDrawerClick}) => {
  const name = "Tubes Kripto";

  return (
    <Header className="topbar">
      <div className="topbar-container">
        <div className="hamburger-icon">
          <FontAwesomeIcon
            icon={faBars}
            onClick={onDrawerClick}
            style={{fontSize: "20px"}}
          />
        </div>
        <p className="name">Welcome {name} !</p>
      </div>
    </Header>
  );
};

export default TopBar;
