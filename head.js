const { readFileSync, existsSync } = require('fs');
const { organizeHead } =  require('./src/lib.js');
const { extractHeadArgs } = require('./src/parseInput.js');

const main = function() {
  let args = extractHeadArgs(process.argv.slice(2));
  console.log(organizeHead(existsSync, readFileSync, args));
}

main();
