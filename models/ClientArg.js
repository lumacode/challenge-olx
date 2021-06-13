const mongoose = require('mongoose');
const Schema = mongoose.Schema;

    const ClientSchema = Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        gender: { // M or F
            type: String,
            required: true
        },
        nacionalId: { // CUIT
            type: String,
            required: true
        },
        birthDate: {
            type: Date,
            required: true,
        }
});

module.exports = mongoose.model('clients_arg', ClientSchema);

