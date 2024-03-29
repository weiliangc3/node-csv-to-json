const parse = require('csv-parse/lib/sync');
const fs = require('fs');
const util = require('util');

const argv = require('minimist')(process.argv.slice(2));
const buildFolder = 'build/';
const prefix = argv.prefix || "kbredirect";
const src = `src/${argv.src || "redirects-worksheet.csv"}`;
const destinationFileName = argv.destination || "redirects.json"

const destinationFileLocation = buildFolder + destinationFileName;

start();

async function start() {
  const fileContents = await readFile(src);
  const parsedContents = parse(fileContents, {
    skip_empty_lines: true
  })

  const stringToWrite = JSON.stringify(formatContent(parsedContents))

  writeToFile(destinationFileLocation, stringToWrite)
}

function formatContent(content) {
  jsonContent = [];
  content.map((currentValue, index)=>{
    fromValue = currentValue[0].replace(/(^\w+:|^)\/\//, '');

    jsonContent.push(
      {
        name: `${prefix}${index}`,
        from: fromValue,
        to: currentValue[1]
      }
    )
  })
  return jsonContent;
}

function readFile(fileLocation){
  const read = util.promisify(fs.readFile)
  return read(fileLocation, 'utf8')
}

function writeNewFile(destination, stringToWrite) {
  fs.writeFile(destination, stringToWrite, (err) => {
    if(err) {
        return console.log(err);
    }
  });
}

function writeToFile(destination, string) {
  if (!fs.existsSync(buildFolder)){
    fs.mkdirSync(buildFolder);
  }

  if (fs.existsSync(destination)) {
    fs.unlink(destination, () => {
      writeNewFile(destination, string);
    });
  } else {
    writeNewFile(destination, string);
  }
}
