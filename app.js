const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000;

// gunakan ejs
app.set('view engine', 'ejs');
app.use(expressLayouts); //third party middleware
app.use(express.static('public')); // build in middleware

app.get('/', (req, res) => {
  res.render('index', {
    layout: 'layouts/main-layouts',
    title: 'Home Page',
  });
});

app.get('/contacts', (req, res) => {
  res.render('contact', {
    layout: 'layouts/main-layouts',
    title: 'Contacts Page',
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
