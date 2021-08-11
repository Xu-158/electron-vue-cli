const path = require("path");
const { appName } = require("./src/config");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: "src/renderer/index.js",
      // 模板来源
      template: "public/index.html",
      // 在 dist/index.html 的输出
      filename: "index.html",
      chunks: ["chunk-vendors", "chunk-common", "index"],
    },
  },
  publicPath: "./",
  productionSourceMap: false,
  pluginOptions: {
    electronBuilder: {
      mainProcessFile: "src/main/index.js",
      mainProcessWatch: ["src/main/**"],
      nodeIntegration: true,
      builderOptions: {
        productName: appName,
        appId: "com.vdata.fetch-write-data",
        copyright: "Copyright © 2021", //版权信息
        mac: {
          // icon: 'public/build/icons/icon.icns'
        },
        win: {
          // icon: 'public/build/icons/icon.icns'
        },
        linux: {
          // icon: 'public/build/icons/icon.icns'
        },
        nsis: {
          oneClick: false, // 是否一键安装
          allowElevation: true, // 允许请求提升。 如果为false，则用户必须使用提升的权限重新启动安装程序。
          allowToChangeInstallationDirectory: true, // 允许修改安装目录
          // installerIcon: "./public/icons/icon.ico", // 安装图标
          // uninstallerIcon: "./public/icons/icon.ico", //卸载图标
          // installerHeaderIcon: "./public/icons/icon.ico", // 安装时头部图标
          createDesktopShortcut: true, // 创建桌面图标
          createStartMenuShortcut: true, // 创建开始菜单图标
          shortcutName: appName, // 图标名称
        },
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@": resolve("src/renderer"),
      },
    },
  },
  chainWebpack: (config) => {
    config.optimization.splitChunks({
      cacheGroups: {
        // vue、axios单独打包为vendor
        vendors: {
          name: "chunk-vendors",
          test: /[\\/](axios|vue.*)[\\/]/,
          chunks: "all",
          priority: 10,
        },
        // 其它node_modules 2次引用打包为common
        common: {
          name: "chunk-common",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 1,
          minChunks: 2,
        },
      },
    });
  },
};
