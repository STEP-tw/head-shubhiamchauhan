const getOption = function (option, args, argsList) {
  argsList[0][option[1]] = option.substr(2) || args[1];
  option[2] || args.shift();
  args = args.slice(1);
  argsList.push(args);
  return argsList;
};
const extractUsrOptions = function (args) {
  let option = args[0];
  let argsList = [{ files: [] }];

  if (option == "--") {
    return [{ files: [], n: 10 }, args.slice(1)];
  }

  if (option[0] == "-" && !isFinite(option.substr(1))) {
    return getOption(option, args, argsList);
  }

  if (option[0] == "-" && isFinite(parseInt(option[1]))) {
    return [{ files: [], n: option.substr(1) }, args.slice(1)];
  }

  return [{ files: [], n: 10 }, args];
};

const extractUsrArgs = function (args) {
  let extractOption = extractUsrOptions(args);
  let argsList = extractOption[0];
  userArgs = extractOption[1];
  argsList["files"] = userArgs;
  return argsList;

};
exports.extractUsrArgs = extractUsrArgs;
