const validator = require("validator");
const fs = require("fs");
const { stdin, stdout } = require("process");
const readline = require('readline');
const rl = readline.createInterface({
    input: stdin,
    output: stdout
})

function gap(){
    return console.log(" ");
}

// Membuat folder jika belum ada
const dirPath = "./Data"
if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
}

// Membaut file jika belum ada 
const filePath = "./Data/contacts.json";
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
};

const pertanyaan = (quest) => {
    return new Promise((res, rejects) => {
        rl.question(quest, (response) => {
            res(response);
        })
    })
}

const loadContact = () => {
    const result = fs.readFileSync("Data/contacts.json", "utf-8")
    const file = JSON.parse(result);
    return file;
}

const saveContact = (nama, jurusan, email) => {
    const data = { nama, jurusan, email };
    if (!validator.isEmail(data.email)) {
        console.log("Masukkan format Email yang benar");
        process.exit(1);
    }
    const file = loadContact();
    file.push(data);
    fs.writeFile("Data/contacts.json", JSON.stringify(file), (err) => {
        if (err) throw err;
        console.log("Terimakasih telah menginputkan");
    });
    rl.close()
}

const listContact = () => {
    const file = loadContact();
    console.log("Daftar data Contact : ");
    file.forEach((e, i) => {
        const nama = e.nama;
        const jurusan = e.jurusan;
        console.log(`${1 + i}. ${nama} - ${jurusan}`);
    });
    process.exit();
}

const getDetail = (nama) => {
    const file = loadContact();
    const result = file.find((e) => e.nama.toLowerCase() === nama.toLowerCase());
    if (!result) {
        console.log(`${nama} tidak dapat ditemukkan`);
        process.exit();
    }
    const keys = Object.keys(result);
    console.log(`Berikut adalah detail contact dari ${nama}`);
    let i = 1;
    for (r in result) {
        const key = keys[i - 1].charAt(0).toUpperCase() + keys[i - 1].slice(1);
        console.log(`${i}. ${key} : ${result[r]} `);
        i++
    }
    process.exit()
}

const deleteWith = (nama) => {
    const file = loadContact();
    const result = file.filter((e) => e.nama.toLowerCase() !== nama.toLowerCase());
    fs.writeFile("Data/contacts.json", JSON.stringify(result), (err) => {
        if (err) throw err;
        console.log(`Data ${nama} berhasil dihapus`);
        gap();
        listContact();
    });
    rl.close()
}

module.exports = { pertanyaan, saveContact, listContact, getDetail, deleteWith };