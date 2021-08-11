import { app } from "electron";
import { showMessageBox } from "../utils";
import tray from '../tray';

export default {
  init(appManager) {
    const getWindow = (name) => appManager.windows[name].win;
    const mainWindow = getWindow("main");

    mainWindow.on("close", (e) => {
      e.preventDefault();
      showMessageBox("确定要关闭吗？", [
        {
          label: "最小化到拖盘",
          click() {
            mainWindow.hide();
            tray.init(mainWindow);
          },
        },
        {
          label: "直接退出",
          click() {
            app.exit();
          },
        },
      ]);
    });
  },
};
