const { describe } = require('yargs');
const yargs = require('yargs');
const { saveContact } = require('./contacts');

yargs.command({
  command: 'add',
  describe: 'menambahkan contact baru',
  builder: {
    nama: {
      describe: 'Nama lengkap',
      demandOption: true,
      type: 'string',
    },
    email: {
      describe: 'email',
      demandOption: false,
      type: 'string',
    },
    noHP: {
      describe: 'Nomor HP',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    const { nama, email, noHP } = argv;
    saveContact(nama, email, noHP);
  },
});

yargs.parse();
