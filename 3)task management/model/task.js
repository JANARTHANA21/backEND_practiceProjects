const mongoose = require('mongoose');

// Define the schema
const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'must provide name'],
        trim: true,
        maxlength: [20, 'name must not exceed 20 characters']  // Corrected error message
    },
    complete: {
        type: Boolean,
        default: false
    }
});

// Create and export the model
module.exports = mongoose.model('user', taskSchema);