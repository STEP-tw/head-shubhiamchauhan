const extractUserArgs = function (args) {
  let firstUserArg = args[0];
  if (!firstUserArg.startsWith("-")) {
    return { files: args, option: "n", count: 10 };
  }

  if (firstUserArg[1] == "-") {
    return { files: args.slice(1), option: "n", count: 10 };
  }

  if (!isFinite(firstUserArg.substr(1)) && +firstUserArg.substr(2)) {
    return {
      files: args.slice(1),
      option: firstUserArg[1],
      count: +firstUserArg.substr(2)
    };
  }

  if (isFinite(parseInt(firstUserArg[1]))) {
    return { files: args.slice(1), option: "n", count: firstUserArg.substr(1) };
  }
  return { files: args.slice(2), option: firstUserArg[1], count: +args[1] };
};

exports.extractUserArgs = extractUserArgs;