import React, {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import {
  Avatar,
  Form,
  Input,
  Button,
  Switch,
  Spin,
  message as alert
} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser, faCogs} from "@fortawesome/free-solid-svg-icons";
import Crypto from "api/crypto";

import classes from "./index.module.scss";

const Mail = () => {
  const [key, setKey] = useState("");
  const [publicKey1, setPublicKey1] = useState("");
  const [publicKey2, setPublicKey2] = useState("");
  const [isDecrypted, setDecrypted] = useState(false);
  const [isVerify, setVerify] = useState(false);
  const [loading, setLoading] = useState(false);

  // TODO: Replace dummy data with props message (date,from, subject, to, text, id)
  // Dummy Data
  const message = {
    date: ["Thu, 26 Nov 2020 18:33:04 -0800"],
    from: ["Google Community Team <googlecommunityteam-noreply@google.com>"],
    subject: ["Tubes, finish setting up your new Google Account"],
    to: ["tubeskripto@gmail.com"]
  };
  const text =
    "\x98<\x9b?)'BW\x82Îè\x1eðZ\x08\x88#\x9bq9J1WÁJÂÀl»6\x940\n<ds>74a33ff87d36e5281363b1afe690a0e66308a795890cb89a85eaba8d26827ab3262bd1a4d2648b0989fdc442073bd125bbf457a53ada34ffa11e409f6f12a875</ds>";

  const {to, from, date, subject} = message;
  const {type, id} = useParams();

  console.log(type);
  console.log(id);

  const {TextArea} = Input;
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({text: text});
  }, []);

  const process = async () => {
    try {
      setLoading(true);
      console.log("key", key);
      console.log("publicKey1", publicKey1);
      console.log("publicKey2", publicKey2);
      console.log("isDecrypted", isDecrypted);
      console.log("isVerify", isVerify);

      let message = text;

      if (isDecrypted) {
        message = await handleDecrypt(message);
        form.setFieldsValue({decrypted_text: message});
        console.log(message);
      }

      if (isVerify) {
        const status = await handleVerify(message);
        console.log(status);

        if (status) {
          alert.success("This email is verified !");
        } else {
          alert.error("Mismatch, This email is not safe !");
        }
      }
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  const handleDecrypt = async msg => {
    try {
      return await Crypto.decrypt({
        message: msg,
        key,
        iv: "abcdefghabcdefghabcdefghabcdefgh"
      }).then(res => res.data.decrypted_message);
    } catch (e) {
      console.error(e);
    }
  };

  const handleVerify = async msg => {
    try {
      return await Crypto.verify({
        message: msg,
        public_key_1: publicKey1,
        public_key_2: publicKey2
      }).then(res => res.data.status);
    } catch (e) {
      console.error(e);
    }
  };

  const updateInput = ({decrypt_key, public_key_1, public_key_2}) => {
    if (decrypt_key) {
      setKey(decrypt_key);
    }
    if (public_key_1) {
      setPublicKey1(public_key_1);
    }
    if (public_key_2) {
      setPublicKey2(public_key_2);
    }
  };

  const toggleDecrypt = () => {
    setKey("");
    form.setFieldsValue({decrypt_key: "", decrypted_text: ""});
    setDecrypted(!isDecrypted);
  };

  const toggleVerify = () => {
    setPublicKey1("");
    setPublicKey2("");
    form.setFieldsValue({public_key_1: "", public_key_2: ""});
    setVerify(!isVerify);
  };

  const readPublicKey = async (e, args) => {
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async e => {
      const text = e.target.result;
      if (args === 1) {
        setPublicKey1(text);
        form.setFieldsValue({public_key_1: text});
      } else {
        setPublicKey2(text);
        form.setFieldsValue({public_key_2: text});
      }
    };
    reader.readAsText(e.target.files[0]);
  };

  return (
    <Spin spinning={loading} size="large">
      <div className={classes.mail}>
        <p className={classes.subject}>{subject[0]}</p>
        <div className={classes.mail_card}>
          <div>
            <Avatar
              size={48}
              icon={<FontAwesomeIcon icon={faUser}></FontAwesomeIcon>}
            />
          </div>
          <div className={classes.detail_card}>
            <div className={classes.desc}>
              <div style={{minWidth: 0}}>
                <p className={classes.preview}>{from[0]}</p>
                <p className={classes.preview}>to {to[0]}</p>
              </div>
              <p className={classes.preview}>{date[0]}</p>
            </div>
          </div>
        </div>
        <Form form={form} onValuesChange={updateInput} onFinish={process}>
          {isDecrypted ? (
            <Form.Item name="decrypt_key" className={classes.box}>
              <Input
                placeholder="Key (32 Character)"
                className={classes.input}
              />
            </Form.Item>
          ) : null}

          {isVerify ? (
            <>
              <Form.Item name="public_key_1" className={classes.box}>
                <Input
                  placeholder="Your first public key here.."
                  className={classes.input}
                  style={{borderBottom: "none"}}
                />
              </Form.Item>
              <div className={classes.uploader}>
                <label>Or upload your first public key: </label>
                <input
                  type="file"
                  onChange={e => readPublicKey(e, 1)}
                  accept=".txt"
                />
              </div>
              <Form.Item name="public_key_2" className={classes.box}>
                <Input
                  placeholder="Your second public key here.."
                  className={classes.input}
                  style={{borderBottom: "none"}}
                />
              </Form.Item>
              <div className={classes.uploader}>
                <label>Or upload your second public key: </label>
                <input
                  type="file"
                  onChange={e => readPublicKey(e, 2)}
                  accept=".txt"
                />
              </div>
            </>
          ) : null}

          <div className={classes.switch_container}>
            <div className={classes.switch_group}>
              <Switch size="small" onChange={toggleDecrypt} />
              <p className={classes.label_switch}>Decrypt email</p>
            </div>
            <div className={classes.switch_group}>
              <Switch size="small" onChange={toggleVerify} />
              <p className={classes.label_switch}>Verify signature</p>
            </div>
          </div>
          <Form.Item name="text">
            <TextArea bordered={false} autoSize style={{padding: 0}} readOnly />
          </Form.Item>
          {isDecrypted ? (
            <Form.Item name="decrypted_text">
              <TextArea
                bordered={false}
                autoSize
                style={{padding: 0}}
                readOnly
                placeholder="Your decrypted text start here..."
              />
            </Form.Item>
          ) : null}

          <Button
            type="primary"
            className={classes.button}
            htmlType="submit"
            size="large"
            icon={<FontAwesomeIcon className={classes.icon} icon={faCogs} />}
          >
            Process
          </Button>
        </Form>
      </div>
    </Spin>
  );
};

export default Mail;
