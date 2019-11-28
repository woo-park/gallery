const express = require('express');
const app = express();
server = require('http').Server(app);
const io = require('socket.io')(server);
app.use(express.static('public'));

// let player1xPos = 0;
// let player2xPos = 0;
//
// let initialPos_p1 = player1xPos;
// let initialPos_p2 = player2xPos;

let playerArrayServer = [];

class Player {
  constructor(xPos, yPos, zPos, userId) {
    this.xPos = xPos;
    this.yPos = yPos;
    this.zPos = zPos;
    this.userId = userId;
  }
}

io.on('connect', (socket) => {
  console.log();
  console.log(socket.id, 'connected');

  let initX = Math.floor(Math.random() * 3);
  let initY = Math.floor(Math.random() * 3);
  let initZ = Math.floor(Math.random() * 3);

  playerArrayServer.push(new Player(initX, initY, initZ,  socket.id));

  playerArrayServer.forEach((each) => {
    console.log(each)
  })

  io.emit('init', {initX: initX, initY: initY, initZ: initZ, userId: socket.id});

  let posX;
  let posY;
  let posZ;

  socket.on('moveMyPlayer', function(data) {
    // console.log('mousepressed')
    playerArrayServer.forEach((each)=>{
      if (data.playerId == each.userId) {
        each.yPos += 0.1;

        io.emit('movedMyPlayer', {xPos: each.xPos,
                                  yPos: each.yPos,
                                  zPos: each.zPos,
                                  userId: each.userId
                                });
      }
    });



    //   playerArrayServer.forEach((each)=>{
    //     // console.log(data.playerid,'111')
    //     // console.log(each.userId,'222')
    //     if (data.playerid == each.userId){
    //       each.xPos += 10;
    //       io.emit('playerMoved', {newPosX: each.xPos, id:data.playerid});
    //     }
    //   })
    //
    // })

  });
  io.emit('currentPlayers', {currentPlayers: playerArrayServer} )

//send out initial pos to all
  // io.emit('init', {initialPos_p1: initialPos_p1, initialPos_p2: initialPos_p2});
  // io.emit('currentPlayers', {currentPlayers: playerArrayServer })


/*      this is for 2d emoji moving
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
*/
  //
  // socket.on('myPlayerMove', function(data) {
  //   playerArrayServer.forEach((each)=>{
  //     // console.log(data.playerid,'111')
  //     // console.log(each.userId,'222')
  //     if (data.playerid == each.userId){
  //       each.xPos += 10;
  //       io.emit('playerMoved', {newPosX: each.xPos, id:data.playerid});
  //     }
  //   })
  //
  // })

  socket.on('disconnect', function() {
    console.log(socket.id, 'disconnected');

    console.log(playerArrayServer.length, 'number of playerArrayServer')
    for (let j = 0; j < playerArrayServer.length; j++) {
        if (playerArrayServer[j].userId == socket.id) {

          console.log(socket.id,'is gone!');
          playerArrayServer.splice(j, 1);
          j -= 1;
        }
    }
    console.log(playerArrayServer.length, 'number of playerArrayServer')

    io.emit('disconnect', {id: socket.id});

  });


})



const PORT = process.env.PORT || 4444;
server.listen(PORT);



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
