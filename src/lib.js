const { findOptionError } = require('./errorLib.js');

const extractContents = function(numberOfContents, delimeter, file) {
  let contents = file.split(delimeter);
  return contents.slice(0, numberOfContents).join(delimeter);
};

const applyFunc = function(fnReferance, files) {
  return files.map(file => fnReferance(file, "utf8"));
};

const putHeader = function(fileNames, fileContent, length) {
  let contentWithLabel = [];
  if (length < 2) return fileContent;

  for (let index = 0; index < fileNames.length; index++) {
    let tag = "==> " + fileNames[index] + " <==";
    contentWithLabel[index] = tag + "\n" + fileContent[index];
  }
  return contentWithLabel;
};

const extractHeadLines = function(listOfFileContents, numberOfLines) {
  let getLines = extractContents.bind(null, numberOfLines, "\n");
  return listOfFileContents.map(getLines);
};

const extractHeadCharacters = function(listOfFileContents, numberOfBytes) {
  return listOfFileContents.map(characters =>
    characters.substring(0, numberOfBytes)
  );
};

const applyCommand = function(reader, inputData, command) {
  let commandCall = { head: { n: extractHeadLines, c: extractHeadCharacters},
    tail: { n: extractTailLines, c: extractTailCharacters} };

  let option = Object.keys(inputData)[1];
  let files = inputData.files;
  let fileContents = applyFunc(reader, files);
  return commandCall[command][option](fileContents, Math.abs(inputData[option]));
};

const validateFiles = function(type, isFileExists, fileList, list, file) {
  if (isFileExists(file)) {
    list["actualFile"].push(file);
    return list;
  }

  let error = type + ": " + file + ": No such file or directory";
  list["error"].push([error, fileList.indexOf(file)]);
  return list;
};

const insertError = function(validFiles, errorEntries) {
  let index = errorEntries[1];
  let firstPart = validFiles.slice(0, index);
  let secondPart = validFiles.slice(index);
  firstPart.push(errorEntries[0]);
  return firstPart.concat(secondPart);
};

const extractTailLines = function(listOfLines, numberOfLines) {
  return listOfLines.map(lines => {
    let count = Math.max(0, (lines.split('\n').length - numberOfLines));
    return lines.split('\n').slice(count).join('\n');
  });
};

const extractTailCharacters = function(listOfCharacters, numberOfBytes) {
  return listOfCharacters.map(characters => {
    let count = Math.max(0, (characters.length - numberOfBytes));
    return characters.slice(count);
  });
};

const organizeCommandResult = function(isFileExists, func, args, command) {
  if (findOptionError(args, command)) {
    return findOptionError(args, command);
  }

  let list = { actualFile: [], error: [] };
  let divideFiles = validateFiles.bind(null, command, isFileExists, args["files"]);
  let files = args["files"].reduce(divideFiles, list);
  args["files"] = files["actualFile"];

  let existingFile = applyCommand(func, args, command);
  let length = existingFile.length + files["error"].length;
  existingFile = putHeader(files["actualFile"], existingFile, length);

  return files["error"].reduce(insertError, existingFile).join("\n");
};

module.exports = {
  applyFunc,
  extractContents,
  extractHeadLines,
  applyCommand,
  extractHeadCharacters,
  findOptionError,
  insertError,
  putHeader,
  validateFiles,
  extractTailLines,
  extractTailCharacters,
  organizeCommandResult
};