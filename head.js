const { readFileSync, existsSync } = require('fs');
const { organizeHead, extractHeadArgs} =  require('./src/headLib.js');

const main = function() {
  let args = extractHeadArgs(process.argv.silce(2));
  console.log(organizeHead(existsSync, readFileSync, args));
}

main();
