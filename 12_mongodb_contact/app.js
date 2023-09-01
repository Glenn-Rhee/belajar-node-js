// Call express & ejs
const express = require("express");
const expressLayouts = require('express-ejs-layouts');

// require validator
const { check, validationResult, body } = require('express-validator');

// Connect database
require("./utils/db");

// schema
const { Contact } = require("./model/mahasiswa");
const {Jurusan} = require("./model/jurusan");

// require controller 
const { findContact, deleteContact, filterName, addContact, editContact } = require("./model/mahasiswa");

// Inisiasi express
const app = express();
const port = 3000;

// Inisiasi ejs 
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));


// const coba = new Contact({
//     nama: "Najwaaaaaa",
//     email: "juaaaa@gmail.com"
// });

// coba.save().then(con => console.log(con)).catch(err => console.log(err));


// Halaman utama
app.get("/", (req, res) => {
    res.render("index", {
        nama: "Ariel",
        layout: "layouts/main-layout",
        title: "Halaman Index",
    });
});

// Halaman About
app.get("/about", (req, res) => {
    res.render("about", {
        layout: "layouts/main-layout",
        title: "Halaman About"
    })
})

// halaman contact 
app.get("/contacts", async (req, res) => {
    const contacts = await Contact.find();
    res.render("contact", {
        layout: "layouts/main-layout",
        title: "Halaman Contact",
        contacts,
    });
})

// Form tambah data contact
app.get("/contacts/add", async (req, res) => {
    const jurusan = await Jurusan.find();
    const allJurusan = jurusan[0].jurusan;
    res.render("insert-data", {
        layout: "layouts/main-layout",
        title: "Add Contact",
        allJurusan
    })
})

// Detail data contact berdasarkan id 
app.get("/contacts/:id", async (req, res) => {
    const id = req.params.id;
    const contact = await findContact(id);
    const nama = filterName(contact.nama);
    res.render("detail", {
        layout: "layouts/main-layout",
        title: `Detail contact ${nama}`,
        nama,
        contact
    });
})



// Menghapus data contact berdasrkan id 
app.get("/contacts/delete/:id", (req, res) => {
    const id = req.params.id;
    const contact = findContact(id);
    if (!contact) {
        res.status(400).send("Error : Nama tidak dapat ditemukan");
    } else {
        deleteContact(id);
        res.redirect("/contacts");
    }
})


// Form edit data contact berdasarkan id 
app.get("/contacts/edit/:id", async (req, res) => {
    const id = req.params.id;
    const contact = await findContact(id);
    const jurusan = await Jurusan.find();
    const bef = jurusan[0].jurusan;
    const allJurusan = bef.filter(jur => jur !== contact.jurusan);
    console.log(allJurusan)
    res.render("edit-data", {
        layout: "layouts/main-layout",
        title: "Edit Contact",
        contact,
        allJurusan
    })
})

// Mengupdate data contact
app.post("/contacts/edit", [body("jurusan").custom(value => {
    if (value === "Choose...") {
        throw new Error("Pilih Jurusan yang benar");
    }
    return true;
}), check("email", "Masukkan Email yang valid")
    .isEmail()], (req, res) => {
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
app.post("/contacts", [body("jurusan").custom(value => {
    if (value === "Choose...") {
        throw new Error("Pilih Jurusan yang benar");
    }
    return true;
}), check("email", "Masukkan Email yang valid").isEmail()], async (req, res) => {
    const jurusan = await Jurusan.find();
    const allJurusan = jurusan[0].jurusan;
    const errros = validationResult(req);
    if (!errros.isEmpty()) {
        res.render("insert-data", {
            layout: "layouts/main-layout",
            title: "Add Contact",
            errors: errros.array(),
            allJurusan
        })
    } else {
        addContact(req.body);
        res.redirect("/contacts");
    }
});



// cara menangani kasus klo mislkn halaman yang di cari tidak ada
app.use((req, res, next) => {
    res.status(404).send("Error: Page Not Found");
    next();
});


// Menjalankan web server
app.listen(port, () => {
    console.log(`Mongodb Contact | listening on port ${port}`);
})