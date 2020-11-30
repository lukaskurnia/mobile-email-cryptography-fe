import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Form, Input, Button} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import Mail from "api/mail";

import classes from "./index.module.scss";

const Compose = () => {
  const [from] = useState("tubeskripto@gmail.com");
  const [subject, setSubject] = useState("");
  const [to, setRecipient] = useState("");
  const [text, setText] = useState("");

  const {TextArea} = Input;
  const [form] = Form.useForm();
  const history = useHistory();

  const send = async () => {
    try {
      const data = {
        to,
        subject,
        text
      };
      await Mail.send(data).then(res => res.data);
      history.push("/sent");
    } catch (e) {
      console.error(e);
    }
  };

  const updateInput = ({subject, to, text}) => {
    if (subject) {
      setSubject(subject);
    }
    if (to) {
      setRecipient(to);
    }
    if (text) {
      setText(text);
    }
  };

  return (
    <div className={classes.compose}>
      <Form form={form} onValuesChange={updateInput} onFinish={send}>
        <Form.Item name="from" className={classes.box} initialValue={from}>
          <Input
            prefix={<span className={classes.label}>From</span>}
            readOnly
            className={classes.input}
          />
        </Form.Item>
        <Form.Item name="to" className={classes.box}>
          <Input
            prefix={<span className={classes.label}>To</span>}
            placeholder="wakgeng@gmail.com"
            className={classes.input}
          />
        </Form.Item>
        <Form.Item name="subject" className={classes.box}>
          <Input placeholder="Subject" className={classes.input} />
        </Form.Item>
        <Form.Item name="text">
          <TextArea
            bordered={false}
            autoSize
            placeholder="Compose Email"
            style={{fontSize: "1rem"}}
          />
        </Form.Item>

        <Button
          type="primary"
          className={classes.button}
          shape="circle"
          htmlType="submit"
          size="large"
          icon={
            <FontAwesomeIcon className={classes.icon} icon={faPaperPlane} />
          }
        />
      </Form>
    </div>
  );
};

export default Compose;
