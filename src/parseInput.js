const extractUserOptions = function (args) {
  let option = args[0];
  if (!option.startsWith("-")) {
    return [{ files: [], option:"n", count:10 }, args];
  }

  if (option[1] == "-") {
    return [{ files: [], option:"n", count: 10 }, args.slice(1)];
  }

  if (!isFinite(option.substr(1)) && +option.substr(2)) {
    return [{ files: [], option:option[1], count: +option.substr(2) }, args.slice(1)];
  }

  if (isFinite(parseInt(option[1]))) {
    return [{ files: [], option:"n", count: option.substr(1) }, args.slice(1)];
  }
  return [{ files: [], option:option[1], count: +args[1] }, args.slice(2)];
};

const extractUserArgs = function (args) {
  let extractOption = extractUserOptions(args);
  let validatedArgs = extractOption[0];
  userArgs = extractOption[1];
  validatedArgs["files"] = userArgs;
  return validatedArgs;

};
exports.extractUserArgs = extractUserArgs;