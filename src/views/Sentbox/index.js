import React, {useState, useEffect} from "react";
import {Spin} from "antd";
import Mail from "api/mail";
import MailCard from "components/MailCard";

import classes from "./index.module.scss";

const Sentbox = () => {
  const [sentData, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSentbox = async () => {
      setLoading(true);
      const data = await Mail.sentbox().then(res => res.data);
      // Reverse order, most recent sent email will be on the top
      setData(data.reverse());
      setLoading(false);
    };
    fetchSentbox();
  }, []);

  return (
    <div className={classes.sentbox}>
      <p className={classes.title}>SENT</p>
      <Spin spinning={loading} size="large">
        {sentData.length > 0
          ? sentData.map((data, index) => (
              <MailCard message={data} type="sentbox" id={index} key={index} />
            ))
          : null}
      </Spin>
    </div>
  );
};

export default Sentbox;
