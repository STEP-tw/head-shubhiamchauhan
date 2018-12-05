const { readFileSync } = require('fs');
const { getHead, extractHeadArgs} =  require('./src/headLib.js');

const main = function() {
  let args = extractHeadArgs(process.argv);
  console.log(getHead(readFileSync, args));
}

main();
