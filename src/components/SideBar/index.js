import React from "react";
import {Drawer} from "antd";
import Navigation from "router/navigation";
import "./index.scss";

const SideBar = ({onClose, isDrawerOpen}) => {
  return (
    <Drawer
      title={
        <p className="title">
          Kript<span className="span-title">Mail</span>
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
