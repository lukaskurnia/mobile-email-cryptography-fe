import React from "react";
import {Link} from "react-router-dom";
import {Menu} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
  faInbox,
  faPlusCircle,
  faShareSquare,
  faKey
} from "@fortawesome/free-solid-svg-icons";

const Navigation = ({onClose}) => {
  return (
    <>
      <Menu defaultSelectedKeys={["2"]} mode="inline">
        <Menu.Item key="1" onClick={onClose}>
          <FontAwesomeIcon icon={faPlusCircle} style={{marginRight: "10px"}} />
          <Link to="/compose">Compose</Link>
        </Menu.Item>

        <Menu.Item key="2" onClick={onClose}>
          <FontAwesomeIcon icon={faInbox} style={{marginRight: "10px"}} />
          <Link to="/">Inbox</Link>
        </Menu.Item>

        <Menu.Item key="3" onClick={onClose}>
          <FontAwesomeIcon icon={faShareSquare} style={{marginRight: "10px"}} />
          <Link to="/sentbox">Sent</Link>
        </Menu.Item>

        <Menu.Item key="4" onClick={onClose}>
          <FontAwesomeIcon icon={faKey} style={{marginRight: "10px"}} />
          <Link to="/generate_key">Generate Key</Link>
        </Menu.Item>
      </Menu>
    </>
  );
};

export default Navigation;
