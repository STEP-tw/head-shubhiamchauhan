const revString = function(string) {
  return string.split('').reverse().join('');
}

const extractContents = function(numberOfContents, delimeter, file) {
  let contents = file.split(delimeter);
  return contents.slice(0, numberOfContents).join(delimeter);
};

const applyFunc = function(fnReferance, files) {
  return files.map(file => fnReferance(file, "utf8"));
};

const putHeader = function(filesName, fileContent, length) {
  let contentWithLabel = [];

  if (length < 2) {
    return fileContent;
  }

  for (let index = 0; index < filesName.length; index++) {
    let tag = "==> " + filesName[index] + " <==";
    contentWithLabel[index] = tag + "\n" + fileContent[index];
  }

  return contentWithLabel;
};

const extractLines = function(files, listOfLines, numberOfLines) {
  let getLines = extractContents.bind(null, numberOfLines, "\n");
  return listOfLines.map(getLines);
};

const extractCharacters = function(fileName, listOfCharacters, numberOfBytes) {
  return listOfCharacters.map(characters =>
    characters.substring(0, numberOfBytes)
  );
};

const getHead = function(fnReferance, inputData) {
  let option = Object.keys(inputData)[1];
  let files = inputData.files;
  let head = {};
  head["n"] = extractLines;
  head["c"] = extractCharacters;
  let fileContents = applyFunc(fnReferance, files);
  return head[option](files, fileContents, +inputData[option]);
};

const validateFiles = function(isFileExists, fileList, list, file) {
  if (isFileExists(file)) {
    list["actualFile"].push(file);
    return list;
  }

  let error = "head: " + file + ": No such file or directory";
  list["error"].push([error, fileList.indexOf(file)]);
  return list;
};

const insertError = function(validFiles, errorEntries) {
  let index = errorEntries[1];
  let firstPart = validFiles.slice(0, index);
  firstPart.push(errorEntries[0]);
  let secondPart = validFiles.slice(index);
  return firstPart.concat(secondPart);
};

const findOptionError = function(args) {
  let type = Object.keys(args)[1];
  let countError = { n: "line", c: "byte" };

  if (!["n", "c"].includes(type)) {
    return (
      "head: illegal option -- " +
      type +
      "\nusage: head [-n lines | -c bytes] [file ...]"
    );
  }

  if (args[type] == undefined) {
    return (
      "head: option requires an argument -- " +
      type +
      "\nusage: head [-n lines | -c bytes] [file ...]"
    );
  }

  if (args[type] < 1 || parseInt(args[type]) != args[type]) {
    return "head: illegal " + countError[type] + " count -- " + args[type];
  }
  return "";
};

const organizeHead = function(isFileExists, func, args) {
  if (findOptionError(args)) {
    return findOptionError(args);
  }

  let list = { actualFile: [], error: [] };
  let divideFiles = validateFiles.bind(null, isFileExists, args["files"]);
  let files = args["files"].reduce(divideFiles, list);

  args["files"] = files["actualFile"];
  let existingFile = getHead(func, args);
  let length = existingFile.length + files["error"].length;
  existingFile = putHeader(files["actualFile"], existingFile, length);

  return files["error"].reduce(insertError, existingFile).join("\n");
};

const getOption = function(option, args, argsList) {
  argsList[0][option[1]] = option.substr(2) || args[1];
  option[2] || args.shift();
  args = args.slice(1);
  argsList.push(args);
  return argsList;
};

const extractHeadOption = function(args) {
  let option = args[0];
  let argsList = [{ files: [] }];

  if (option == "--") {
    return [{ files: [], n: 10 }, args.slice(1)];
  }

  if (option[0] == "-" && !isFinite(option[1])) {
    return getOption(option, args, argsList);
  }

  if (option[0] == "-" && isFinite(parseInt(option[1]))) {
    return [{ files: [], n: option.substr(1) }, args.slice(1)];
  }

  return [{ files: [], n: 10 }, args];
};

const extractHeadArgs = function(args) {
  let extractOption = extractHeadOption(args);
  let argsList = extractOption[0];
  userArgs = extractOption[1];
  argsList["files"] = userArgs;
  return argsList;
};

exports.applyFunc = applyFunc;
exports.extractHeadArgs = extractHeadArgs;
exports.extractContents = extractContents;
exports.extractLines = extractLines;
exports.getHead = getHead;
exports.extractCharacters = extractCharacters;
exports.organizeHead = organizeHead;
exports.findOptionError = findOptionError;
exports.insertError = insertError;
exports.putHeader = putHeader;
exports.validateFiles = validateFiles;
exports.organizeHead = organizeHead;
