"use strict"

console.log("Chat Server Javascript")

// use express
const express = require("express")

// Instanz von express erstellen
const app = express()

// benutze http mit einer Instanz von express
const http = require("http").createServer(app)

//erstelle Socket.io Instanz mit http
const io = require("socket.io")(http, {
    //wenn der server auf einen anderen port wie der host läuft
    cors: {
      origin: "http://127.0.0.1:5500",
      methods: ["GET", "POST"]
    }
  });

// add listener für neue connetction
io.on("connection", function(socket){
    //this is socket for each user
    console.log("User connected", socket.id)

    //server hört zu wenn new_massage reinkommt
    socket.on("new_massage", function(data){
      console.log("User Sagt: ", data)

      // server sendet an alle verbundenen clients
      io.emit("new_massage", data)
    })
})

// gebe auf http://localhost:port/ was zurück
app.get("/", function(request, result){
    result.send("chat Server")

})

// Starte server
const port = 3000
http.listen(port, function(){
    console.log("Server gestartet auf Port: " + port)
})