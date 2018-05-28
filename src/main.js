const electron = require("electron")
const calculator = require("./calculator")

const app = electron.app
const BrowserWindow = electron.BrowserWindow
const ipc = electron.ipcMain

let mainWindow

app.on('ready', _ => {
    
    mainWindow = new BrowserWindow({
        width: 500,
        height: 750
        
    })
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    mainWindow.on("closed", _=>{
        
        mainWindow = null
    })

    mainWindow.on("resize", () =>{
        let size = mainWindow.getSize()
        size[1] = size[0]*1.5
        mainWindow.setSize(parseInt(size[0]), parseInt(size[1]))
        
    })
    
})

ipc.on("result", (event, arg)=>{
    let result = calculator.calc(arg)
    // console.log(result)
    mainWindow.webContents.send("endResult", result)
    
})