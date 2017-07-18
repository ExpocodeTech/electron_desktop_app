const { app, Menu } = require('electron');
const isWindows = process.platform === 'win32';
const { showMessage, showSaveDialog, showOpenDialog } = require('./dialogs.js');
module.exports = {
    setMainManu
}

function setMainManu(mainWindow) {
    const template = [
        {
            label: isWindows ? 'File' : app.getName(),
            submenu: [
                {
                    label: isWindows ? 'Exit' : `Quit ${app.getName()}`,
                    accelerator: isWindows ? 'Alt+F4': 'CmdOrCtrl+Q',
                    click() {
                        app.quit(); 
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {role : 'undo'},
                {role : 'redo'},
                {type : 'separator'},
                {role : 'cut'},
                {role : 'copy'},
                {role : 'paste'},
                {role : 'selectall'}
            ]
        }, 
        {
            label: 'Options',
            submenu: [
                {
                    label: 'Say Hello',
                    click() {
                        showMessage(mainWindow);
                    }
                },
                {
                    label: 'Save memory usage info',
                    click() {
                        showSaveDialog(mainWindow);
                    }
                },
                {
                    label: 'Open File',
                    click() {
                        showOpenDialog(mainWindow);
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}