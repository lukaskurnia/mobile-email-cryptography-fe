import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Form, Input, Button, Switch} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import Mail from "api/mail";
import Crypto from "api/crypto";

import classes from "./index.module.scss";

const Compose = () => {
  const [from] = useState("tubeskripto@gmail.com");
  const [subject, setSubject] = useState("");
  const [to, setRecipient] = useState("");
  const [text, setText] = useState("");
  const [key, setKey] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isEncrypted, setEncrypted] = useState(false);
  const [isSigned, setSigned] = useState(false);

  const {TextArea} = Input;
  const [form] = Form.useForm();
  const history = useHistory();

  const send = async () => {
    try {
      console.log("from", from);
      console.log("subject", subject);
      console.log("to", to);
      console.log("text", text);
      console.log("key", key);
      console.log("privateKey", privateKey);
      console.log("isEncrypted", isEncrypted);
      console.log("isSigned", isSigned);

      let message = text;

      if (isSigned) {
        const signature = await handleSignature(message);
        console.log(signature);
        message += `\n<ds>${signature}</ds>`;
      }

      if (isEncrypted) {
        message = await handleEncrypt(message);
      }

      const data = {
        to,
        subject,
        text: message
      };

      await Mail.send(data).then(res => res.data);
      history.push("/sent");
    } catch (e) {
      console.error(e);
    }
  };

  const handleEncrypt = async msg => {
    try {
      return await Crypto.encrypt({
        message: msg,
        key,
        iv: "abcdefghabcdefghabcdefghabcdefgh"
      }).then(res => res.data.encrypted_message);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSignature = async msg => {
    try {
      return await Crypto.generateSignature({
        message: msg,
        private_key: privateKey
      }).then(res => res.data.signature);
    } catch (e) {
      console.error(e);
    }
  };

  const updateInput = ({subject, to, text, encrypt_key, private_key}) => {
    if (subject) {
      setSubject(subject);
    }
    if (to) {
      setRecipient(to);
    }
    if (text) {
      setText(text);
    }
    if (encrypt_key) {
      setKey(encrypt_key);
    }
    if (private_key) {
      setPrivateKey(private_key);
    }
  };

  const toggleEncrypt = () => {
    setKey("");
    form.setFieldsValue({encrypt_key: ""});
    setEncrypted(!isEncrypted);
  };

  const toggleSignature = () => {
    setPrivateKey("");
    form.setFieldsValue({private_key: ""});
    setSigned(!isSigned);
  };

  const readPrivateKey = async e => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async e => {
      const text = e.target.result;
      setPrivateKey(text);
      form.setFieldsValue({private_key: text});
    };
    reader.readAsText(e.target.files[0]);
  };

  console.log(isEncrypted);
  console.log(isSigned);
  console.log(privateKey);

  return (
    <div className={classes.compose}>
      <div className={classes.switch_group}>
        <Switch size="small" onChange={toggleEncrypt} />
        <p className={classes.label_switch}>Encrypt email</p>
      </div>
      <div className={classes.switch_group}>
        <Switch size="small" onChange={toggleSignature} />
        <p className={classes.label_switch}>Add signature</p>
      </div>
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

        {isEncrypted ? (
          <Form.Item name="encrypt_key" className={classes.box}>
            <Input placeholder="Key (32 Character)" className={classes.input} />
          </Form.Item>
        ) : null}

        {isSigned ? (
          <>
            <Form.Item name="private_key" className={classes.box}>
              <Input
                placeholder="Your private key here.."
                className={classes.input}
                style={{borderBottom: "none"}}
              />
            </Form.Item>
            <div className={classes.uploader}>
              <label>Or upload your private key: </label>
              <input
                type="file"
                onChange={e => readPrivateKey(e)}
                accept=".txt"
              />
            </div>
          </>
        ) : null}

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
