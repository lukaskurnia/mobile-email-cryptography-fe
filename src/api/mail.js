import service from "utils/request";

export default class Mail {
  // Body data:
  // to: "lukasjonathan99@gmail.com",
  // subject: "Dari Hape 2",
  // text: "text test"
  static async send(data) {
    const resp = await service.post("send", data);
    return resp;
  }

  static async inbox() {
    const resp = await service.get("inbox");
    return resp;
  }

  static async sentbox() {
    const resp = await service.get("sentbox");
    return resp;
  }

  static async inboxById(id) {
    const resp = await service.get("inbox/" + id);
    return resp;
  }

  static async sentboxById(id) {
    const resp = await service.get("sentbox/" + id);
    return resp;
  }
}
