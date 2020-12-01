#!/usr/bin/env node
const { package, logger } = require("./util/util");
const convertJFToCF = require("./core/convertJsonToCsv");

const { program } = require('commander');

const chalk = require('chalk');

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

            convertJFToCF(fileOrDir, comdObj.output);
        }

        if (comdObj.dir) {
            console.log("Dir");
        }
    });

program.parse(process.argv)