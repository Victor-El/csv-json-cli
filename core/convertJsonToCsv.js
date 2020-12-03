const fs = require('fs');
const path = require('path');

const { convertJsonToCsv } = require('csv2jsonjs');
const { checkIfPathIsFile, checkIfPathExists, logger } = require('../util/util');

function convertJsonFileToCsvFile(file, outputDir) {
   if (!checkIfPathIsFile(file)) {
       logger.error(file + " is not a file");
       return;
   }

   if (checkIfPathIsFile(outputDir)) {
       logger.error("Invalid output dir");
       return;
   }

   const jsonFileContents = fs.readFileSync(file, "utf-8");
   const csv = convertJsonToCsv(jsonFileContents);
   const outputName = path.basename(file) + ".csv";
   const absoluteOutputDir = path.resolve(outputDir);
   const absolutePath = absoluteOutputDir + path.sep + outputName;
   fs.writeFileSync(absolutePath, csv);
}


function convertJsonDirToCsvDir(dir, outputDir) {

    const resolvedDir = path.resolve(dir);
    const resolvedOutputDir = path.resolve(outputDir);

    if (checkIfPathIsFile(resolvedDir)) {
        logger.error(resolvedDir + " is not a directory");
        return;
    }

    if (checkIfPathIsFile(resolvedOutputDir)) {
        logger.error("Invalid output dir");
        return;
    }

    const files = fs.readdirSync(resolvedDir, "utf-8");

    const jsonFiles = files.filter((file) => {
        return fs.lstatSync(path.resolve(resolvedDir + path.sep + file)).isFile();
    })
    .filter((file) => {
        return path.extname(file) == ".json";
    });

    for (let file of jsonFiles) {
        logger.info(file);
        const jsonFileContent = fs.readFileSync(path.resolve(resolvedDir + path.sep + file), "utf-8");
        const csvData = convertJsonToCsv(jsonFileContent);
        fs.writeFileSync(path.resolve(resolvedOutputDir + path.sep + file + ".csv"), csvData);
    }

}

module.exports = {
    convertJsonFileToCsvFile,
    convertJsonDirToCsvDir
};