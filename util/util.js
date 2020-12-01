const fs = require('fs');

const chalk = require('chalk');

const packageFile = fs.readFileSync("./package.json", "utf-8");

const package = JSON.parse(packageFile);

// console.log(package);


const logger = {
    success: function(str) {
        console.log(chalk.bold.green(str));
    },
    info: function(str) {
        console.log(chalk.bold.blue(str));
    },
    debug: function(str) {
        console.log(str);
    },
    warn: function(str) {
        console.log(chalk.yellowBright.italic(str))
    },
    error: function(str) {
        console.log(chalk.red.bold(str));
    }
};


function checkIfPathExists(path) {
    return fs.existsSync(path);
}

function checkIfPathIsFile(path) {
    return checkIfPathExists && fs.lstatSync(path).isFile();
}


module.exports = {
    package,
    logger,
    checkIfPathExists,
    checkIfPathIsFile
};