const fs = require('fs');
const path = require('path');

const { convertJsonToCsv } = require('csv2jsonjs');
const { checkIfPathIsFile, checkIfPathExists, logger } = require('../util/util');

function convertJsonFileToCsvFile(file, outputDir) {
   if (!checkIfPathIsFile(file)) {
       logger.error(file + " is not a file");
       return;
   }

   const jsonFileContents = fs.readFileSync(file, "utf-8");
   const csv = convertJsonToCsv(jsonFileContents);
   const outputName = path.basename(file) + ".csv";
   const absoluteOutputDir = path.resolve(outputDir);
   const absolutePath = absoluteOutputDir + path.sep + outputName;
   fs.writeFileSync(absolutePath, csv);
}

module.exports = convertJsonFileToCsvFile;