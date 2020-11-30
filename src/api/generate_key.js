import service_backend from "utils/request_backend";

export default class Generate {
  static baseGroupURL = "generate_key";

  static async generateKey() {
    const resp = await service_backend.post(`${this.baseGroupURL}`);
    return resp["data"];
  }
}