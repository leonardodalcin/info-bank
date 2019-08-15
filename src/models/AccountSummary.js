const mongoose = require('mongoose');

module.exports = app => {
    const schema = new mongoose.Schema({
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Customer',
            required: true,
        },
        consult_date: {
            type: Date,
            required: true,
            default: Date.now,
        },
        next_close_date: {
            type: Date,
        },
        next_due_date: {
            type: Date,
        },
        balance: {
            open: Number,
            available: Number,
            future: Number,
        },
        credit_limit: Number,
        events: [{
            description: String,
            amount: Number,
            amount_without_iof: Number,
            time: Date,
            title: String      
        }]
    });

    return mongoose.model('AccountSummary', schema);
}


