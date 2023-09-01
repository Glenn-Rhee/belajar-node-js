const fs = require("fs");

// Membuat folder jika belum ada
const dirPath = "./Data"
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// membuat file jika belum ada 
const filePath = "./Data/contacts.json";
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
};

// Mengambil contact 
const loadContact = () => {
    const result = fs.readFileSync("Data/contacts.json", "utf-8")
    const file = JSON.parse(result);
    return file;
}

// Mencari kontak berdasarkan nama di json
const findContact = nama => {
    const file = loadContact();
    const result = file.find((e) => e.nama == nama);
    return result;
}

// Menuliskan / menimpa dengan data baru
const saveContact = (contacts) => {
    fs.writeFileSync("Data/contacts.json", JSON.stringify(contacts));
}

// Menambahkan data contact baru 
const addContact = contact => {
    const afterIgnore = ignoreLastString(contact.nama);
    const praSave = {
        nama: afterIgnore,
        jurusan: contact.jurusan,
        email: contact.email
    };
    const contacts = loadContact();
    contacts.push(praSave);
    saveContact(contacts);
}

// Mengedit data contact 
const editContact = newContact => {
    const contacts = loadContact();
    // mengetahui index pada sebuah array
    const index = contacts.findIndex(contact => contact.nama === newContact.oldName);

    // menghapus oldnama
    delete newContact.oldName;

    // mengabaikan string kosong di akhir
    newContact.nama = ignoreLastString(newContact.nama);

    // mengganti / mereplace array of object index ke n
    contacts.splice(index, 1, newContact);
    saveContact(contacts);
}

// Menghapus data contact
const deleteContact = contact => {
    const contacts = loadContact();
    const result = contacts.filter((con) => con.nama !== contact);
    saveContact(result);
}

// Cek nama sudah dipakai atau belum 
const cekDuplikat = nama => {
    const contacts = loadContact();
    return contacts.find((contact) => nama === contact.nama);
}


// Fungsi untuk menampilkan satu nama di depan saja
const filter = (nama) => {
    const contact = findContact(nama);
    let name;
    if (!contact) {
        name = []
    } else {
        name = contact.nama;
        name = name.split(" ");
    }
    return name;
}


// Fungsi untuk mengabaikan string kosong di akhir kata
const ignoreLastString = str => {
    const trimmedStr = str.trimEnd();
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

module.exports = { loadContact, findContact, filter, addContact, cekDuplikat, editContact, deleteContact };