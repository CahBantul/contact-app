const { templateQuestion, saveContact } = require('./contacts');

const main = async () => {
  const nama = await templateQuestion('Masukkan Nama Anda: ');
  const email = await templateQuestion('Masukkan Email Anda: ');
  const noHP = await templateQuestion('Masukkan noHP Anda: ');

  saveContact(nama, email, noHP);
};

main();
