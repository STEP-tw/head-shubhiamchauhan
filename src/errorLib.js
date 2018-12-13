const countError = { head:{ "n": "line count", "c": "byte count" },
  tail:{ "n":"offset", "c":"offset"} };

const usage = { head:"usage: head [-n lines | -c bytes] [file ...]",
  tail:"usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]"};

const undefinedArgError = ": option requires an argument -- ";

const findOptionError = function(args, command) {
  let type = Object.keys(args)[1];

  if (!["n", "c"].includes(type)) {
    return command + ": illegal option -- " + type + "\n" + usage[command];
  }

  if (args[type] == undefined) {
    return command + undefinedArgError + type + "\n" + usage[command];
  }

  if (parseInt(args[type]) != args[type]) {
    return command + ": illegal " + countError[command][type] + " -- " + args[type];
  }

  if(args[type] < 1 && command == "head") {
    return "head: illegal " + countError[command][type] + " -- " + args[type];
  }
  return "";
};

exports.findOptionError = findOptionError;
