import { CreateBrowserWindow } from "./utils";

export default class extends CreateBrowserWindow {
  constructor() {
    super("index", "", {
      isCreateProtocol: true,
    });
  }
}
