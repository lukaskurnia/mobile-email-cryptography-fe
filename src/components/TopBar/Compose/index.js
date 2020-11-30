import React from "react";
import {useHistory} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faEnvelope} from "@fortawesome/free-solid-svg-icons";

import classes from "./index.module.scss";

const TopBarCompose = () => {
  const history = useHistory();

  const goToHome = () => {
    history.push("/");
  };

  const back = () => {
    history.goBack();
  };

  return (
    <div className={classes.topbar}>
      <p className={classes.back}>
        <FontAwesomeIcon icon={faArrowLeft} onClick={back} />
        <span className={classes.title}>Compose</span>
      </p>
      <div>
        <p className={classes.product} onClick={goToHome}>
          <FontAwesomeIcon icon={faEnvelope} className={classes.icon} />
          <b>KriptMail</b>
        </p>
      </div>
    </div>
  );
};

export default TopBarCompose;
