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

const getHead = function(fnReferance, inputData) {
  let option = Object.keys(inputData)[1];
  let files = inputData.files;
  let head = {};
  head["n"] = extractHeadLines;
  head["c"] = extractHeadCharacters;
  let fileContents = applyFunc(fnReferance, files);
  return head[option](fileContents, +inputData[option]);
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
  let divideFiles = validateFiles.bind(null, "head", isFileExists, args["files"]);
  let files = args["files"].reduce(divideFiles, list);

  args["files"] = files["actualFile"];
  let existingFile = getHead(func, args);
  let length = existingFile.length + files["error"].length;
  existingFile = putHeader(files["actualFile"], existingFile, length);

  return files["error"].reduce(insertError, existingFile).join("\n");
};

const revLines = function(listOfLines) {
  let revLine = revString.bind(null, "\n");
  return listOfLines.map(revLine);
}

const revCharacters = function(listOfLines) {
  return listOfLines.map(lines => 
    lines.split("\n").reverse().map(line => 
      line.split('').reverse().join('')
    ).join('\n')
  );
}

const extractTailLines = function(listOfLines, numberOfLines) {
  let getLines = extractContents.bind(null, numberOfLines, "\n");
  let listOfRevLines = revLines(listOfLines).map(getLines);
  return revLines(listOfRevLines);
};

const extractTailCharacters = function(listOfCharacters, numberOfBytes) {
  let revTailChars = revCharacters(listOfCharacters).map(characters =>
    characters.substring(0, numberOfBytes)
  );
  return revCharacters(revTailChars);
};

exports.applyFunc = applyFunc;
exports.extractContents = extractContents;
exports.extractHeadLines = extractHeadLines;
exports.getHead = getHead;
exports.extractHeadCharacters = extractHeadCharacters;
exports.organizeHead = organizeHead;
exports.findOptionError = findOptionError;
exports.insertError = insertError;
exports.putHeader = putHeader;
exports.validateFiles = validateFiles;
exports.organizeHead = organizeHead;
exports.revString = revString;
exports.extractTailLines = extractTailLines;
exports.extractTailCharacters = extractTailCharacters;
