const { app, BrowserWindow, ipcMain } = require("electron");
const TiktokAutoLike = require("./tiktokAutoLike");
const path = require("path");

// check environment
const isDev = process.env.NODE_ENV !== "production";
// check platform
const isMac = process.platform === "darwin";

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
    },
  });
  if (isDev) {
    // win.webContents.openDevTools();
  }
  win.loadFile("index.html");

  ipcMain.on("loginData", (even, arg) => {
    // console.log(arg)
    TiktokAutoLike(even, arg);
  });
};
//  create the window
app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    // for Mac OS, you need to create a window again when active
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
// close all windows
app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
