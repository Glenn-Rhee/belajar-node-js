// versi express
const express = require("express");
const expressLayouts = require('express-ejs-layouts');
// const path = require("path");
const app = express();
const port = 3000;
const { loadContact, findContact, filter, addContact, cekDuplikat, editContact, deleteContact } = require("./utils/contacts");
const { check, validationResult, body } = require('express-validator');


app.set("view engine", "ejs");
// Third-party middleware
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index", {
        nama: "Ariel",
        layout: "layouts/main-layout",
        title: "Halaman Index",
    });
});

// Menampilkan seluruh isi data contact
app.get("/contacts", (req, res) => {
    const contacts = loadContact();
    res.render("contact", {
        layout: "layouts/main-layout",
        title: "Halaman Contact",
        contacts,
    });
})

// Form tambah data contact
app.get("/contacts/add", (req, res) => [
    res.render("insert-data", {
        layout: "layouts/main-layout",
        title: "Add Contact"
    })
])

// Menghapus data contact berdasarkan nama 
app.get("/contacts/delete/:nama", (req, res) => {
    const nama = req.params.nama
    const contact = findContact(nama);
    if (!contact) {
        res.status(400).send("<h1>Error : Nama tidak terdaftar</h1>")
    } else {
        deleteContact(nama);
        res.redirect("/contacts")
    }
})

// Form edit data contact berdasarkan nama
app.get("/contacts/edit/:nama", (req, res) => {
    const nama = req.params.nama;
    const contact = findContact(nama);
    res.render("edit-data", {
        layout: "layouts/main-layout",
        title: "Edit Contact",
        contact
    })
})

// Mengupdate data contact
app.post("/contacts/edit", [body("nama").custom((value, { req }) => {
    const duplikat = cekDuplikat(value);
    if (value !== req.body.oldName && duplikat) {
        throw new Error("Nama Sudah terdaftar");
    }
    return true;
}), check("email", "Masukkan Email yang valid").isEmail()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.render("edit-data", {
            layout: "layouts/main-layout",
            title: "Edit Contact",
            errors: errors.array(),
            contact: req.body
        })
    } else {
        editContact(req.body);
        res.redirect("/contacts");
    }
})

// Menginsert data contact 
app.post("/contacts", [body("nama").custom((value) => {
    const result = cekDuplikat(value);
    if (result) {
        throw new Error("Nama sudah terdaftar");
    }
    return true;
}), check("email", "Masukkan Email yang valid").isEmail()], (req, res) => {
    const errros = validationResult(req);
    if (!errros.isEmpty()) {
        res.render("insert-data", {
            layout: "layouts/main-layout",
            title: "Add Contact",
            errors: errros.array()
        })
    } else {
        addContact(req.body);
        res.redirect("/contacts");
    }
})

// Menampilkan data contact berdasarkan nama
app.get("/contacts/:nama", (req, res) => {
    const name = req.params.nama;
    const contact = findContact(name);
    const nama = filter(name);
    res.render("detail", {
        layout: "layouts/main-layout",
        title: "Detail Contact",
        nama,
        contact
    });
})

app.get("/about", (req, res) => {
    res.render("about", {
        layout: "layouts/main-layout",
        title: "Halaman About",
    });
})

// cara menangani kasus klo mislkn halaman yang di cari tidak ada
app.use(function (req, res, next) {
    res.status(404).send("Error: Page Not Found");
    next();
});

// cara menjalankan portnya
app.listen(port, () => {
    console.log("Web Server is listening on port :" + port);
});