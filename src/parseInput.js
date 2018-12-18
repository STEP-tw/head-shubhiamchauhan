const getOption = function (option, args, validatedFiles) {
  validatedFiles[0][option[1]] = option.substr(2) || args[1];
  option[2] || args.shift();
  args = args.slice(1);
  validatedFiles.push(args);
  return validatedFiles;
};

const extractUserOptions = function (args) {
  let option = args[0];

  if (option == "--") {
    return [{ files: [], n: 10 }, args.slice(1)];
  }

  if (option[0] == "-" && !isFinite(option.substr(1))) {
    return getOption(option, args, [{ files: [] }]);
  }

  if (option[0] == "-" && isFinite(parseInt(option[1]))) {
    return [{ files: [], n: option.substr(1) }, args.slice(1)];
  }

  return [{ files: [], n: 10 }, args];
};

const extractUserArgs = function (args) {
  let extractOption = extractUserOptions(args);
  let validatedFiles = extractOption[0];
  userArgs = extractOption[1];
  validatedFiles["files"] = userArgs;
  return validatedFiles;

};
exports.extractUserArgs = extractUserArgs;