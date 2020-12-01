import React from "react";
import {Avatar} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

import classes from "./index.module.scss";

const MailCard = ({message, type}) => {
  const {to, subject, date, from} = message;

  return (
    <div className={classes.sent_card}>
      <div>
        <Avatar
          size={48}
          icon={<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>}
        />
      </div>
      <div className={classes.detail_card}>
        <div className={classes.desc}>
          <div style={{minWidth: 0}}>
            {type === "inbox" ? (
              <p className={classes.preview}>{from[0]}</p>
            ) : (
              <p className={classes.preview}>
                <span style={{color: "#d9d9d9"}}>To: </span>
                {to[0]}
              </p>
            )}
            <p className={classes.preview}>{subject[0]}</p>
          </div>
          <p className={classes.preview}>{date[0]}</p>
        </div>
        <p className={classes.preview}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
        </p>
      </div>
    </div>
  );
};

export default MailCard;
