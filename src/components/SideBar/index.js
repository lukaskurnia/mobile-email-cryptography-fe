import React from "react";
import {Drawer} from "antd";
import Navigation from "router/navigation";
import classes from "./index.module.scss";

const SideBar = ({onClose, isDrawerOpen}) => {
  return (
    <Drawer
      title={
        <p className={classes.title}>
          Kript<span className={classes.title__span}>Mail</span>
        </p>
      }
      placement="left"
      closable={false}
      onClose={onClose}
      visible={isDrawerOpen}
      bodyStyle={{
        padding: 0
      }}
    >
      <Navigation onClose={onClose} />
    </Drawer>
  );
};

export default SideBar;
