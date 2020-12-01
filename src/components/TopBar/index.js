import React from "react";
import {useLocation} from "react-router-dom";
import BackHeader from "./BackHeader";
import Main from "./Main";

const TopBar = ({onDrawerClick}) => {
  const location = useLocation();

  let topbar;
  if (location.pathname === "/compose") {
    topbar = <BackHeader text="Compose" />;
  } else if (location.pathname.includes("/mail")) {
    topbar = <BackHeader text="Mail" />;
  } else {
    topbar = <Main onDrawerClick={onDrawerClick} />;
  }

  return <>{topbar}</>;
};

export default TopBar;
