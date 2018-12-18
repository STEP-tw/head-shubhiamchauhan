const { findOptionError } = require('./errorLib.js');

const extractContents = function (numberOfContents, delimeter, file) {
  let contents = file.split(delimeter);
  return contents.slice(0, numberOfContents).join(delimeter);
};

const putHeader = function (fileNames, fileContent, length) {
  let contentWithLabel = [];
  if (length < 2) return fileContent;

  for (let index = 0; index < fileNames.length; index++) {
    let tag = "==> " + fileNames[index] + " <==";
    contentWithLabel[index] = tag + "\n" + fileContent[index];
  }
  return contentWithLabel;
};

const extractHeadLines = function (listOfFileContents, numberOfLines) {
  let getLines = extractContents.bind(null, numberOfLines, "\n");
  return listOfFileContents.map(getLines);
};

const extractHeadCharacters = function (listOfFileContents, numberOfBytes) {
  return listOfFileContents.map(characters =>
    characters.substring(0, numberOfBytes)
  );
};

const applyCommand = function (reader, inputData, command) {
  let commandCall = {
    head: { n: extractHeadLines, c: extractHeadCharacters },
    tail: { n: extractTailLines, c: extractTailCharacters }
  };

  let { files, option, count } = inputData;
  let fileContents = files.map(file => reader(file, "utf8"));
  return commandCall[command][option](fileContents, Math.abs(count));
};

const validateFiles = function (type, isFileExists, fileList, validatedFiles, file) {
  if (isFileExists(file)) {
    validatedFiles["actualFile"].push(file);
    return validatedFiles;
  }

  let error = type + ": " + file + ": No such file or directory";
  validatedFiles["error"].push([error, fileList.indexOf(file)]);
  return validatedFiles;
};

const insertError = function (validFiles, errorEntries) {
  let index = errorEntries[1];
  let firstPart = validFiles.slice(0, index);
  let secondPart = validFiles.slice(index);
  firstPart.push(errorEntries[0]);
  return firstPart.concat(secondPart);
};

const extractTailLines = function (listOfFileContents, numberOfLines) {
  return listOfFileContents.map(lines => {
    let count = Math.max(0, (lines.split('\n').length - numberOfLines));
    return lines.split('\n').slice(count).join('\n');
  });
};

const extractTailCharacters = function (listOfFileContents, numberOfBytes) {
  return listOfFileContents.map(characters => {
    let count = Math.max(0, (characters.length - numberOfBytes));
    return characters.slice(count);
  });
};

const organizeCommandResult = function (isFileExists, reader, args, command) {
  if (findOptionError(args, command)) {
    return findOptionError(args, command);
  }

  let validatedFiles = { actualFile: [], error: [] };
  let getValidatedFiles = validateFiles.bind(null, command, isFileExists, args["files"]);
  validatedFiles = args["files"].reduce(getValidatedFiles, validatedFiles);
  args["files"] = validatedFiles["actualFile"];

  let existingFile = applyCommand(reader, args, command);
  let length = existingFile.length + validatedFiles["error"].length;
  existingFile = putHeader(validatedFiles["actualFile"], existingFile, length);

  return validatedFiles["error"].reduce(insertError, existingFile).join("\n");
};

module.exports = {
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