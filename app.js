const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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

const templatePertanyaan = (pertanyaan) => {
  return new Promise((resolve, reject) => {
    rl.question(pertanyaan, (data) => {
      resolve(data);
    });
  });
};

const main = async () => {
  const nama = await templatePertanyaan('Masukkan Nama Anda: ');
  const email = await templatePertanyaan('Masukkan Email Anda: ');
  const noHP = await templatePertanyaan('Masukkan noHP Anda: ');

  const contact = { nama, email, noHP };
  const fileBuffer = fs.readFileSync(dataPath, 'utf-8');
  const contacts = JSON.parse(fileBuffer);

  contacts.push(contact);

  fs.writeFileSync(dataPath, JSON.stringify(contacts));

  console.log(`terimakasih sudah memasukkan data`);
  rl.close();
};

main();
