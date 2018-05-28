const electron = require('electron')
const ipc = electron.ipcRenderer

document.getElementById("wyn").addEventListener("click", ()=>{
    ipc.send("result", document.getElementById("result").value);

})

let elements = document.getElementsByClassName("btn")

for(let i=0;i<elements.length;i++){
    elements[i].addEventListener("click", (data)=>{
        let content = data.path[0].innerText
        if(content == "C"){
            document.getElementById("result").value = ""
        }else document.getElementById("result").value += content
    })
        
}

ipc.on("endResult", (event, arg)=>{
    document.getElementById("result").value+=" = "+arg
})