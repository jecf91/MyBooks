const mongoose = require('mongoose');

//create the schema(table)
const authorSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Author', authorSchema);