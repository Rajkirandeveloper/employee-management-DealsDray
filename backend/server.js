const express = require('express');
const mongoose = require('mongoose');
const Employee =require('./models/employeeModel');
const connectDB=require('./config/db')
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const upload = require('./middleware/upload');


const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
connectDB()

// mongoose.connect('mongodb://localhost:27017/mern-employee', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);
app.post('/api/employees', upload.single('image'), async (req, res) => {
    const { name, email, mobile, designation, gender, course } = req.body;
    const image = req.file ? req.file.filename : null;

    try {
        const employee = new Employee({
            name,
            email,
            mobile,
            designation,
            gender,
            course,
            image,
        });

        await employee.save();
        res.status(201).json({ message: 'Employee created successfully' });
    } catch (err) {
        console.error('Error saving employee:', err); // Log the error for debugging
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
