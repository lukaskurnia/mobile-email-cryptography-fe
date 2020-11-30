import React from "react";
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faEnvelope} from "@fortawesome/free-solid-svg-icons";

import classes from "./index.module.scss";

const TopBar = ({onDrawerClick}) => {
  const history = useHistory();
  const name = "tubeskripto@gmail.com";

  const goToHome = () => {
    history.push("/");
  };

  return (
    <div className={classes.topbar}>
      <p className={classes.hamburger}>
        <FontAwesomeIcon icon={faBars} onClick={onDrawerClick} />
      </p>
      <div>
        <p className={classes.product} onClick={goToHome}>
          <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
          <b>KriptMail</b>
        </p>
        <p className={classes.username}>
          Welcome <b>{name}</b>!
        </p>
      </div>
    </div>
  );
};

export default TopBar;
