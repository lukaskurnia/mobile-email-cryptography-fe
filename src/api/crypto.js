import serviceCrypto from "utils/request-crypto";

export default class Crypto {
  static async generateKey() {
    const resp = await serviceCrypto.post("generate_key");
    return resp;
  }

  static async generateSignature(data) {
    const resp = await serviceCrypto.post("generate_signature", data);
    return resp;
  }

  static async verify(data) {
    const resp = await serviceCrypto.post("verify_signature", data);
    return resp;
  }

  static async encrypt(data) {
    const resp = await serviceCrypto.post("encrypt_message", data);
    return resp;
  }

  static async decrypt(data) {
    const resp = await serviceCrypto.post("decrypt_message", data);
    return resp;
  }
}
