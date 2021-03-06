const { app, BrowserWindow } = require('electron');
const path = require('path');
let mainWindow;
const { setMainManu } = require('./main-menu.js');

app.on('ready',() => {
    mainWindow = new BrowserWindow({show : false});
    mainWindow.loadURL(path.join('file://',__dirname,'index.html'));
    mainWindow.on('ready-to-show',() => {
        mainWindow.show();
    });
    setMainManu(mainWindow);
})