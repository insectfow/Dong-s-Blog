var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io')(server, {
    pingTimeout: 1000,
    cors: {
        origin: " http://192.168.0.91:4000",
        methods: ["GET", "POST"]
      }
});


app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/', (req, res) => {
    // res.sendFile('Hellow Chating App Server');
});

io.on('connection', (socket) => {
    socket.on('chat', (data) => {
        console.log('Message fro, %s: %s', data.name, data.msg);

        var msg = {
            from: {
                name: data.name,
            },
            msg: data.msg
        };
    
        socket.broadcast.emit('chat', msg);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected: ' + socket.name);
    })
});


server.listen(3000);