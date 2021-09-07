const mongoose = require('mongoose');
const URI = 'mongodb://localhost:27017/crud';

mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:')); // enlaza el track de error a la consola (proceso actual)
db.once('open', () => {
  console.log('connected'); // si esta todo ok, imprime esto
});
  
module.exports = mongoose;