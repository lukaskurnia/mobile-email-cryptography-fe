import React from "react";
import {useLocation} from "react-router-dom";
import Compose from "./Compose";
import Main from "./Main";

const TopBar = ({onDrawerClick}) => {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/compose" ? (
        <Compose />
      ) : (
        <Main onDrawerClick={onDrawerClick} />
      )}
    </>
  );
};

export default TopBar;
