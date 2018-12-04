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

const putHeader = function(filesName, fileContent) {
  let contentWithLabel = []
  for(let index = 0; index < filesName.length; index++) {
    let tag = "==> " + filesName[index] + " <==";
    contentWithLabel[index] = tag + '\n' + fileContent[index];
  }
  return contentWithLabel;
}

const extractLines = function(files, listOfLines, numberOfLines) {
  let getLines = extractContents.bind(null, numberOfLines, "\n");
  let lines = listOfLines.map(getLines);
  if( lines.length < 2) {
    return lines.join('');
  }
  return putHeader(files, lines).join('\n\n');
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

const getHead = function(fnReferance, inputData) {
  let option = Object.keys(inputData)[0];
  let files = inputData.files;
  let head = {};
  head["n"] = extractLines;
  let result = applyFunc(fnReferance, files);
  return head[option](files, result, +inputData[option]);
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
exports.extractLines = extractLines;
exports.getHead = getHead;
