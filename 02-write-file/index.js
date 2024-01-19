const path = require('path');
const fs = require('fs');

const fileName = 'input.txt';
const filePath = path.join(__dirname, fileName);
const options = { encoding: 'utf8', flags: 'a' };

const ws = fs.createWriteStream(filePath, options);

ws.on('error', (err) => console.log(err));

process.stdout.write('Привет! Введите текст:' + '\n');

process.stdin.on('data', (data) => {
  if (data.toString().trim() === 'exit') process.exit();

  ws.write(data);
});

process.on('SIGINT', () => {
  process.exit();
});

process.on('exit', () => {
  ws.end();
  process.stdout.write(`Текст добавлен в файл ${fileName}`);
});
