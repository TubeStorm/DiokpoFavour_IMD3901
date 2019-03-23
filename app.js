const express   = require('express');
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const socketIO  = require('socket.io')(server); //hello I am new
const playerIds = [];
let player1 = 0;
let player2 = 0;
let total = 0;
let p1win;
let p2win;
let win1;
let countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();
let seconds;
let countDownDate1 = new Date("Jan 5, 2021 15:37:25").getTime();
let seconds1;

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

                                                    //TIMER
                                                        var x1 = setInterval(function() {
                                                            // Get todays date and time
                                                            var now1 = new Date().getTime();
                                                            // Find the distance between now and the count down date
                                                            var distance1 = countDownDate1 - now1;
                                                            // Time calculations for seconds
                                                            seconds1 = Math.floor((distance1 % (1000 * 15)) / 1000);
                                                            //console.log(seconds1 + " Seconds Remaining ");
                                                        }, 1000);

 




    
    socket.on('removecard', function(data) {
        //EMPTY WRONG SOCKET IDS FROM ARRAY
        socket.on('socketName', function(data) {
            var i;
            for (i = 0; i < playerIds.length; i++) { 
                if (data.menuId == playerIds[i] ){
                    playerIds.pop(data.menuId); 
                }
                
            }
            console.log(playerIds);
        });

                                                    //TIMER
                                                    var x = setInterval(function() {
                                                        var now = new Date().getTime();
                                                        var distance = countDownDate - now;
                                                        seconds = Math.floor((distance % (1000 * 9)) / 1000);
                                                    }, 1000);

        //DELETE CARD
        socketIO.sockets.emit('delete_card', data);

        //ADD POINTS

        if ((data.playerId===playerIds[0]) && (data.id === "card1" ) ){
            player1 += 1;
            console.log('player 1 has ' + player1 + ' points');
            win1 = true;
        }

        if ((data.playerId===playerIds[1]) && (data.id === "card1" ) ){
            player2 += 1;
            console.log('player 2 has ' + player2 + ' points');
            win1 = false;
        }

        if ((data.playerId===playerIds[0]) && (data.id === "card2" ) ){
            player1 += 1;
            console.log('player 1 has ' + player1 + ' points');
            win1 = false;
        }

        if ((data.playerId===playerIds[1]) && (data.id === "card2" ) ){
            player2 += 1;
            console.log('player 2 has ' + player2 + ' points');
            win1 = false;
        }

        if ((data.playerId===playerIds[0]) && (data.id === "card3" ) ){
            player1 += 1;
            console.log('player 1 has ' + player1 + ' points');
            win1 = false;
        }

        if ((data.playerId===playerIds[1]) && (data.id === "card3" ) ){
            player2 += 1;
            console.log('player 2 has ' + player2 + ' points');
            win1 = false;
        }

        if ((data.playerId===playerIds[0]) && (data.id === "card4" ) ){
            player1 += 1;
            console.log('player 1 has ' + player1 + ' points');
            win1 = false;
        }

        if ((data.playerId===playerIds[1]) && (data.id === "card4" ) ){
            player2 += 1;
            console.log('player 2 has ' + player2 + ' points');
            win1 = false;
        }

        if ((data.playerId===playerIds[0]) && (data.id === "card5" ) ){
            player1 += 1;
            console.log('player 1 has ' + player1 + ' points');
            win1 = false;
        }

        if ((data.playerId===playerIds[1]) && (data.id === "card5" ) ){
            player2 += 1;
            console.log('player 2 has ' + player2 + ' points');
            win1 = false;
        }

        if ((data.playerId===playerIds[0]) && (data.id === "card6" ) ){
            player1 += 1;
            console.log('player 1 has ' + player1 + ' points');
            win1 = false;
        }

        if ((data.playerId===playerIds[1]) && (data.id === "card6" ) ){
            player2 += 1;
            console.log('player 2 has ' + player2 + ' points');
            win1 = false;
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
            win1 = false;
        }

        if ((data.playerId===playerIds[1]) && (data.id === "card8" ) ){
            player2 += 1;
            console.log('player 2 has ' + player2 + ' points');
            win1 = false;
        }

        if (win1 !== false){
            console.log('bomb found');
            win1 = true;
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



        //FOR COMPETITIVE: check for who is higher, display winner
        // if player id is = 1 and they win, send them to win page
        if ((player2 > player1) && (total === 8)){
            console.log('Player 2 WINS ' + player2 + ' points');
            p2win = true;
            p1win = false;
        }
        else if ((player1 > player2) && (total === 8)){
            console.log('Player 1 WINS ' + player1 + ' points');
            p1win = true;
            p2win = false;
        }
        else if ((player1 === player2) && (total === 8)){
            console.log('Both Players WIN ');
            p1win = true;
            p1win = true;
        }


        if ((data.playerId===playerIds[0]) && (p1win === true)){
            socketIO.sockets.emit('win',{value:total});
        }
        if ((data.playerId===playerIds[1]) && (p2win === true)){
            socketIO.sockets.emit('win',{value:total});
        }
        if ((data.playerId===playerIds[0]) && (p1win === false)){
            socketIO.sockets.emit('loose',{value:total});
        }
        if ((data.playerId===playerIds[1]) && (p2win === false)){
            socketIO.sockets.emit('loose',{value:total});
        }




        //FOR  COOPERATIVE: check if they both select the right card, display they both win or loose
        if (win1 === false){
            console.log('GAME OVER THE BOMB EXPLODED');
            socketIO.sockets.emit('loose',{value:total});
        }

        if (win1 === true){
            socketIO.sockets.emit('win',{value:total});
        }


    });







    //socket.on('removecard', function(data) { 

       // socketIO.sockets.emit('delete_card', data);


   // });



    
});

//finally, start server
server.listen(LISTEN_PORT);
console.log('listening to port: ' + LISTEN_PORT);