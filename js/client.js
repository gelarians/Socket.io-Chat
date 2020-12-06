"use strict"

var server = "http://127.0.0.1:3000/"
var io = io(server)

const username = "David"//prompt("Pick username")

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

function delete_message(self){
    const id = self.getAttribute("data-id")
    //console.log(id)
    io.emit("delete_message", id)
}
io.on("delete_message", function(id){
    const message = document.getElementById("message-"+id)
    message.innerHTML = "This message has been removed!"

})

// Hört vom server auf das event new_massage
io.on("new_massage", function(obj){
    //console.log("server says: ", obj)

    // Zeige message an
    const li = document.createElement("li")
    const div = document.createElement("div")
    div.id = `message-${obj.id}`
    div.innerHTML = `<span style="color: green">${obj.username}</span>: ${obj.massage}`
    div.innerHTML += `<button data-id="${obj.id}" onclick="delete_message(this)" style="color:red">delete</button>`
    li.append(div)
    //console.log(li.innerHTML)
    const messages = document.getElementById("messages")
    messages.append(li)
})

