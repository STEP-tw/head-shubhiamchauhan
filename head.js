const { readFileSync, existsSync } = require('fs');
const { head, extractHeadArgs} =  require('./src/headLib.js');

const main = function() {
  let args = extractHeadArgs(process.argv);
  console.log(head(existsSync, readFileSync, args));
}

main();
