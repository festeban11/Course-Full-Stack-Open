const mongoose = require("mongoose");
mongoose.set('strictQuery', false)
require('dotenv').config();
const password = process.env.MONGODB_PASSWORD;
const url =
  `mongodb+srv://fnandoesteban:${password}@cluster0.ffw8r.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

console.log("connecting to", url);

mongoose
  .connect(url)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });


const numberPhoneValidators = [
    {
      validator: (v) => {
        if ((v[2] === "-" || v[3] === "-") && v.length < 9) {
          return false;
        }
        return true;
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    {
      validator: (v) => {
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid phone number!`,
    },
  ];

const personSchema = new mongoose.Schema({
    name: { 
      type: String,    
      minLength: 3,    
      required: true,
      validate: {
        validator: (v) => {
          return v.length > 2;
        },
        message: (props) => `${props.value} is not a valid name!`,
      },
    },
    number: {
      type: String,
      validate: numberPhoneValidators,
      required: true,
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

  
module.exports = mongoose.model('Person', personSchema)