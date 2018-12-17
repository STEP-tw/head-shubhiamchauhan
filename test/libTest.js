const assert = require('assert');
const { applyFunc,
  applyCommand,
  extractHeadLines,
  extractContents,
  extractHeadCharacters,
  insertError,
  putHeader,
  validateFiles,
  organizeCommandResult,
  extractTailLines,
  extractTailCharacters,
  findOptionError } = require('../src/lib.js');

const getString = function (string) {
  return string;
};

const getTrue = (x) => true;
const getFalse = (x) => false;
const doubleString = function (string) {
  return string + "\n" + string;
}

describe('applyFunc', function () {
  let string;
  beforeEach('', function () {
    string = "The coins entered circulation\n"
    string += "After legal maneuvering\nthe government\n"
    string += "The coins were\nCongress called in the coins";
  });

  it('should return the same array which is given as input', function () {
    assert.deepEqual(applyFunc(getString, [string]), [string]);
  });
});

describe("extractContents", function () {
  it("should return \'\' for inputs 0, \"\" and \"shubham\"", function () {
    assert.deepEqual(extractContents(0, "", "shubham"), "");
  });
  it("should return \'shu\' for inputs 3, \"\" and \"shubham\"", function () {
    assert.deepEqual(extractContents(3, "", "shubham"), "shu");
  });
});

describe("extractHeadLines", function () {
  let string1;
  let string2;
  let string3;
  beforeEach('', function () {
    string1 = "The coins entered circulation\n"
    string1 += "After legal maneuvering\nthe government\nThe coins were\nCongress called in the coins";

    string2 = "The coins were\nCongress called in the coins";
    string3 = "The coins entered circulation";
  });

  it("should return first lines of files string1, string2 and string3 in an array for inputs numberOfLine = 1", function () {
    let result = [];
    result[0] = "The coins entered circulation";
    result[1] = "The coins were";
    result[2] = string3;
    assert.deepEqual(extractHeadLines([string1, string2, string3], 1), result);
  });

  it("should return first 2 lines of both files string1 and string2 in an array for inputs numberOfLine = 2", function () {
    let result = [];
    result[0] = "The coins entered circulation\nAfter legal maneuvering";
    result[1] = "The coins were\nCongress called in the coins";
    assert.deepEqual(extractHeadLines([string1, string2], 2), result);
  });
});

describe("applyCommand", function () {
  let string1;
  let string2;
  beforeEach('', function () {
    string1 = "string1";
    string2 = "string2";
  });
  describe("for head command", function () {
    it("should return first line of both files string1 and string2 in an array for input.n = 1", function () {
      let result = [];
      result[0] = "string1";
      result[1] = "string2";
      let input = { files: [string1, string2], n: 1 };
      assert.deepEqual(applyCommand(getString, input, "head"), result);
    });

    it("should return first 2 lines of both files string1 and string2 in an array for input.n = 2", function () {
      let result = [];
      result[0] = string1 + "\n" + string1;
      result[1] = string2 + "\n" + string2;
      let input = { files: [string1, string2], n: 2 };
      assert.deepEqual(applyCommand(doubleString, input, "head"), result);
    });

    it("should return first character of both files string1 and string2 in an array for input.c = 1", function () {
      let result = [];
      result[0] = "s";
      result[1] = "s";
      let input = { files: [string1, string2], c: 1 };
      assert.deepEqual(applyCommand(getString, input, "head"), result);
    });

    it("should return first 8 characters of both files string1 and string2 in an array for input.c = 8", function () {
      let result = [];
      result[0] = "string1" + "\n";
      result[1] = "string2" + "\n";
      let input = { files: [string1, string2], c: 8 };
      assert.deepEqual(applyCommand(doubleString, input, "head"), result);
    });
  });

  describe("for tail command", function () {
    it("should return last line of both files string1 and string2 in an array for input.n = 1", function () {
      let result = [];
      result[0] = "string1";
      result[1] = "string2";
      let input = { files: [string1, string2], n: 1 };
      assert.deepEqual(applyCommand(getString, input, "tail"), result);
    });

    it("should return last 2 lines of both files string1 and string2 in an array for input.n = 2", function () {
      let result = [];
      result[0] = "string1" + "\n" + "string1";
      result[1] = "string2" + "\n" + "string2";
      let input = { files: [string1, string2], n: 2 };
      assert.deepEqual(applyCommand(doubleString, input, "tail"), result);
    });

    it("should return last character of both files string1 and string2 in an array for input.c = 1", function () {
      let result = [];
      result[0] = "1";
      result[1] = "2";
      let input = { files: [string1, string2], c: 1 };
      assert.deepEqual(applyCommand(getString, input, "tail"), result);
    });

    it("should return last 8 characters of both files string1 and string2 in an array for input.c = 8", function () {
      let result = [];
      result[0] = "\n" + "string1" ;
      result[1] = "\n" + "string2" ;
      let input = { files: [string1, string2], c: 8 };
      assert.deepEqual(applyCommand(doubleString, input, "tail"), result);
    });
  });
});

describe("extractHeadCharacters", function () {
  let string1;
  let string2;
  let string3;
  beforeEach('', function () {
    string1 = "The coins\n";
    string2 = "The coins were\n";
    string3 = "Something is something";
  });

  it("should return 1 character of files string1, string2 and string3 in an array for inputs numberOfBytes = 1", function () {
    let result = [];
    result[0] = "T";
    result[1] = "T";
    result[2] = "S";
    assert.deepEqual(extractHeadCharacters([string1, string2, string3], 1), result);
  });

  it("should return 2 characters of both files string1 and string2 in an array for inputs numberOfBytes = 2", function () {
    let result = [];
    result[0] = "Th";
    result[1] = "Th";
    assert.deepEqual(extractHeadCharacters([string1, string2], 2), result);
  });

  it("should return 10 characters of both files string1 and string2 with \\n in an array for inputs numberOfBytes = 10", function () {
    let result = [];
    result[0] = "The coins\n";
    result[1] = "The coins ";
    assert.deepEqual(extractHeadCharacters([string1, string2], 10), result);
  });
});

describe("findOptionError", function () {
  describe("for head command", function () {
    it("should throw an error for invalid option", function () {
      let input = { files: ["file1", "file2"], v: 10 };
      let result = "head: illegal option -- v\nusage: head [-n lines | -c bytes] [file ...]";
      assert.deepEqual(findOptionError(input, "head"), result);
    });

    it("should throw an error for invalid option", function () {
      let input = { files: ["file1", "file2"], "-": 10 };
      let result = "head: illegal option -- -\nusage: head [-n lines | -c bytes] [file ...]";
      assert.deepEqual(findOptionError(input, "head"), result);
    });

    it("should throw a line count error for line count -n0", function () {
      let input = { files: ["file1", "file2"], "n": 0 };
      let result = "head: illegal line count -- 0";
      assert.deepEqual(findOptionError(input, "head"), result);
    });

    it("should throw a byte count error for byte count -c0", function () {
      let input = { files: ["file1", "file2"], "c": 0 };
      let result = "head: illegal byte count -- 0";
      assert.deepEqual(findOptionError(input, "head"), result);
    });

    it("should throw a line count error for count -0", function () {
      let input = { files: ["file1", "file2"], "n": 0 };
      let result = "head: illegal line count -- 0";
      assert.deepEqual(findOptionError(input, "head"), result);
    });

    it("should throw a line count error for option having -n and an alphanumeric count", function () {
      let input = { files: ["file1", "file2"], "n": "5r" };
      let result = "head: illegal line count -- 5r";
      assert.deepEqual(findOptionError(input, "head"), result);
    });

    it("should throw a byte count error for option having -c and an alphanumeric count", function () {
      let input = { files: ["file1", "file2"], "c": "6g" };
      let result = "head: illegal byte count -- 6g";
      assert.deepEqual(findOptionError(input, "head"), result);
    });

    it("should throw a line count error for option having - and an alphanumeric count", function () {
      let input = { files: ["file1", "file2"], "n": "7n" };
      let result = "head: illegal line count -- 7n";
      assert.deepEqual(findOptionError(input, "head"), result);
    });

    it("should throw a line count error for option having -n and undefined count", function () {
      let input = { files: ["file1", "file2"], "n": undefined };
      let result = "head: option requires an argument -- n\nusage: head [-n lines | -c bytes] [file ...]";
      assert.deepEqual(findOptionError(input, "head"), result);
    });

    it("should throw a byte count error for option having -c and undefined count", function () {
      let input = { files: ["file1", "file2"], "c": undefined };
      let result = "head: option requires an argument -- c\nusage: head [-n lines | -c bytes] [file ...]";
      assert.deepEqual(findOptionError(input, "head"), result);
    });

    it("should return an empty string for valid counts and option", function () {
      let input = { files: ["file1", "file2"], "c": 10 };
      let result = "";
      assert.deepEqual(findOptionError(input, "head"), result);
    });
  });

  describe("for tail command", function () {
    it("should throw an error for invalid option", function () {
      let input = { files: ["file1", "file2"], v: 10 };
      let result = "tail: illegal option -- v\n"
      result += "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
      assert.deepEqual(findOptionError(input, "tail"), result);
    });

    it("should throw an error for invalid option", function () {
      let input = { files: ["file1", "file2"], "-": 10 };
      let result = "tail: illegal option -- -\n";
      result += "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
      assert.deepEqual(findOptionError(input, "tail"), result);
    });

    it("should throw an offset error for option having -n and an alphanumeric count", function () {
      let input = { files: ["file1", "file2"], "n": "5r" };
      let result = "tail: illegal offset -- 5r";
      assert.deepEqual(findOptionError(input, "tail"), result);
    });

    it("should throw an offset error for option having -c and an alphanumeric count", function () {
      let input = { files: ["file1", "file2"], "c": "6g" };
      let result = "tail: illegal offset -- 6g";
      assert.deepEqual(findOptionError(input, "tail"), result);
    });
  });
});

describe("insertError", function () {
  it("should insert the elements of given entries in an given array", function () {
    assert.deepEqual(insertError([1, 2], ["error", 1]), [1, "error", 2]);
  });

  it("should insert error message to given index in an given array", function () {
    let message = "Error has been found";
    assert.deepEqual(insertError([1, 2], [message, 1]), [1, "Error has been found", 2]);
  });
});

describe("putHeader", function () {
  it("should make the first array element header of the second array corresponding element for last arg>1", function () {
    let headers = ["file1", "file2"];
    let contents = ["something", "anything"];
    let result = ["==> file1 <==\nsomething"];
    result[1] = "==> file2 <==\nanything";
    assert.deepEqual(putHeader(headers, contents, 2), result);
  });

  it("should return thw second array if last arg<2", function () {
    let headers = ["file1", "file2"];
    let contents = ["something"];
    assert.deepEqual(putHeader(headers, contents, 1), contents);
  });
});

describe("validateFiles", function () {
  it("should return an object with keys actualFile holding files and error holding an empty array", function () {
    let list = { actualFile: [], error: [] };
    let fileList = ["file1", "file2"];
    let result = { actualFile: ["file1"], error: [] };
    assert.deepEqual(validateFiles("head", getTrue, fileList, list, "file1"), result);
  });

  it("should return an object with keys actualFile holding [] and error holding [error message, indexOfFile]", function () {
    let list = { actualFile: [], error: [] };
    let fileList = ["file1", "file2"];
    let message = "head: file2: No such file or directory";
    let result = { actualFile: [], error: [[message, 1]] };
    assert.deepEqual(validateFiles("head", getFalse, fileList, list, "file2"), result);
  });
});

describe("organizeCommandResult", function () {
  describe("for head command", function () {
    it("should return the given file first 5 characters for input getTrue, getString and args.c=5", function () {
      let args = { files: ["prefix"], c: 5 };
      assert.deepEqual(organizeCommandResult(getTrue, getString, args, "head"), "prefi");
    });

    it("should return every file first line for input getTrue, getString and args.n = 1", function () {
      let args = { files: ["prefix", "suffix"], n: 1 };
      let result = "==> prefix <==\nprefix\n==> suffix <==\nsuffix"
      assert.deepEqual(organizeCommandResult(getTrue, getString, args, "head"), result);
    });

    it("should throw no arguments error for option having -n and undefined count", function () {
      let args = { files: ["file1", "file2"], "n": undefined };
      let result = "head: option requires an argument -- n\nusage: head [-n lines | -c bytes] [file ...]";
      assert.deepEqual(organizeCommandResult(getTrue, getString, args, "head"), result);
    });

    it("should throw no arguments error for option having -c and undefined count", function () {
      let args = { files: ["file1", "file2"], "c": undefined };
      let result = "head: option requires an argument -- c\nusage: head [-n lines | -c bytes] [file ...]";
      assert.deepEqual(organizeCommandResult(getTrue, getString, args, "head"), result);
    });

    it("should throw error for arg.files having missing file", function () {
      let args = { files: ["prefix"], c: 5 };
      let result = "head: prefix: No such file or directory";
      assert.deepEqual(organizeCommandResult(getFalse, getString, args, "head"), result);
    });
  });

  describe("for tail command", function () {
    it("should return the given file last 5 characters for input getTrue, getString and args.c=5", function () {
      let args = { files: ["prefix"], c: 5 };
      assert.deepEqual(organizeCommandResult(getTrue, getString, args, "tail"), "refix");
    });

    it("should return every file last line for input getTrue, getString and args.n = 1", function () {
      let args = { files: ["prefix", "suffix"], n: 1 };
      let result = "==> prefix <==\nprefix\n==> suffix <==\nsuffix"
      assert.deepEqual(organizeCommandResult(getTrue, getString, args, "tail"), result);
    });

    it("should throw error for arg.files having missing file", function () {
      let args = { files: ["prefix"], c: 5 };
      let result = "tail: prefix: No such file or directory";
      assert.deepEqual(organizeCommandResult(getFalse, getString, args, "tail"), result);
    });

    it("should throw no arguments error for option having -n and undefined count", function () {
      let args = { files: ["file1", "file2"], "n": undefined };
      let result = "tail: option requires an argument -- n\n";
      result += "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
      assert.deepEqual(organizeCommandResult(getTrue, getString, args, "tail"), result);
    });

    it("should throw no arguments error for option having -c and undefined count", function () {
      let args = { files: ["file1", "file2"], "c": undefined };
      let result = "tail: option requires an argument -- c\n";
      result += "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
      assert.deepEqual(organizeCommandResult(getTrue, getString, args, "tail"), result);
    });
  });
});

describe("extractTailLines", function () {
  let string1;
  let string2;
  let string3;
  beforeEach('', function () {
    string1 = "The coins entered circulation\n"
    string1 += "After legal maneuvering\nthe government\nThe coins were\nCongress called in the coins";

    string2 = "The coins were\nCongress called in the coins";
    string3 = "The coins entered circulation";
  });

  it("should return last line of files string1, string2 and string3 in an array for inputs numberOfLine = 1", function () {
    let result = [];
    result[0] = "Congress called in the coins";
    result[1] = "Congress called in the coins";
    result[2] = string3;
    assert.deepEqual(extractTailLines([string1, string2, string3], 1), result);
  });

  it("should return last 2 lines of both files string1 and string2 in an array for inputs numberOfLine = 2", function () {
    let result = [];
    result[0] = "The coins were\nCongress called in the coins";
    result[1] = string2;
    assert.deepEqual(extractTailLines([string1, string2], 2), result);
  });
});

describe("extractTailCharacters", function () {
  let string1;
  let string2;
  let string3;
  beforeEach('', function () {
    string1 = "The coins\n"
    string2 = "The coins were\n"
    string3 = "Something is something";
  });

  it("should return last character of files string1, string2 and string3 in an array for inputs numberOfBytes = 1", function () {
    let result = [];
    result[0] = "\n";
    result[1] = "\n";
    result[2] = "g";
    assert.deepEqual(extractTailCharacters([string1, string2, string3], 1), result);
  });

  it("should return last 2 characters of both files string1 and string2 in an array for inputs numberOfBytes = 2", function () {
    let result = [];
    result[0] = "s\n";
    result[1] = "e\n";
    assert.deepEqual(extractTailCharacters([string1, string2], 2), result);
  });

  it("should return last 10 characters of both files string1 and string2 with \\n in an array for inputs numberOfBytes = 10", function () {
    let result = [];
    result[0] = string1;
    result[1] = "oins were\n";
    assert.deepEqual(extractTailCharacters([string1, string2], 10), result);
  });
});
