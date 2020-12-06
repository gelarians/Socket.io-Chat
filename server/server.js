"use strict"

console.log("Chat Server Javascript")

//import emoji funktion
const emoji_function = require("./components/emoji")
//import axios
const axios = require("axios")
// use express
const express = require("express")
const { default: emoji } = require("./components/emoji")
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

      // connetction to database
      async function post_chat(data,username){
        return await axios({
          method: "post",
          url: "http://127.0.0.1:8000/chat/",
          data: {
            username,
            massage: data,
          }
        })
         
      }

      post_chat(data, username).then(function(res){
        const obj = res.data
        obj.massage = emoji_function(obj)
        //console.log("obj nach emoji funktion:", obj)

        //server schickt an alle verbundenen clients
        io.emit("new_massage", obj)
      })
    })

    socket.on("delete_message", function(msgID){
      //send event to all user!
      io.emit("delete_message", msgID)
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