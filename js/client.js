"use strict"

var server = "http://127.0.0.1:3000/"
var io = io(server)

function sendMessage(){
    const message = document.getElementById("m").value

    //sende nachricht vom client
    io.emit("new_massage", message)
    // setze die form zurück auf einen leeren string
    document.getElementById("m").value = ""
    // prevent to submmitting the form
    return false
}


// Hört vom server auf das event new_massage
io.on("new_massage", function(data){
    console.log("server says: ", data)
    // Zeige message an
    const li = document.createElement("li")
    li.innerText = data
    const messages = document.getElementById("messages")
    messages.append(li)
})