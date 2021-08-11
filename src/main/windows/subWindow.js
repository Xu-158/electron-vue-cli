import { CreateBrowserWindow } from "../utils";

export default class extends CreateBrowserWindow {
  constructor() {
    super("subWindow", "我是闯过来的默认消息", {
      menuData: [
        {
          label: "我是子窗口菜单",
        },
      ],
    });
  }
}
