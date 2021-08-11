import Main from "../mainWindow";
import SubWindow from "./subWindow";

export default class {
  constructor() {
    this.main = new Main();
    this.subWindow = new SubWindow();
  }
  init() {
    this.main.init();
  }
}
