const res = require('express/lib/response');
const fs = require('fs');

// membuat folder data jika belum ada
const dirPath = './data';
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
}

// membuat file contacts.json jika belum ada
const dataPath = './data/contacts.json';
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, '[]', 'utf-8');
}

// save kontak
const saveContacts = (contacts) => {
  fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
};

// ambil semua data kontak
const loadContact = () => {
  const fileBuffer = fs.readFileSync(dataPath, 'utf-8');
  const contacts = JSON.parse(fileBuffer);
  return contacts;
};

// ambil detail data kontak berdasarkan nama
const findContact = (nama) => {
  const contacts = loadContact();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  return contact;
};

// menambahkan data kontak baru
const addContact = (contact) => {
  const contacts = loadContact();
  contacts.push(contact);
  saveContacts(contacts);
};

// cek nama duplikat
const cekDuplikat = (nama) => {
  const contacts = loadContact();
  return contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
};

// Hapus kontak
const deleteContact = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
    (contact) => contact.nama.toLowerCase() != nama.toLowerCase()
  );
  saveContacts(newContacts);
};

module.exports = {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
};
