#!/usr/bin/env node
const { package, logger } = require("./util/util");
const convertJFToCF = require("./core/convertJsonToCsv");
const convertCFToJF = require("./core/convertCsvToJson");

const { program } = require('commander');

program.version(package.version);

program
    .command("csv <fileOrDir>")
    .description("Convert JSON to CSV")
    .option("-f, --file", "Specify as file")
    .option("-d, --dir", "Specify as directory")
    .option("-o, --output <dir>", "Output dirctory")
    .action(function(fileOrDir, comdObj) {

        if (comdObj.file && comdObj.dir) {
            logger.error("can't specify both --file and --dir");
            return;
        }

        if (comdObj.file) {
            console.log("File");
            if (!comdObj.output) {
                logger.error("valid directory required");
                return;
            }

            convertJFToCF.convertJsonFileToCsvFile(fileOrDir, comdObj.output);
        }

        // when -d flag is used to specify a directory of files
        if (comdObj.dir) {
            console.log("Dir");
            if (!comdObj.output) {
                logger.error("valid directory required");
                return;
            }

            convertJFToCF.convertJsonDirToCsvDir(fileOrDir, comdObj.output);
        }
    });

    program
        .command("json <fileOrDir>")
        .description("Convert CSv to JSON")
        .option("-f, --file", "Specify as file")
        .option("-d, --dir", "Specify as directory")
        .option("-o, --output <dir>", "Output dirctory")
        .option("-l --list", "Convert to JSON list")
        .action((fileOrDir, comdObj) => {

            if (comdObj.file && comdObj.dir) {
                logger.error("can't specify both --file and --dir");
                return;
            }
    
            if (comdObj.file) {
                console.log("File");
                if (!comdObj.output) {
                    logger.error("valid directory required");
                    return;
                }
    
                convertCFToJF.convertCsvFileToJsonFile(fileOrDir, comdObj.output, comdObj.list);
            }
    
            // when -d flag is used to specify a directory of files
            if (comdObj.dir) {
                console.log("Dir");
                if (!comdObj.output) {
                    logger.error("valid directory required");
                    return;
                }
    
                convertCFToJF.convertCsvDirToJsonDir(fileOrDir, comdObj.output, comdObj.list);
            }

        });

program.parse(process.argv)