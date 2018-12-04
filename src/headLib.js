const {readFileSync} = require('fs');
const extractContents = function(numberOfContents, delimeter, file) {
  let contents = file.split(delimeter);
  return contents.slice(0,numberOfContents).join(delimeter);
}

const apply = function(fnReferance, file) {
  return fnReferance(file, "utf8");
}

const applyFunc = function(fnReferance, files) {
 let result = apply.bind(null, fnReferance);
  return files.map(result);
}

const extractHeadOption = function(args) {
  let option = args[0].split('');
  let result = [{files:[]}];

  if(option[0] == "-" && !(+option[1])) {
    result[0][option[1]] = option.slice(2).join('') || args[1];
    option[2] || args.splice(0,1);
    args = args.slice(1);
    result.push(args);
    return result;
  }

  result[0]["n"] = +option.slice(1).join('') || 10;
  result.push(args);
  return result;
}

const extractHeadArgs = function(args) {
  let userArgs = args.slice(2);
  let extractOption = extractHeadOption(userArgs);
  let result = extractOption[0];
  userArgs = extractOption[1];
  +userArgs[0] && userArgs.shift();
  result["files"] = userArgs;
  return result;
}

exports.applyFunc = applyFunc;
exports.extractHeadArgs = extractHeadArgs;
exports.extractContents = extractContents;
