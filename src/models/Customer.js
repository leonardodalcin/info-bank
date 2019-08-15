const mongoose = require('mongoose');

module.exports = app => {
    const schema = new mongoose.Schema({
        preferred_name: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        cpf: {
            type: String,
            required: true,
            unique: true,
        },
        rg: {
            type: String,
        },
        email: {
            type: String,
            index: true
        },
        gender: {
            type: String,
        },
        address_city: {
            type: String,
        },
        address_state: {
            type: String,
        },
        address_postcode: {
            type: String,
        },
        address_line1: {
            type: String,
        },
        address_number: {
            type: String,
        },
        phone: {
            type: String,
        },
        nationality: {
            type: String,
        },
        address_country: {
            type: String,
        },
        address_locality: {
            type: String,
        },
        dob: {
            type: String,
        },
        marital_status: {
            type: String,
        },
    });
    return mongoose.model('Customer', schema);
}