
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require("path");

app.on('ready', () => {
    const win = new BrowserWindow({
        width: 1600,
        height: 1000,
        frame: false,
        title: "GitHub",
        icon: path.join(__dirname, 'icon.png'),
        webPreferences: {
            preload: path.join(__dirname, 'bundle.js')
        }
    })

    ipcMain.on("minimizeApp", () => {
        win?.minimize();
    });
    ipcMain.on("maximizeApp", () => {
        if (win?.isMaximized()) {
            win?.unmaximize();
        } else {
            win?.maximize();
        }
    });
    ipcMain.on("closeApp", () => {
        win?.close();
    });

    win.loadURL('https://github.com/')

    win.webContents.once('dom-ready', () => win.show());
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})