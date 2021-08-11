import { app } from "electron";
import { CreateBrowserWindow, ipcMain } from "../utils/index";

const _ipcMain = ipcMain();

export default {
  init(appManager) {
    const getWindow = (name) => appManager.windows[name].win;
    const mainWindow = getWindow("main");

    _ipcMain.on("open-window", (e, name = "", data = null, options = {}) => {
      let subWindow = appManager.windows[name];
      if (!subWindow) {
        subWindow = new CreateBrowserWindow(name);
      }
      subWindow.init(data, options);
    });

    _ipcMain.on("close-window", async (e, name) => {
      getWindow(name).close();
    });

    _ipcMain.on("app-exit", async () => {
      app.exit();
    });

    // 操作开发者工具
    // _ipcMain.on(
    //   "toggleDevTools",
    //   (e, { win = mainWindow, params = {} } = {}) => {
    //     toggleDevTools(win, params);
    //   }
    // );
  },
};
