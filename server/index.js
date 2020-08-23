
//iniciar el servidor en el puerto 3000
const express = require('express');
const app = express();


//Settings
const cors = require('cors');

const { mongoose } = require('./database');

app.set('port', '3000')

//Middlewares 
app.use(express.json());
app.use(cors({origin: true, credentials: true}
  ));

//Routes
app.use('/api/users' ,require('./routes/user.routes'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
module.exports = app;