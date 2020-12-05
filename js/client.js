"use strict"

var server = "http://127.0.0.1:3000/"
var io = io(server)

const username = prompt("Pick username")

const emojis = document.getElementsByClassName("icon")

for(let i = 0; i < emojis.length; i++){
    const icon = emojis[i]
    icon.addEventListener("click", function(e){
        console.log("target.id", e.target.id)
        document.getElementById("m").value += e.target.id.toUpperCase() + " "
    })
}


function sendMessage(){
    const message = document.getElementById("m").value

    //sende nachricht vom client
    io.emit("new_massage", message, username)
    // setze die form zurück auf einen leeren string
    document.getElementById("m").value = ""
    // prevent to submmitting the form
    return false
}


// Hört vom server auf das event new_massage
io.on("new_massage", function(data, username){
    console.log("server says: ", data, username)
    // Zeige message an
    const li = document.createElement("li")
    const div = document.createElement("div")
    div.innerHTML = `<span style="color: green">${username}</span>: ${data}`
    div.innerHTML += '<button style="color:red">delete</button>'
    li.append(div)
    console.log(li.innerHTML)
    const messages = document.getElementById("messages")
    messages.append(li)
})