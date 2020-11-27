import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faEnvelope} from "@fortawesome/free-solid-svg-icons";

import "./index.scss";

const TopBar = ({onDrawerClick}) => {
  const name = "tubeskripto@gmail.com";

  return (
    <div className="topbar-container">
      <p className="hamburger-icon">
        <FontAwesomeIcon icon={faBars} onClick={onDrawerClick} />
      </p>
      <div>
        <p className="product">
          <FontAwesomeIcon
            icon={faEnvelope}
            onClick={onDrawerClick}
            className="icon"
          />
          <b>KriptMail</b>
        </p>
        <p className="username">
          Welcome <b>{name}</b>!
        </p>
      </div>
    </div>
  );
};

export default TopBar;
