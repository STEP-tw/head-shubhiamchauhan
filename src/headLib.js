const applyHeader = function(header, stringList, file) {
  stringList.push(header(file, "utf8"));
  return stringList;
}

const getHead = function(header, InputData) {
  let type = InputData.type;
  let file = InputData.file;
  let head = applyHeader.bind(null, header);
  let result = file.reduce(head,[]);
  return result.join("");
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

exports.getHead = getHead;
exports.extractHeadArgs = extractHeadArgs;
