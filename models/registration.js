const mongoose =  require('mongoose');
const Schema = mongoose.Schema;

const userAuthSchema = new Schema({
        email: {
            type: String,
            required: true
        },
        firstName: String,
        lastName: String,
        ageU: Number,
        password: String
    },
    {versionKey: false});

module.exports = mongoose.model('Registration', userAuthSchema);
