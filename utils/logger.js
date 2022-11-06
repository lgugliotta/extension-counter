const path = require("path");
const { config } = require('../config');

const logLevels = ['debug','info', 'warn', 'error']

/**
* Logger function for improve the log visualization in GCP
* @class
*/
const log = (message, level) => {
    if(logLevels.indexOf(level)>=logLevels.indexOf(config.LOG_LEVEL.toLowerCase())) {
        if (typeof message !== 'string' && !(message instanceof Error)) message = JSON.stringify(message)
        console.log(`[${new Date().toISOString()}] [${level.toUpperCase()}] [${getStackInfo()}] ${message}`)
    }
}

/**
* Get the stack trace information of the current call
* @returns {string}
*/
const getStackInfo = () => {
    let stacklist = (new Error()).stack.split('\n').slice(3);
    let sp = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/gi.exec(stacklist[0]) || /at\s+()(.*):(\d*):(\d*)/gi.exec(stacklist[0]);
    return `${path.relative(path.join(__dirname, '..'), sp[2])}:${sp[3]}`
}

module.exports = { log };
