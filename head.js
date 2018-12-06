const { readFileSync, existsSync } = require('fs');
const { organizeHead, extractHeadArgs} =  require('./src/headLib.js');

const main = function() {
  let args = extractHeadArgs(process.argv);
  console.log(organizeHead(existsSync, readFileSync, args));
}

main();
