/* eslint-disable @typescript-eslint/no-var-requires */

const path = require('path');
const process = require('process');

const distFolder = "/dist";

const cwd = process.cwd();
const target = path.join(__dirname, distFolder);
if (cwd != target) {
    console.error(`Change to the '${ distFolder }' folder before running 'npm publish'.`);
    console.log(' ');
    process.exit(1) //which terminates the publish process
}
