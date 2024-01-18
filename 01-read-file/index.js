const fs = require('fs');
const path = require('path');

const fileName = 'text.txt';
const filePath = path.join(__dirname, fileName);
const options = { encoding: 'utf8' };

fs.createReadStream(filePath, options)
  .on('error', (err) => console.log(err))
  .pipe(process.stdout);
