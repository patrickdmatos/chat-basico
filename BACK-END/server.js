const { Socket } = require('engine.io');
const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, '../FRONT-END/WEB')));
app.set('views', path.join(__dirname, '../FRONT-END/WEB'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/menu', (req, res) => {
    res.render('index.html');
})
let messages = []
let contact;

io.on('connection', socket => {
    console.log(`socket connected ${socket.id}`)

    socket.emit('contactInfo', contact)

    socket.emit('previusMessage', messages)

    socket.on('sendMessage', messageOBJ => {
        messages.push(messageOBJ);
        socket.broadcast.emit('receivedMessage', messageOBJ)
        console.log(messageOBJ);
        contact = messageOBJ.author
    })
})

server.listen(3030);