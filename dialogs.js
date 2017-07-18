const {dialog, app, nativeImage } = require('electron');
const fs = require('fs');
const path = require('path');

module.exports = { showMessage, showSaveDialog, showOpenDialog };

function showMessage(browserWindows) {
    dialog.showMessageBox(browserWindows, {
        type: 'info',
        icon: nativeImage.createFromPath('./kitten.jpeg'),
        detail: 'Hola esto es un Message Box',
        buttons: ['Hola', 'Close'],
        defaultId: 0,
    }, (clickedIndex) => {
        console.log(clickedIndex);
    });
}

function showSaveDialog(browserWindows) {
    dialog.showSaveDialog(browserWindows, {
        defaultPath: path.join(app.getPath('downloads'), 'memory-info.txt')
    }, (filename) => {
        if(filename){
            const memInfo = JSON.stringify(process.getProcessMemoryInfo(),null,2);
            fs.writeFile(filename,memInfo,'utf8',(err) => {
                if(err){
                    dialog.showErrorBox('Save Failed.', err.message);
                }
            });
        }
    });
}

function showOpenDialog(browserWindows) {
    dialog.showOpenDialog(browserWindows,{
        defaultPath: app.getPath('downloads'),
        filters: [
            { name: 'Text Files', extensions: ['txt'] }
        ]
    }, (filepaths) => {
        if(filepaths){
            console.log(filepaths, fs.readFileSync(filepaths[0], 'utf8'));
        }
    });
}