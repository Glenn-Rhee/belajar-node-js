const Mongoose = require("mongoose");
const Contact = Mongoose.model("contact", {
    nama: {
        type: String,
        required: true
    },
    jurusan: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}, "mahasiswa");


// Mencari kontak berdasarkan id
const findContact = async (id) => {
    const result = await Contact.findOne({ _id: id });
    return result;
}

// Menghapus contact berdasarkan ID
const deleteContact = async (id) => {
    try {
        await Contact.findOneAndDelete({ _id: id });
    } catch (err) {
        console.log(err)
    }
}

// Mengambil nama depan saja 
const filterName = (nama) => {
    const filter = nama.split(" ");
    return filter[0];
}

// Menambahkan data contact 
const addContact = (data) => {
    const afterIgnore = ignoreLastString(data.nama);
    const result = {
        nama: afterIgnore,
        jurusan: data.jurusan,
        email: data.email
    };
    Contact.insertMany(result);
}

const ignoreLastString = (nama) => {
    const trimmedStr = nama.trimEnd();
    const words = trimmedStr.split(' ');

    const filteredWords = [];

    for (let word of words) {
        if (word !== '') {
            filteredWords.push(word);
        }
    }
    const result = filteredWords.join(' ');
    return result;
}

// Update contact 
const editContact = async data => {
    // Menghapus old nama 
    const filter = data.oldName;
    delete data.oldName
    await Contact.updateOne({nama: filter}, data);
}

module.exports = { Contact, findContact, deleteContact, filterName, addContact, editContact };
