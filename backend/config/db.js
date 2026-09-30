const express  = require('express')
const mongoose = require('mongoose');
const app = express()

const connectDB = async () => {
   try {
     const url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/pizzeria';
     await mongoose.connect(url);
     console.log('database connected successfully!' ,url);
        
   } catch (error) {
     console.error('db connection failed!',error.message);
     process.exit(1);
   }
};

module.exports = connectDB;

    