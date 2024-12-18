const mongoose = require("mongoose");

// const ratingSchema = new mongoose.Schema({
//     username: {
//         type: String,
//         required: true
//     },
//     message: {
//         type: String,
//         required: true
//     },
//     starValue: {
//         type: Number,
//         required: true,
//         min: 1,
//         max: 5  
//     }
// });

const operatorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    rating: [] 
});

const OperatorModel = mongoose.model("Operator", operatorSchema);

module.exports = OperatorModel
