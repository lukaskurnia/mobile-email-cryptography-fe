import React from "react";
import {Drawer} from "antd";

const SideBar = ({onClose, isDrawerOpen}) => {
  return (
    <Drawer
      title="KriptMail"
      placement="left"
      closable={false}
      onClose={onClose}
      visible={isDrawerOpen}
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Drawer>
  );
};

export default SideBar;
