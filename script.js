var app = require("http").createServer(handler),
  io = require("socket.io").listen(app),
  fs = require("fs"),
  five = require("johnny-five");

app.listen(8080);

function handler(req, res) {
  fs.readFile(__dirname + "/index.html", function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end("Error loading index.html");
    }

    res.writeHead(200);
    res.end(data);
  });
}

board = new five.Board();

board.on("ready", function() {
  // led = new five.Led({
  //   pins: {
  //     red: 13,
  //     green: 12,
  //     blue: 11
  //   }
  // });
  red = new five.Led(13);
  green = new five.Led(12);
  blue = new five.Led(11);
  
  io.sockets.on("connection", function(socket) {
    console.log("user connected");
    socket.on("red-on", function() {
      red.on();
      console.log("RED IS ON");
    });
    socket.on("green-on", function() {
      green.on();
      console.log("GREEN IS ON");
    });
    socket.on("blue-on", function() {
      blue.on();
      console.log("BLUE IS ON");
    });
    socket.on("red-off", function() {
      red.off();
      console.log("RED IS OFF");
    });
    socket.on("green-off", function() {
      green.off();
      console.log("GREEN IS OFF");
    });
    socket.on("blue-off", function() {
      blue.off();
      console.log("BLUE IS OFF");
    });
  });
});
