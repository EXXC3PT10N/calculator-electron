const electron = require("electron")
const calculator = require("./calculator")

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

let mainWindow

app.on('ready', _ => {
    
    mainWindow = new BrowserWindow({
        height: 750,
        width: 500
    })

    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.on("closed", _=>{
        mainWindow = null
    })
})

ipc.on("result", (event, arg)=>{
    let result = calculator.calc(arg)
    // console.log(result)
    mainWindow.webContents.send("endResult", result)
})