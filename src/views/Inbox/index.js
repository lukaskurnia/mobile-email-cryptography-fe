import React, {useState, useEffect} from "react";
import {Spin} from "antd";
import Mail from "api/mail";
import MailCard from "components/MailCard";

import classes from "./index.module.scss";

const Inbox = () => {
  const [inboxData, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInbox = async () => {
      setLoading(true);
      const data = await Mail.inbox().then(res => res.data);
      // Reverse order, most recent sent email will be on the top
      setData(data.reverse());
      setLoading(false);
    };
    fetchInbox();
  }, []);

  return (
    <div className={classes.inbox}>
      <p className={classes.title}>ALL INBOXES</p>
      <Spin spinning={loading} size="large">
        {inboxData.length > 0
          ? inboxData.map((data, index) => (
              // TODO: change id from index to ID from email
              <MailCard message={data} type="inbox" id={index} key={index} />
            ))
          : null}
      </Spin>
    </div>
  );
};

export default Inbox;
