import { app, BrowserWindow } from "electron";

export default {
  init(appManager, { windowsReady = () => {} }) {
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) {
        appManager.init();
        windowsReady();
      }
    });

    app.on("ready", async () => {
      appManager.init();
      windowsReady();
    });

    app.on("before-quit", () => {
      console.log("before-quit: 退出之前");
    });

    app.on("window-all-closed", () => {
      console.log("window-all-closed: 所有窗口被关闭");
      if (process.platform != "darwin") {
        app.quit();
      }
    });

    app.on("will-quit", () => {
      console.log("will-quit: 所有窗口关闭后");
      // 注销所有快捷键
      // globalShortcut.unregisterAll();
    });
  },
};
