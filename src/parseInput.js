const extractUserOptions = function (args) {
  let option = args[0];
  let validatedArgs = { files: [] };
  if (!option.startsWith("-")) {
    return [{ files: [], n: 10 }, args];
  }

  if (option[1] == "-") {
    return [{ files: [], n: 10 }, args.slice(1)];
  }

  if (!isFinite(option.substr(1)) && +option.substr(2)) {
    validatedArgs[option[1]] = +option.substr(2);
    return [validatedArgs, args.slice(1)];
  }

  if (isFinite(parseInt(option[1]))) {
    return [{ files: [], n: option.substr(1) }, args.slice(1)];
  }
  validatedArgs[option[1]] = args[1];
  return [validatedArgs, args.slice(2)];
};

const extractUserArgs = function (args) {
  let extractOption = extractUserOptions(args);
  let validatedArgs = extractOption[0];
  userArgs = extractOption[1];
  validatedArgs["files"] = userArgs;
  return validatedArgs;

};
exports.extractUserArgs = extractUserArgs;