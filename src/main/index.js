import AppManager from "./appManager";
import scheme from "./scheme";

scheme.init("app");

const app = new AppManager();

global.appManager = app;

export default app;
 