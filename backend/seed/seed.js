require('dotenv').config();

const mongoose = require('mongoose');
const connectDB = require('../config/db');

const pizzaSchema = require('../models/pizza');
const ingredientSchema = require('../models/ingredient')

const pizzaDatas = require('../data/pizza.json')
const ingredientDatas = require('../data/ingedien.json')


const run = async ()=>{
    try {
        await connectDB();

    await pizzaSchema.deleteMany({});
    await ingredientSchema.deleteMany({});

    await pizzaSchema.insertMany(pizzaDatas);  
    await ingredientSchema.insertMany(ingredientDatas); 

    console.log(`Seeds ${pizzaDatas.length} pizza`);
    await mongoose.disconnect();  
    process.exit(0);  

    } catch (error) {
        console.error('seeding failled:' ,error);
        process.exit(1);
    }
};


run();