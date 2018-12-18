const extractUserOptions = function (args) {
  let option = args[0];
  let validatedFiles = { files: [] };
  if (!option.startsWith("-")) {
    return [{ files: [], n: 10 }, args];
  }

  if (option[1] == "-") {
    return [{ files: [], n: 10 }, args.slice(1)];
  }

  if (!isFinite(option.substr(1)) && +option.substr(2)) {
    validatedFiles[option[1]] = +option.substr(2);
    return [validatedFiles, args.slice(1)];
  }

  if (isFinite(parseInt(option[1]))) {
    return [{ files: [], n: option.substr(1) }, args.slice(1)];
  }
  validatedFiles[option[1]] = args[1];
  return [validatedFiles, args.slice(2)];
};

const extractUserArgs = function (args) {
  let extractOption = extractUserOptions(args);
  let validatedFiles = extractOption[0];
  userArgs = extractOption[1];
  validatedFiles["files"] = userArgs;
  return validatedFiles;

};
exports.extractUserArgs = extractUserArgs;