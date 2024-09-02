const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://rajkirankelangi:rajkiran3355@cluster0.lxaseo9.mongodb.net/emp-management?retryWrites=true&w=majority&appName=Cluster0', {
           // useNewUrlParser: true,
           // useUnifiedTopology: true,
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
