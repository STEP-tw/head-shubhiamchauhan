const { readFileSync, existsSync } = require('fs');
const { organizeCommandResult } =  require('./src/lib.js');
const { extractUsrArgs } = require('./src/parseInput.js');

const main = function() {
  let args = extractUsrArgs(process.argv.slice(2));
  console.log(organizeCommandResult(existsSync, readFileSync, args, "tail"));
}

main();
