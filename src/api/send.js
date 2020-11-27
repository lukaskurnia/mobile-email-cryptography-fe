import service from "utils/request";

export default class Send {
  static baseGroupURL = "send";

  // Body data:
  // to: "lukasjonathan99@gmail.com",
  // subject: "Dari Hape 2",
  // text: "text test"
  static async sendEmail(data) {
    const resp = await service.post(`${this.baseGroupURL}`, data);
    return resp;
  }
}

// export const Test = (arg1, arg2 = 1) =>
//   service({
//     url: "/order/paid",
//     method: "POST",
//     data: {
//       arg2,
//       arg1
//     },
//     headers: {"Content-Type": "application/json", Accept: "application/json"}
//   });
