const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server); //hello I am new
const playerIds = [];
let player1 = 0;
let player2 = 0;
let total = 0;
let win = false;
let countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();
let seconds;

const LISTEN_PORT = 8080; //make sure greater than 3000. Some ports are reserved/blocked by firewall ...

app.use((express.static(__dirname + '/public'))); //set root dir to the public folder

//routes

app.get('/competitive', function(req,res) {
    res.sendFile(__dirname + '/public/competitive.html');
});
app.get('/cooperative', function(req,res) {
    res.sendFile(__dirname + '/public/cooperative.html');
});
app.get('/menu', function(req,res) {
    res.sendFile(__dirname + '/public/menu.html');
});






//websocket stuff
socketIO.on('connection', function(socket) {
    console.log(socket.id + ' has connected!');
    playerIds.push(socket.id);

    socket.on('disconnect', function(data) {
        console.log(socket.id + ' has disconnected');
        //delete a socket when it is disconnected
        var i;
        for (i = 0; i < playerIds.length; i++) { 
            if (socket.id == playerIds[i] ){
                playerIds.pop(socket.id); 
            }
        }
    });


 

 








    
    socket.on('removecard', function(data) {
         //console.log(data.id);
        //console.log(playerId);
        //console.log(data.playerId);
       // console.log(playerIdName);
       //console.log(data);
   // Update the count down every 1 second
   var x = setInterval(function() {
    
    // Get todays date and time
    var now = new Date().getTime();
      
    // Find the distance between now and the count down date
    var distance = countDownDate - now;
      
    // Time calculations for seconds
    seconds = Math.floor((distance % (1000 * 9)) / 1000);
    console.log(seconds + " Seconds Remaining ");
    // Output the result
      if ((seconds === 4) || (seconds ===0)){

   // console.log(seconds + " Seconds Remaining ");
      }
    // If the count down is over, write some text 
    if (distance < 0) {
      clearInterval(x);
    }
  }, 1000);

        //DELETE CARD
        socketIO.sockets.emit('delete_card', data);


        //ADD POINTS
        player1 = 0;
        player2 = 0;

        if ((data.playerId===playerIds[0]) && (data.id === "card1" ) ){
            player1 += 1;
            console.log('player 1 has ' + player1 + ' points');
        }

        if ((data.playerId===playerIds[1]) && (data.id === "card1" ) ){
            player2 += 1;
            console.log('player 2 has ' + player2 + ' points');
        }

        if ((data.playerId===playerIds[0]) && (data.id === "card2" ) ){
            player1 += 1;
            console.log('player 1 has ' + player1 + ' points');
        }

        if ((data.playerId===playerIds[1]) && (data.id === "card2" ) ){
            player2 += 1;
            console.log('player 2 has ' + player2 + ' points');
        }

        if ((data.playerId===playerIds[0]) && (data.id === "card3" ) ){
            player1 += 1;
            console.log('player 1 has ' + player1 + ' points');
        }

        if ((data.playerId===playerIds[1]) && (data.id === "card3" ) ){
            player2 += 1;
            console.log('player 2 has ' + player2 + ' points');
        }

        if ((data.playerId===playerIds[0]) && (data.id === "card4" ) ){
            player1 += 1;
            console.log('player 1 has ' + player1 + ' points');
        }

        if ((data.playerId===playerIds[1]) && (data.id === "card4" ) ){
            player2 += 1;
            console.log('player 2 has ' + player2 + ' points');
        }

        if ((data.playerId===playerIds[0]) && (data.id === "card5" ) ){
            player1 += 1;
            console.log('player 1 has ' + player1 + ' points');
        }

        if ((data.playerId===playerIds[1]) && (data.id === "card5" ) ){
            player2 += 1;
            console.log('player 2 has ' + player2 + ' points');
        }

        if ((data.playerId===playerIds[0]) && (data.id === "card6" ) ){
            player1 += 1;
            console.log('player 1 has ' + player1 + ' points');
        }

        if ((data.playerId===playerIds[1]) && (data.id === "card6" ) ){
            player2 += 1;
            console.log('player 2 has ' + player2 + ' points');
        }

        if ((data.playerId===playerIds[0]) && (data.id === "card7" ) ){
            player1 += 1;
            console.log('player 1 has ' + player1 + ' points');
        }

        if ((data.playerId===playerIds[1]) && (data.id === "card7" ) ){
            player2 += 1;
            console.log('player 2 has ' + player2 + ' points');
        }

        if ((data.playerId===playerIds[0]) && (data.id === "card8" ) ){
            player1 += 1;
            console.log('player 1 has ' + player1 + ' points');
        }

        if ((data.playerId===playerIds[1]) && (data.id === "card8" ) ){
            player2 += 1;
            console.log('player 2 has ' + player2 + ' points');
        }

        if (((data.playerId===playerIds[1]) || (data.playerId===playerIds[1])) && (data.id === "cardKey" ) ){
            console.log('bomb found');
            win = true;
        }


        if ((player1 > 8) || (player2 > 8)){
            player1 = 0;
            player2 = 0;
        }


        //OPEN SCREENS
        total = player1 + player2;
        if (total > 8){
            total = 0;
        }


        if ((total === 8)){
            win = true;
        }
        
        if ((total < 8) && (seconds == 0)){
            win = false;
        }


        //IF WIN
        if(win === true){
        socketIO.sockets.emit('win',{value:total});
        console.log('total is ' + total);
        }

        //IF LOOSE
        if(win === false){
        socketIO.sockets.emit('loose',{value:total});
        console.log('total is ' + total);
        }


        //FOR COMPETITIVE: check for who is higher, display winner
        if (player2 > player1){
            console.log('Player 2 WINS ' + player2 + ' points');
        }
        else if (player1 > player2){
            console.log('Player 1 WINS ' + player1 + ' points');
        }
        else{
            console.log('Both Players WIN ');
        }




        //FOR  COOPERATIVE: check if they both select the right card, display they both win or loose
        if ((seconds === 0) && (win === false)){
            console.log('GAME OVER THE BOMB EXPLODED');
            socketIO.sockets.emit('loose',{value:total});
        }

        if ((seconds === 0) && (win === true)){
            socketIO.sockets.emit('win',{value:total});
        }


    });







    socket.on('removecard', function(data) { 

        socketIO.sockets.emit('delete_card', data);


    });



    
});

//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);