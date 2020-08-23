var express = require('express');
var router = express.Router();
var app = express();

var server = require('http').createServer(app);
var io = require('socket.io')(server);
server.listen(5000)
io.on('connection', function (socket) {
    socket.on('cambio', function (data) {
        console.log(data);
        io.emit('update-data', { data: data });
    });
});

const user = require('../controllers/user.controller');

router.get('/', user.getUsers);
router.post('/', user.createUser);
router.get('/:id', user.getUser);
router.put('/:id', user.editUser);
router.delete('/:id', user.deleteUser);

module.exports = router;