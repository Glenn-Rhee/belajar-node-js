const { pertanyaan, saveContact, listContact, getDetail, deleteWith } = require("./script.js");
const yargs = require('yargs');

const params = ["add", "list", "detail", "delete"];
const param = process.argv;
if (param.length < 3) {
    console.log("Untuk menjalankan ini wajib memasukkan satu parameter.");
    console.log("Parameter yang tersedia adalah :");
    params.forEach((e, i) => {
        console.log(`${i + 1}. ${e}`);
    })

    process.exit();
}
console.log(param);

const result = params.find((p) => p === param[2]);
if (!result) {
    console.log("Unknown param");
    process.exit();
}

// param add
yargs.command({
    command: "add",
    describe: "Add a new contact",
    handler: function () {
        (async () => {
            const nama = await pertanyaan("Masukkan nama Anda : ");
            const jurusan = await pertanyaan("Masukkan jurusan Anda : ");
            const email = await pertanyaan("Masukkan email Anda : ");
            saveContact(nama, jurusan, email);
        })();
    }
});

// param list
yargs.command({
    command: "list",
    describe: "Show data contact",
    handler: function () {
        listContact();
    }
})

// param detail
yargs.command({
    command: "detail",
    describe: "Show Detail contact",
    handler: function () {
        (async () => {
            const nama = await pertanyaan("Cari berdasarkan nama : ");
            getDetail(nama);
        })();
    }
})

// param delete
yargs.command({
    command: "delete",
    describe: "Delete Contact",
    handler: function () {
        (async () => {
            const nama = await pertanyaan("Hapus berdasarkan nama : ");
            deleteWith(nama);
        })();
    }
})

yargs.parse();
