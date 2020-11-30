import { Button } from "antd";
import React from "react";
import "./index.scss";
import Generate from 'api/generate_key';

class GenerateKey extends React.Component{
  state = {
    private_key_label : "Private Key : ",
    public_key_1_label : "Public Key 1 : ",
    public_key_2_label : "Public Key 2 : ",
    private_key : "",
    public_key_1 : "",
    public_key_2 : ""
  }

  clickGenerate = async () => {
    console.log('here')
    var key = await Generate.generateKey()
    this.setState({
      private_key: key["private_key"],
      public_key_1 : key["public_key_1"],
      public_key_2 : key["public_key_2"]
    });
  }

  render() {
    return(
      <div>
        <Button className="center" onClick={this.clickGenerate}>Generate ECDSA Key </Button> <br/>
        <p className="center"><b>{this.state.private_key_label}</b></p><br/>
        <p className="center">{this.state.private_key}</p><br/><br/><br/>
        <p className="center"><b>{this.state.public_key_1_label}</b></p><br/>
        <p className="center">{this.state.public_key_1}</p><br/><br/><br/>
        <p className="center"><b>{this.state.public_key_2_label}</b></p><br/>
        <p className="center">{this.state.public_key_2}</p><br/>
      </div>
    );
  }
}
export default GenerateKey;
