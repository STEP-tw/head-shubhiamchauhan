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

  if( fileContent.length < 2) {
    return fileContent;
  }

  for(let index = 0; index < filesName.length; index++) {
    let tag = "==> " + filesName[index] + " <==";
    contentWithLabel[index] = tag + '\n' + fileContent[index];
  }

  return contentWithLabel;
}

const extractLines = function(files, listOfLines, numberOfLines) {
  let getLines = extractContents.bind(null, numberOfLines, "\n");
  let lines = listOfLines.map(getLines);
  return putHeader(files, lines).join('\n\n');
}

const subString = function(numberOfCharacters, string) {
  return string.substring(0, numberOfCharacters);
}

const extractCharacters = function(fileName, listOfCharacters, numberOfBytes) {
  let getCharacter = subString.bind(null, numberOfBytes);
  let characters = listOfCharacters.map(getCharacter);
  return putHeader(fileName, characters).join('\n');
}

const getHead = function(fnReferance, inputData) {
  let option = Object.keys(inputData)[1];
  let files = inputData.files;
  let head = {};
  head["n"] = extractLines;
  head["c"] = extractCharacters;
  let fileContents = applyFunc(fnReferance, files);
  return head[option](files, fileContents, +inputData[option]);
}

const getOption = function(option, args, argsList) {
  argsList[0][option[1]] = option.slice(2).join('') || args[1];
  option[2] || args.splice(0,1);
  args = args.slice(1);
  argsList.push(args);
  return argsList;
}

const extractHeadOption = function(args) {
  let option = Math.abs(args[0]) == args[0] || args[0].split('');
  let argsList = [ { files:[] } ];

  if(option[0] == "-" && !isFinite(option[1])) {
    return getOption(option, args, argsList);
  }

  if( option[0] == "-" && typeof(+option[1]) == 'number') {
    argsList[0]["n"] = option.slice(1).join('');
    args.shift();
    argsList.push(args);
    return argsList;
  }

  argsList[0]["n"] = 10;
  argsList.push(args);
  return argsList;
}

const extractHeadArgs = function(args) {
  let userArgs = args.slice(2);
  let extractOption = extractHeadOption(userArgs);
  let argsList = extractOption[0];
  userArgs = extractOption[1];
  argsList["files"] = userArgs;
  return argsList;
}

exports.applyFunc = applyFunc;
exports.extractHeadArgs = extractHeadArgs;
exports.extractContents = extractContents;
exports.extractLines = extractLines;
exports.getHead = getHead;
exports.extractCharacters = extractCharacters;
