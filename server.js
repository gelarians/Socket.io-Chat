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
    socket.on("new_massage", function(data, username){
      
      let text_array = data.split(" ")
      for (let i = 0; i < text_array.length; i++){
        if(text_array[i] === "EMOJI1"){
          text_array[i] = '<img src="/img/01.png" alt="">'
        }
        if(text_array[i] === "EMOJI2"){
          text_array[i] = '<img src="/img/2.png" alt="">'
        }
        if(text_array[i] === "EMOJI3"){
          text_array[i] = '<img src="/img/3.png" alt="">'
        }
        if(text_array[i] === "EMOJI4"){
          text_array[i] = '<img src="/img/4.png" alt="">'
        }
        if(text_array[i] === "EMOJI5"){
          text_array[i] = '<img src="/img/5.png" alt="">'
        }
        if(text_array[i] === "EMOJI6"){
          text_array[i] = '<img src="/img/6.png" alt="">'
        }
        if(text_array[i] === "EMOJI7"){
          text_array[i] = '<img src="/img/7.png" alt="">'
        }
        if(text_array[i] === "EMOJI8"){
          text_array[i] = '<img src="/img/8.png" alt="">'
        }

      }
      var newTxt = text_array.join(' ')
      console.log(newTxt)

      // server sendet an alle verbundenen clients
      io.emit("new_massage", newTxt, username)
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