const mongoose = require('mongoose');

// const mongoURI = "mongodb://localhost:27017/myapp"



const mongoURI = "mongodb+srv://izee007:England123@cluster0.vpxq4pq.mongodb.net/myapp?retryWrites=true&w=majority"

// const connection_url = 'mongodb+srv://izeeshan007:England123@cluster0.iyb1b.mongodb.net/app-data?retryWrites=true&w=majority'
// mongoose.connect(connection_url);


const connectToMongo = ()=> {
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected Successfully");
    })
}

module.exports = connectToMongo