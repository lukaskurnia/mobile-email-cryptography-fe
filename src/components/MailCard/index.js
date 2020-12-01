import React from "react";
import {useHistory} from "react-router-dom";
import {Avatar} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

import classes from "./index.module.scss";

const MailCard = ({message, type, id}) => {
  const history = useHistory();
  const {to, subject, date, from} = message;

  const navigate = () => {
    history.push({
      pathname: `/mail/${type}/${id}`
    });
  };

  return (
    <div className={classes.mail_card} onClick={navigate}>
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
      </div>
    </div>
  );
};

export default MailCard;
