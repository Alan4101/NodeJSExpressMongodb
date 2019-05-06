const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const docSchema = new Schema({
        name: String,
        login: String,
        pass: String
    },
    { versionKey: false});

module.exports = mongoose.model('Doc', docSchema);