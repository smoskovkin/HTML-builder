const { join, parse } = require('path');
const { readdir, stat } = require('fs/promises');

const directoryName = 'secret-folder';
const directoryPath = join(__dirname, directoryName);

const getFileList = async (directoryPath) => {
  const options = { withFileTypes: true };
  const directoryContent = await readdir(directoryPath, options);

  return directoryContent.filter((el) => el.isFile());
};

const formatFileList = async (fileList, directoryPath) => {
  let result = [];

  for (const file of fileList) {
    const { name, ext } = parse(file.name);
    const { size } = await stat(join(directoryPath, file.name));
    result.push(`${name}-${ext.slice(1)}-${size}b`);
  }

  return result;
};

const printFileList = (fileList) => {
  fileList.forEach((file) => console.log(file));
};

(async () => {
  const fileList = await getFileList(directoryPath);
  const formattedFileList = await formatFileList(fileList, directoryPath);
  printFileList(formattedFileList);
})();
