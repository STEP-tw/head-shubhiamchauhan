const { readFileSync, existsSync } = require('fs');
const { organizeCommandResult } =  require('./src/lib.js');
const { extractUserArgs } = require('./src/parseInput.js');

const main = function() {
  let args = extractUserArgs(process.argv.slice(2));
  console.log(organizeCommandResult(args, "head", existsSync, readFileSync));
}

main();
