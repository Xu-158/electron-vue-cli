import { openDev, windowOptions } from "@/config/index";
import {
  dialog,
  ipcMain as _ipcMain,
  ipcRenderer as _ipcRenderer,
  BrowserWindow,
  Menu,
} from "electron";

export async function showMessageBox(
  content,
  actions = [],
  { title = "提示", type = "info", moreOptions = {} } = {}
) {
  const { response: index } = await dialog.showMessageBox({
    type,
    title,
    cancelId: -1,
    message: content,
    buttons: actions.map((item) => item.label),
    ...moreOptions,
  });
  console.log("index: ", index);
  const click = actions[index].click;
  if (index !== -1 && click) click(index);
}

/**
 * @description 从渲染进程到主进程的异步通信对象。
 * @returns {object}
 */
 export function ipcRenderer() {
  return {
    ..._ipcRenderer,
    on: _ipcRenderer.on,
    once: _ipcRenderer.once,
    send: _ipcRenderer.invoke,
    removeListener : _ipcRenderer.removeListener,
    removeAllListeners: _ipcRenderer.removeAllListeners,
  };
}

/**
 * @description 从主进程到渲染进程的异步通信对象。
 * @returns {object}
 */
export function ipcMain() {
  return {
    ..._ipcMain,
    on: _ipcMain.handle,
    once: _ipcMain.handleOnce,
    send: (ctx, name, data) => ctx.webContents.send(name, data),
    remove: _ipcMain.removeHandler,
  };
}

/**
 * @description 创建浏览器窗口
 * @param name 渲染页面的名称
 * @param data 传递给渲染页面的参数
 * @param options BrowserWindow所需要的参数
 */
export class CreateBrowserWindow {
  constructor(
    name,
    data,
    { options = {}, menuData = [], isCreateProtocol = false } = {}
  ) {
    this.win = null;
    this.name = name;
    this.data = data;
    this.options = options;
    this.menuData = menuData;
    this.isCreateProtocol = isCreateProtocol;
  }

  init(data = this.data, options = this.options) {
    this.win = new BrowserWindow({
      ...windowOptions(),
      ...options,
    });
    this.win.on("closed", () => {
      this.win = null;
    });
    if (data) this.sendData(data);
    this.loadURL();
    this.setMenu();
    return this.win;
  }

  loadURL() {
    const WEBPACK_DEV_SERVER_URL = process.env.WEBPACK_DEV_SERVER_URL;
    if (WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      this.win.loadURL(WEBPACK_DEV_SERVER_URL + "/" + this.name);
      // .then(() => {
      //   if (!process.env.IS_TEST) toggleDevTools(this.win);
      // });
    } else {
      const { createProtocol } = require("vue-cli-plugin-electron-builder/lib");
      if (this.isCreateProtocol) createProtocol("app");
      // Load the index.html when not in development
      this.win.loadURL(`app://./${this.name}.html`);
    }
    if (openDev) this.win.webContents.openDevTools();
  }

  setMenu() {
    const menuData = this.menuData;
    const menu = Menu.buildFromTemplate(menuData);
    this.win.setMenu(menu);
  }

  sendData(data) {
    this.win.webContents.once("dom-ready", () => {
      this.win.show();
      this.win.webContents.send("on-ready", data);
    });
  }
}

/**
 * 日期格式化函数
 * @param {Date|number} value 日期
 * @param {string} format 格式化规则
 * @return {string} 结果
 * @example
 * formatDate(1617244098351, "Y年M月D日") //2021年04月01日
 * formatDate(1617244098351, "Y年M月D日 h:m:s") //2021年04月01日 10:28:18
 * formatDate(1617244098351, 'Y-M-D h:m:s 星期d') //2021-06-03 09:57:08 星期四
 */
export function formatDate(value = Date.now(),format="Y-M-D h:m:s d"){
  const formatNumber = (n)=> `0${n}`.slice(-2)
  const date = new Date(value)
  const formatList = ['Y','M','D','h','m','s','d']
  const resultList = []
  resultList.push(date.getFullYear().toString());
  resultList.push(formatNumber(date.getMonth() + 1));
  resultList.push(formatNumber(date.getDate()));
  resultList.push(formatNumber(date.getHours()));
  resultList.push(formatNumber(date.getMinutes()));
  resultList.push(formatNumber(date.getSeconds()));
  resultList.push(["日", "一", "二", "三", "四", "五", "六"][date.getDay()]);
  for (let i = 0; i < resultList.length; i++) {
    format = format.replace(formatList[i], resultList[i]);
  }
  return format;
}
