
//iniciar el servidor en el puerto 3000
const express = require('express');
const app = express();


//Settings
const cors = require('cors');

const { mongoose } = require('./database');



//Middlewares 
app.use(express.json());
app.use(cors({origin: true, credentials: true}
  ));

//Routes
app.use('/api/users' ,require('./routes/user.routes'));

//Starting the server
app.listen(3000, () => {
    console.log('Server on port', ' 3000');
});
module.exports = app;