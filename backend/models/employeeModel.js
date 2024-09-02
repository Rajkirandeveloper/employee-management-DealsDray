const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true,default:1527527635 },
    designation: { type: String, required: true },
    gender: { type: String, enum: ['Male', 'Female'], required: true },
    course: [String], // Array of strings
    image: { type: String, default:"https://cdn-icons-png.flaticon.com/512/1077/1077114.png" }, // Path to image or URL
});

module.exports = mongoose.model('Employee', employeeSchema);
