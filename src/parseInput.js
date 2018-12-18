const extractUserArgs = function (args) {
  let option = args[0];
  if (!option.startsWith("-")) {
    return { files: args, option: "n", count: 10 };
  }

  if (option[1] == "-") {
    return { files: args.slice(1), option: "n", count: 10 };
  }

  if (!isFinite(option.substr(1)) && +option.substr(2)) {
    return { files: args.slice(1), option: option[1], count: +option.substr(2) };
  }

  if (isFinite(parseInt(option[1]))) {
    return { files: args.slice(1), option: "n", count: option.substr(1) };
  }
  return { files: args.slice(2), option: option[1], count: +args[1] };
};

exports.extractUserArgs = extractUserArgs;