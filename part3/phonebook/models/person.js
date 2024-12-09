const mongoose = require("mongoose");
mongoose.set('strictQuery', false)

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


const personSchema = new mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

  
module.exports = mongoose.model('Person', personSchema)