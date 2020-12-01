import React, {useState} from "react";
import {Button} from "antd";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCogs} from "@fortawesome/free-solid-svg-icons";
import Crypto from "api/crypto";

import classes from "./index.module.scss";
const GenerateKey = () => {
  const [privateKey, setPrivateKey] = useState("");
  const [publicKey1, setPublicKey1] = useState("");
  const [publicKey2, setPublicKey2] = useState("");

  const generate = async () => {
    const {
      private_key,
      public_key_1,
      public_key_2
    } = await Crypto.generateKey().then(res => res.data);

    setPrivateKey(private_key);
    setPublicKey1(public_key_1);
    setPublicKey2(public_key_2);
  };

  const download = (key, filename) => {
    const element = document.createElement("a");
    const file = new Blob([key], {type: "text/plain;charset=utf-8"});
    element.href = URL.createObjectURL(file);
    element.download = `${filename}.txt`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className={classes.key_container}>
      <Button
        type="primary"
        className={classes.button}
        onClick={generate}
        size="large"
        icon={<FontAwesomeIcon className={classes.icon} icon={faCogs} />}
      >
        Generate ECDSA Key
      </Button>
      {privateKey && publicKey1 && publicKey2 ? (
        <>
          <div className={classes.key_box}>
            <p>
              <b>Private Key :</b>
            </p>
            <p>{privateKey}</p>
            <Button
              className={classes.button_alt}
              onClick={() => download(privateKey, "private_key")}
            >
              Download
            </Button>
          </div>

          <div className={classes.key_box}>
            <p>
              <b>Public Key 1 :</b>
            </p>
            <p>{publicKey1}</p>
            <Button
              className={classes.button_alt}
              onClick={() => download(publicKey1, "public_key_1")}
            >
              Download
            </Button>
          </div>

          <div className={classes.key_box}>
            <p>
              <b>Public Key 2 :</b>
            </p>
            <p>{publicKey2}</p>
            <Button
              className={classes.button_alt}
              onClick={() => download(publicKey2, "public_key_2")}
            >
              Download
            </Button>
          </div>
        </>
      ) : null}
    </div>
  );
};
export default GenerateKey;
