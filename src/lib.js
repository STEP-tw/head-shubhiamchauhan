const revString = function(delimeter,string) {
  return string.split(delimeter).reverse().join(delimeter);
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

const extractHeadLines = function(listOfLines, numberOfLines) {
  let getLines = extractContents.bind(null, numberOfLines, "\n");
  return listOfLines.map(getLines);
};

const extractHeadCharacters = function(listOfCharacters, numberOfBytes) {
  return listOfCharacters.map(characters =>
    characters.substring(0, numberOfBytes)
  );
};

const applyCommand = function(fnReferance, inputData, command) {
  let option = Object.keys(inputData)[1];
  let files = inputData.files;
  let callCommand = { head: { n: extractHeadLines, c: extractHeadCharacters},
    tail: { n: extractTailLines, c: extractTailCharacters} };
  let fileContents = applyFunc(fnReferance, files);
  return callCommand[command][option](fileContents, Math.abs(inputData[option]));
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
  firstPart.push(errorEntries[0]);
  let secondPart = validFiles.slice(index);
  return firstPart.concat(secondPart);
};

const findOptionError = function(args, command) {
  let type = Object.keys(args)[1];
  let countError = { head:{ "n": "line count", "c": "byte count" },
    tail:{ "n":"offset", "c":"offset"} };
  let usage = { head:"usage: head [-n lines | -c bytes] [file ...]",
    tail:"usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"};

  if (!["n", "c"].includes(type)) {
    return command + ": illegal option -- " + type + "\n" + usage[command];
  }

  if (args[type] == undefined) {
    let actualError = ": option requires an argument -- ";
    return command + actualError + type + "\n" + usage[command];
  }

  if (parseInt(args[type]) != args[type]) {
    return command + ": illegal " + countError[command][type] + " -- " + args[type];
  }

  if(args[type] < 1 && command == "head") {
    return "head: illegal " + countError[command][type] + " -- " + args[type];
  }
  return "";
};

const extractTailLines = function(listOfLines, numberOfLines) {
  return listOfLines.map(lines => {
    if(numberOfLines == 0) { return ""; };
    return lines.split('\n').slice(-numberOfLines).join('\n');
  });
};

const extractTailCharacters = function(listOfCharacters, numberOfBytes) {
  return listOfCharacters.map(characters => {
    if(numberOfBytes == 0) { return ""; };
    return characters.slice(-numberOfBytes);
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
  revString,
  extractTailLines,
  extractTailCharacters,
  organizeCommandResult
};