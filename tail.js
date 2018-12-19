const { readFileSync, existsSync } = require('fs');
const { organizeCommandOutput } =  require('./src/lib.js');
const { extractUserArgs } = require('./src/parseInput.js');

const main = function() {
  let args = extractUserArgs(process.argv.slice(2));
  console.log(organizeCommandOutput(args, "tail", existsSync, readFileSync));
}

main();
