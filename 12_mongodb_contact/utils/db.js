// require mongoose 
const Mongoose = require("mongoose");

// cara connect ke mongoose 
Mongoose.connect("mongodb://127.0.0.1:27017/glenn", { useNewUrlParser: true, useUnifiedTopology: true });

// Membuat schema 

// menambahkan satu 
// const coba = new Contact({
//     nama: "Najwaaaaaa",
//     email: "juaaaa@gmail.com"
// });

// coba.save().then(con => console.log(con)).catch(err => console.log(err));