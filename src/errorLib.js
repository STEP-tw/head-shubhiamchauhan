const countError = {
  head: { "n": "line count", "c": "byte count" },
  tail: { "n": "offset", "c": "offset" }
};

const usage = {
  head: "usage: head [-n lines | -c bytes] [file ...]",
  tail: "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"
};

const undefinedArgError = ": option requires an argument -- ";

const isValidOption = function (optionType) {
  return ["n", "c"].includes(optionType);
}

const hasNoCount = function(count){
  return count == undefined;
}

const hasAlphanumericCount = function(count) {
  return parseInt(count) != count;
}

const isHeadCountLessThanOne = function(count, command) {
return count < 1 && command == "head";
}

const findOptionError = function (args, command) {
  let type = Object.keys(args)[1];

  if (!isValidOption(type)) {
    return command + ": illegal option -- " + type + "\n" + usage[command];
  }

  if (hasNoCount(args[type])) {
    return command + undefinedArgError + type + "\n" + usage[command];
  }

  if (hasAlphanumericCount(args[type])) {
    return command + ": illegal " + countError[command][type] + " -- " + args[type];
  }

  if (isHeadCountLessThanOne(args[type], command)) {
    return "head: illegal " + countError[command][type] + " -- " + args[type];
  }
  return "";
};

exports.findOptionError = findOptionError;