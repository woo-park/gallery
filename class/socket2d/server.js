const express = require('express');
const app = express();
server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(express.static('public'));

let player1xPos = 0;
let player2xPos = 0;

let initialPos_p1 = player1xPos;
let initialPos_p2 = player2xPos;

let numberOfPlayers = [];

class Player {
  constructor(xPos, yPos, userId) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.userId = userId;
  }
}

io.on('connect', (socket) => {
  console.log(socket.id, 'connected');
  numberOfPlayers.push(new Player(Math.floor(Math.random() * 200), Math.floor(Math.random() * 200), socket.id));

  numberOfPlayers.forEach((each) => {
    console.log(each)
  })

//send out initial pos to all
  io.emit('init', {initialPos_p1: initialPos_p1, initialPos_p2: initialPos_p2});
  io.emit('currentPlayers', {currentPlayers: numberOfPlayers })


//player1 btn clicked
  socket.on('move_player1', function(data) {
    player1xPos += 5;
    initialPos_p1 = player1xPos;
    io.emit('move_player1', {newPosX: player1xPos});

  });


//player2 btn clicked
  socket.on('move_player2', function(data) {
    player2xPos += 5;
    initialPos_p2 = player2xPos;
    io.emit('move_player2', {newPosX: player2xPos});
  });

  socket.on('myPlayerMove', function(data) {
    numberOfPlayers.forEach((each)=>{
      console.log(data.playerid,'111')
      console.log(each.userId,'222')
      if (data.playerid == each.userId){
        each.xPos += 10;
        io.emit('playerMoved', {newPosX: each.xPos, id:data.playerid});
      }
    })

  })

})



const PORT = process.env.PORT || 4444;
server.listen(PORT);

//
//
//
//
// //serverside
// io.on('connect', (sock) => {
//   sock.on
//   sock.emit
//   console.log('someone connected!!', sock.id);
//   sock.on('whatver', function(d) {
//     console.log(d);
//     io.emit('lychee', {who: sock.id, what: d})
//   });
// });
//
//
//
// //cli side
// const btn = document.querySelector('#btn');
// btn.addEventListener('click', function() {
//
//   sock.emit('whatever', {mydata: 'got clicked'})
// })
//
// sock.on('lychee', function(data)=> {
//   console.log(data)
// })
