const mongoose = require('mongoose');

module.exports = async app => {
    try {
        await mongoose.connect('mongodb://mongo_api:27017/bank', {useNewUrlParser: true, useCreateIndex: true,})
    } catch (error) {
        console.error(error)
    }
}