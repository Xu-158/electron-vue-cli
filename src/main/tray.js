import { appName, logoPath } from "@/config";
import { app, Menu, Tray } from "electron";

export default {
  init(mainWindow) {
    this.tray = new Tray(logoPath());

    this.tray.on("click", () => {
      mainWindow.show();
      this.tray.destroy();
    });

    this.tray.setToolTip(appName);

    const contextMenu = Menu.buildFromTemplate([
      {
        label: "显示主界面",
        type: "normal",
        click: () => {
          mainWindow.show();
          this.tray.destroy();
        },
      },
      {
        label: "退出",
        type: "normal",
        click() {
          app.exit();
        },
      },
    ]);

    this.tray.setContextMenu(contextMenu);
  },
};
