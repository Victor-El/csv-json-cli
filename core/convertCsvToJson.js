const fs = require('fs');
const path = require('path');

const { convertCsvToHash, convertCsvToJSONList } = require('csv2jsonjs');
const { checkIfPathIsFile, checkIfPathExists, logger } = require('../util/util');

function convertCsvFileToJsonFile(file, outputDir, toList) {
    if (!checkIfPathIsFile(file)) {
        logger.error(file + " is not a file");
        return;
    }
 
    if (checkIfPathIsFile(outputDir)) {
        logger.error("Invalid output dir");
        return;
    }
 
    const csvFileContents = fs.readFileSync(file, "utf-8");
    const json = toList ? convertCsvToJSONList(csvFileContents) : convertCsvToHash(csvFileContents);
    const outputName = path.basename(file) + ".json";
    const absoluteOutputDir = path.resolve(outputDir);
    const absolutePath = absoluteOutputDir + path.sep + outputName;
    fs.writeFileSync(absolutePath, json);
 }
 
 
 function convertCsvDirToJsonDir(dir, outputDir, toList) {
 
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
         return path.extname(file) == ".csv";
     });
 
     for (let file of jsonFiles) {
         logger.info(file);
         const csvFileContent = fs.readFileSync(path.resolve(resolvedDir + path.sep + file), "utf-8");
         const jsonData = toList ? convertCsvToJSONList(csvFileContent) : convertCsvToHash(csvFileContent);
         fs.writeFileSync(path.resolve(resolvedOutputDir + path.sep + file + ".json"), jsonData);
     }
 
 }
 
 module.exports = {
     convertCsvFileToJsonFile,
     convertCsvDirToJsonDir
 };