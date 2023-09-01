const Mongoose = require("mongoose");
const Jurusan = Mongoose.model("kampus", {
    jurusan: {
        type: Array
    }
}, "jurusan");


module.exports = {Jurusan};
