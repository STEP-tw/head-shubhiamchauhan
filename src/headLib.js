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

const putHeader = function(filesName, fileContent, length) {
  let contentWithLabel = []

  if(length < 2) {
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
  return listOfLines.map(getLines);
}

const subString = function(numberOfCharacters, string) {
  return string.substring(0, numberOfCharacters);
}

const extractCharacters = function(fileName, listOfCharacters, numberOfBytes) {
  let getCharacter = subString.bind(null, numberOfBytes);
  return listOfCharacters.map(getCharacter);
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

const validateFiles = function(isFileExists, fileList, list, file) {

  if(isFileExists(file)) {
    list["actualFile"].push(file);
    return list;
  }

  let error = "head: "+ file +": No such file or directory";
  list["error"].push([error, fileList.indexOf(file)]);
  return list;
}

const insertError = function(validFiles, errorEntries) {
  let index = errorEntries[1];
  let firstPart = validFiles.slice(0,index);
  firstPart.push(errorEntries[0]);
  let secondPart = validFiles.slice(index);
  return firstPart.concat(secondPart);
}

const findOptionError = function(args) {
  let type = Object.keys(args)[1];
  let countError = { n:"line", c:"byte"};

  if( !( ["n","c"].includes(type) ) ) {
    return "head: illegal option -- "+ type +"\nusage: head [-n lines | -c bytes] [file ...]";
  }

  if( args[type] == undefined) {
    return "head: option requires an argument -- "+ type +"\nusage: head [-n lines | -c bytes] [file ...]";
  }

  if(args[type] <1 || parseInt(args[type]) != args[type]) {
    return "head: illegal "+ countError[type] +" count -- " + args[type];
  }
  return "";
}

const head = function(isFileExists, func, args) {

  if(findOptionError(args)) {
    return findOptionError(args);
  }

  let list = { actualFile:[], error:[] };
  let divideFiles = validateFiles.bind(null,isFileExists, args["files"]);
  let files = args["files"].reduce(divideFiles, list);

  args["files"] = files["actualFile"];
  let existingFile = getHead(func, args);
  let length = existingFile.length + files["error"].length;
  existingFile = putHeader(files["actualFile"], existingFile, length);

  return files["error"].reduce(insertError,existingFile).join('\n');
}

const getOption = function(option, args, argsList) {
  argsList[0][option[1]] = option.substr(2) || args[1];
  option[2] || args.splice(0,1);
  args = args.slice(1);
  argsList.push(args);
  return argsList;
}

const extractHeadOption = function(args) {
  let option = args[0];
  let argsList = [ { files:[] } ];

  if(option == "--" ) {
    argsList[0]["n"] = 10;
    args.shift();
    argsList.push(args);
    return argsList;
  }

  if(option[0] == "-" && !isFinite(option[1])) {
    return getOption(option, args, argsList);
  }

  if( option[0] == "-" && isFinite(parseInt(option[1]))) {
    argsList[0]["n"] = option.substr(1);
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
exports.head = head;
exports.findOptionError = findOptionError;
