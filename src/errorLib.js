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
  let { option, count } = args;

  if (!isValidOption(option)) {
    return command + ": illegal option -- " + option + "\n" + usage[command];
  }

  if (hasNoCount(count)) {
    return command + undefinedArgError + option + "\n" + usage[command];
  }

  if (hasAlphanumericCount(count)) {
    return command + ": illegal " + countError[command][option] + " -- " + count;
  }

  if (isHeadCountLessThanOne(count, command)) {
    return "head: illegal " + countError[command][option] + " -- " + count;
  }
  return "";
};

exports.findOptionError = findOptionError;