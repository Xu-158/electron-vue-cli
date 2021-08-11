const logoPath = () => `${__static}/logo.png`;
module.exports = {
  appName: "electron-vue-cli",
  logoPath,
  openDev: false,
  windowOptions: () => ({
    icon: logoPath(), //应用运行时的标题栏图标
    width: 800,
    height: 800,
    titleBarStyle: "hidden",
    transparent: false,
    webPreferences: {
      // // Use pluginOptions.nodeIntegration, leave this alone
      // // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // // nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      // // contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
      // backgroundThrottling: false, //设置应用在后台正常运行
      // nodeIntegration: true, //设置能在页面使用nodejs的API
      // contextIsolation: false, // v12版本 允许node
      // webSecurity: false, // 取消跨域
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
  }),
};
