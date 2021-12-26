const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const { body, validationResult, check } = require('express-validator');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');

require('./utils/db');
const Contact = require('./model/contacts');

const methodOverride = require('method-override');

const app = express();
const port = 3000;

// setup method override
app.use(methodOverride('_method'));

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts); //third party middleware
app.use(express.static('public')); // build in middleware
app.use(express.urlencoded({ extended: true }));

// konfigurasi flash
app.use(cookieParser('secret'));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: 'secret',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(flash());

// route home
app.get('/', (req, res) => {
  res.render('index', {
    layout: 'layouts/main-layouts',
    title: 'Home Page',
  });
});

// halaman seluruh kontak
app.get('/contacts', async (req, res) => {
  const contacts = await Contact.find();
  res.render('contact', {
    layout: 'layouts/main-layouts',
    title: 'Contacts Page',
    contacts,
    msg: req.flash('msg'),
  });
});

// halaman form tambah data kontak
app.get('/contact/add', (req, res) => {
  res.render('add-contact', {
    layout: 'layouts/main-layouts',
    title: 'Halaman Tambah Contact',
  });
});

// proses data contact
app.post(
  '/contact',
  [
    body('nama').custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });

      if (duplikat) {
        throw new Error('Nama kontak sudah digunakan!');
      }
      return true;
    }),
    check('email', 'email tidak valid').isEmail(),
    check('noHP', 'No HP tidak valid!').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('add-contact', {
        layout: 'layouts/main-layouts',
        title: 'Halaman Tambah Contact',
        errors: errors.array(),
      });
    } else {
      Contact.insertMany(req.body, (error, result) => {
        // kirimkan flash message
        req.flash('msg', 'Data kontak berhasil ditambahkan!');
        res.redirect('/contacts');
      });
    }
  }
);

// proses delete kontak
app.delete('/contact', (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then(() => {
    req.flash('msg', 'Data kontak berhasil dihapus!');
    res.redirect('/contacts');
  });
});

// form ubah data contact
app.get('/contact/edit/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render('edit-contact', {
    layout: 'layouts/main-layouts',
    title: 'Halaman Edit Contact',
    contact,
  });
});

// proses ubah data
app.put(
  '/contact',
  [
    body('nama').custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });

      if (value != req.body.oldName && duplikat) {
        throw new Error('Nama kontak sudah digunakan!');
      }
      return true;
    }),
    check('email', 'email tidak valid').isEmail(),
    check('noHP', 'No HP tidak valid!').isMobilePhone('id-ID'),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('edit-contact', {
        layout: 'layouts/main-layouts',
        title: 'Halaman Ubah Contact',
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            noHP: req.body.noHP,
          },
        }
      ).then(() => {
        // kirimkan flash message
        req.flash('msg', 'Data kontak berhasil diubah!');
        res.redirect('/contacts');
      });
    }
  }
);

// halaman detail kontak
app.get('/contact/:nama', async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render('detail', {
    layout: 'layouts/main-layouts',
    title: 'Halaman Detail Contact',
    contact,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

// const yargs = require('yargs');
// const {
//   saveContact,
//   listContact,
//   detailContact,
//   deteleContact,
// } = require('./contacts');

// yargs
//   .command({
//     command: 'add',
//     describe: 'menambahkan contact baru',
//     builder: {
//       nama: {
//         describe: 'Nama lengkap',
//         demandOption: true,
//         type: 'string',
//       },
//       email: {
//         describe: 'email',
//         demandOption: false,
//         type: 'string',
//       },
//       noHP: {
//         describe: 'Nomor HP',
//         demandOption: true,
//         type: 'string',
//       },
//     },
//     handler(argv) {
//       const { nama, email, noHP } = argv;
//       saveContact(nama, email, noHP);
//     },
//   })
//   .demandCommand();

// // menampilkan daftar seluruh kontak
// yargs.command({
//   command: 'list',
//   describe: 'menampilkan semua nama dan noHP',
//   handler() {
//     listContact();
//   },
// });

// // menampilkan detail sebuah kontak
// yargs.command({
//   command: 'detail',
//   describe: 'menampilkan detail sebuah kontak berdasarkan nama',
//   builder: {
//     nama: {
//       describe: 'Nama lengkap',
//       demandOption: true,
//       type: 'string',
//     },
//   },
//   handler(argv) {
//     detailContact(argv.nama);
//   },
// });

// // menghapus kontak berdasarkan nama
// yargs.command({
//   command: 'delete',
//   describe: 'menghapus sebuah kontak berdasarkan nama',
//   builder: {
//     nama: {
//       describe: 'Nama lengkap',
//       demandOption: true,
//       type: 'string',
//     },
//   },
//   handler(argv) {
//     deteleContact(argv.nama);
//   },
// });

// yargs.parse();
