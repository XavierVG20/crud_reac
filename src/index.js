const express =  require('express');
const app = express();
const path = require('path');
const cors = require('cors')


// Db connection
const { mongoose } = require('./database');

// Settings 
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(express.json());
app.use(cors())

// Routes
app.use('/usuarios', require('./routes/usuario.routes'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));;

// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});