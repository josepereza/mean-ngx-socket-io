const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/mean-crud', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
     
module.exports = mongoose;