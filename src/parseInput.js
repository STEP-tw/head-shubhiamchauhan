const hasCountAndOption = function( args ) {
  return !isFinite(args.substr(1)) && isFinite(parseInt(args.substr(2)));
}

const hasNoOption = function( args ) {
  return isFinite(parseInt(args[1]));
}

const extractUserArgs = function (args) {
  let firstUserArg = args[0] || "0";
  
  if (!firstUserArg.startsWith("-")) {
    return { files: args, option: "n", count: 10 };
  }

  if (firstUserArg[1] == "-") {
    return { files: args.slice(1), option: "n", count: 10 };
  }

  if (hasCountAndOption( firstUserArg )) {
    return {
      files: args.slice(1),
      option: firstUserArg[1],
      count: firstUserArg.substr(2)
    };
  }

  if (hasNoOption( firstUserArg )) {
    return { files: args.slice(1), option: "n", count: firstUserArg.substr(1) };
  }
  return { files: args.slice(2), option: firstUserArg[1], count: args[1] };
};

exports.extractUserArgs = extractUserArgs;