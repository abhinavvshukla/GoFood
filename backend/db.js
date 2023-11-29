const mongoose = require('mongoose');
const url = 'mongodb+srv://GoFood:GoFood@cluster0.uhrer9f.mongodb.net/GoFoodmern?retryWrites=true&w=majority'

const mongoDB = async() => {
    try {
        await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
  
        console.log('Connected to MongoDB');
  
        fetchData();
    } catch (error) {
        console.error('Error connecting to MongoDB: ', error);
    }
}

async function fetchData() {
    try {
        const fetched_data = await mongoose.connection.db.collection("food_items");
        global.food_items = await fetched_data.find({}).toArray();
        const food_cat = await mongoose.connection.db.collection("food_category");
        global.food_category = await food_cat.find({}).toArray();  
        console.log(global.food_category);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
  }

module.exports = mongoDB;