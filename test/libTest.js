let assert = require('assert');
let {
  applyCommand,
  extractHeadLines,
  extractContents,
  extractHeadCharacters,
  insertError,
  putHeader,
  validateFiles,
  organizeCommandResult,
  extractTailLines,
  extractTailCharacters } = require('../src/lib.js');

const mockReader = function(expectedFiles) {
  return function(actualPath) {
    return expectedFiles[actualPath];
  };
};

const mockValidator = function(expectedFiles) {
  return function(actualPath) {
    if (expectedFiles[actualPath]) {
      return true;
    }
    return false;
  };
};

describe("extractContents", function () {
  it("should return \'\' for inputs 0, \"\" and \"something\"", function () {
    assert.deepEqual(extractContents(0, "", "something"), "");
  });
  it("should return \'som\' for inputs 3, \"\" and \"something\"", function () {
    assert.deepEqual(extractContents(3, "", "something"), "som");
  });
});

describe("extractHeadLines", function () {
  let elevenAlphabets;
  let oneToFifteen;
  let vowels;
  beforeEach('', function () {
    elevenAlphabets = "A\nB\nC\nD\nE\nF\nG\nH\nI\nJ\nK";
    oneToFifteen = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
    vowels = "a\ne\ni\no\nu";
  });

  it("should return first lines of files elevenAlphabets, oneToFifteen and vowels in an array for inputs numberOfLine = 1", function () {
    let expectedOutput = [];
    expectedOutput[0] = "A";
    expectedOutput[1] = "1";
    expectedOutput[2] = "a";
    assert.deepEqual(extractHeadLines([elevenAlphabets, oneToFifteen, vowels], 1), expectedOutput);
  });

  it("should return first 2 lines of both files elevenAlphabets and oneToFifteen in an array for inputs numberOfLine = 2", function () {
    let expectedOutput = [];
    expectedOutput[0] = "A\nB";
    expectedOutput[1] = "1\n2";
    assert.deepEqual(extractHeadLines([elevenAlphabets, oneToFifteen], 2), expectedOutput);
  });

  it("should return first 10 lines of both files elevenAlphabets and oneToFifteen in an array for inputs numberOfLine = 10", function () {
    let expectedOutput = [];
    expectedOutput[0] = "A\nB\nC\nD\nE\nF\nG\nH\nI\nJ";
    expectedOutput[1] = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
    assert.deepEqual(extractHeadLines([elevenAlphabets, oneToFifteen], 10), expectedOutput);
  });
});

describe("applyCommand", function () {
  let files = {};
  let reader;
  beforeEach('', function () {
    files["elevenAlphabets"] = "A\nB\nC\nD\nE\nF\nG\nH\nI\nJ\nK";
    files["oneToFifteen"] = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
    reader = mockReader(files);
  });
  describe("for head command", function () {
    describe("for option n", function () {
      it("should return first line of both files elevenAlphabets and oneToFifteen in an array for input.n = 1", function () {
        let expectedOutput = [];
        expectedOutput[0] = "A";
        expectedOutput[1] = "1";
        let input = { files: ["elevenAlphabets", "oneToFifteen"], option:"n", count: 1 };
        assert.deepEqual(applyCommand(reader, input, "head"), expectedOutput);
      });

      it("should return first 2 lines of both files elevenAlphabets and oneToFifteen in an array for input.count = 2", function () {
        let expectedOutput = [];
        expectedOutput[0] = "A\nB";
        expectedOutput[1] = "1\n2";
        let input = { files: ["elevenAlphabets", "oneToFifteen"], option:"n", count: 2 };
        assert.deepEqual(applyCommand(reader, input, "head"), expectedOutput);
      });

      it("should return first 10 lines of both files elevenAlphabets and oneToFifteen in an array for input.count = 10", function () {
        let expectedOutput = [];
        expectedOutput[0] = "A\nB\nC\nD\nE\nF\nG\nH\nI\nJ";
        expectedOutput[1] = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10";
        let input = { files: ["elevenAlphabets", "oneToFifteen"], option:"n", count: 10 };
        assert.deepEqual(applyCommand(reader, input, "head"), expectedOutput);
      });
    });

    describe("for option c", function () {
      it("should return first character of both files elevenAlphabets and oneToFifteen in an array for input.c = 1", function () {
        let expectedOutput = [];
        expectedOutput[0] = "A";
        expectedOutput[1] = "1";
        let input = { files: ["elevenAlphabets", "oneToFifteen"], option:"c", count: 1 };
        assert.deepEqual(applyCommand(reader, input, "head"), expectedOutput);
      });

      it("should return first 8 characters of both files elevenAlphabets and oneToFifteen in an array for input.c = 8", function () {
        let expectedOutput = [];
        expectedOutput[0] = "A\nB\nC\nD\n";
        expectedOutput[1] = "1\n2\n3\n4\n";
        let input = { files: ["elevenAlphabets", "oneToFifteen"], option:"c", count: 8 };
        assert.deepEqual(applyCommand(reader, input, "head"), expectedOutput);
      });

      it("should return first 10 characters of both files elevenAlphabets and oneToFifteen in an array for input.c = 10", function () {
        let expectedOutput = [];
        expectedOutput[0] = "A\nB\nC\nD\nE\n";
        expectedOutput[1] = "1\n2\n3\n4\n5\n";
        let input = { files: ["elevenAlphabets", "oneToFifteen"], option:"c", count: 10 };
        assert.deepEqual(applyCommand(reader, input, "head"), expectedOutput);
      });
    });
  });

  describe("for tail command", function () {
    describe("for option n", function () {
      it("should return last line of both files elevenAlphabets and oneToFifteen in an array for input.count = 1", function () {
        let expectedOutput = [];
        expectedOutput[0] = "K";
        expectedOutput[1] = "15";
        let input = { files: ["elevenAlphabets", "oneToFifteen"], option:"n", count: 1 };
        assert.deepEqual(applyCommand(reader, input, "tail"), expectedOutput);
      });

      it("should return last 2 lines of both files elevenAlphabets and oneToFifteen in an array for input.count = 2", function () {
        let expectedOutput = [];
        expectedOutput[0] = "J\nK";
        expectedOutput[1] = "14\n15";
        let input = { files: ["elevenAlphabets", "oneToFifteen"], option:"n", count: 2 };
        assert.deepEqual(applyCommand(reader, input, "tail"), expectedOutput);
      });

      it("should return last 10 lines of both files elevenAlphabets and oneToFifteen in an array for input.count = 10", function () {
        let expectedOutput = [];
        expectedOutput[0] = "B\nC\nD\nE\nF\nG\nH\nI\nJ\nK";
        expectedOutput[1] = "6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
        let input = { files: ["elevenAlphabets", "oneToFifteen"], option:"n", count: 10 };
        assert.deepEqual(applyCommand(reader, input, "tail"), expectedOutput);
      });
    });

    describe("for option c", function () {
      it("should return last character of both files elevenAlphabets and oneToFifteen in an array for input.c = 1", function () {
        let expectedOutput = [];
        expectedOutput[0] = "K";
        expectedOutput[1] = "5";
        let input = { files: ["elevenAlphabets", "oneToFifteen"], option:"c", count: 1 };
        assert.deepEqual(applyCommand(reader, input, "tail"), expectedOutput);
      });

      it("should return last 8 characters of both files elevenAlphabets and oneToFifteen in an array for input.c = 8", function () {
        let expectedOutput = [];
        expectedOutput[0] = "\nH\nI\nJ\nK";
        expectedOutput[1] = "13\n14\n15";
        let input = { files: ["elevenAlphabets", "oneToFifteen"], option:"c", count: 8 };
        assert.deepEqual(applyCommand(reader, input, "tail"), expectedOutput);
      });

      it("should return last 10 characters of both files elevenAlphabets and oneToFifteen in an array for input.c = 10", function () {
        let expectedOutput = [];
        expectedOutput[0] = "\nG\nH\nI\nJ\nK";
        expectedOutput[1] = "2\n13\n14\n15";
        let input = { files: ["elevenAlphabets", "oneToFifteen"], option:"c", count: 10 };
        assert.deepEqual(applyCommand(reader, input, "tail"), expectedOutput);
      });
    });
  });
});

describe("extractHeadCharacters", function () {
  let file1;
  let file2;
  let file3;
  beforeEach('', function () {
    file1 = "The coins\n";
    file2 = "The coins were\n";
    file3 = "Something is something";
  });

  it("should return 1 character of files file1, file2 and file3 in an array for inputs numberOfBytes = 1", function () {
    let expectedOutput = [];
    expectedOutput[0] = "T";
    expectedOutput[1] = "T";
    expectedOutput[2] = "S";
    assert.deepEqual(extractHeadCharacters([file1, file2, file3], 1), expectedOutput);
  });

  it("should return 2 characters of both files file1 and file2 in an array for inputs numberOfBytes = 2", function () {
    let expectedOutput = [];
    expectedOutput[0] = "Th";
    expectedOutput[1] = "Th";
    assert.deepEqual(extractHeadCharacters([file1, file2], 2), expectedOutput);
  });

  it("should return 10 characters of both files file1 and file2 with \\n in an array for inputs numberOfBytes = 10", function () {
    let expectedOutput = [];
    expectedOutput[0] = "The coins\n";
    expectedOutput[1] = "The coins ";
    assert.deepEqual(extractHeadCharacters([file1, file2], 10), expectedOutput);
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
    let expectedOutput = ["==> file1 <==\nsomething"];
    expectedOutput[1] = "==> file2 <==\nanything";
    assert.deepEqual(putHeader(headers, contents, 2), expectedOutput);
  });

  it("should return the second array if last arg<2", function () {
    let headers = ["file1", "file2"];
    let contents = ["something"];
    assert.deepEqual(putHeader(headers, contents, 1), contents);
  });
});

describe("validateFiles", function () {
  let nameOfFiles;
  let existsSync;
  beforeEach('', function () {
    nameOfFiles = ["file1", "file2"];
    existsSync = mockValidator({ "file1": true, "file2": false});
  });
  it("should return an object with keys actualFile holding files and error holding an empty array", function () {
    let validatedFiles = { actualFile: [], error: [] };
    let expectedOutput = { actualFile: ["file1"], error: [] };
    assert.deepEqual(validateFiles("head", existsSync, nameOfFiles, validatedFiles, "file1"), expectedOutput);
  });

  it("should return an object with keys actualFile holding [] and error holding [error message, indexOfFile]", function () {
    let validatedFiles = { actualFile: [], error: [] };
    let message = "head: file2: No such file or directory";
    let expectedOutput = { actualFile: [], error: [[message, 1]] };
    assert.deepEqual(validateFiles("head", existsSync, nameOfFiles, validatedFiles, "file2"), expectedOutput);
  });
});

describe("organizeCommandResult", function () {
  let files = {};
  let reader;
  let existsSync;
  beforeEach('', function () {
    files["bigAlphabets"] = "A\nB\nC\nD\nE\nF\nG\nH\nI\nJ\nK";
    files["smallAlphabets"] = "a\nb\nc\nd\ne\nf\ng\nh\ni\nj\nk";
    reader = mockReader(files);
    existsSync = mockValidator(files);
  });
  describe("for head command", function () {
    it("should return the given file first 5 characters for input existsSync, reader and args.c=5", function () {
      let args = { files: ["bigAlphabets"], option:"c", count: 5 };
      assert.deepEqual(organizeCommandResult( args, "head", existsSync, reader), "A\nB\nC");
    });

    it("should return every file first line for input existsSync, reader and args.n = 1", function () {
      let args = { files: ["bigAlphabets", "smallAlphabets"], option:"n", count: 1 };
      let expectedOutput = "==> bigAlphabets <==\nA\n==> smallAlphabets <==\na"
      assert.deepEqual(organizeCommandResult( args, "head", existsSync, reader), expectedOutput);
    });

    it("should throw no arguments error for option having -n and undefined count", function () {
      let args = { files: ["bigAlphabets", "smallAlphabets"], option:"n", count: undefined };
      let expectedOutput = "head: option requires an argument -- n\nusage: head [-n lines | -c bytes] [file ...]";
      assert.deepEqual(organizeCommandResult( args, "head", existsSync, reader), expectedOutput);
    });

    it("should throw no arguments error for option having -c and undefined count", function () {
      let args = { files: ["bigAlphabets", "smallAlphabets"], option:"c", count: undefined };
      let expectedOutput = "head: option requires an argument -- c\nusage: head [-n lines | -c bytes] [file ...]";
      assert.deepEqual(organizeCommandResult( args, "head", existsSync, reader), expectedOutput);
    });

    it("should throw error for arg.files having missing file", function () {
      let args = { files: ["numbers"], option:"c", count: 5 };
      let expectedOutput = "head: numbers: No such file or directory";
      assert.deepEqual(organizeCommandResult(args, "head", existsSync, reader), expectedOutput);
    });
  });

  describe("for tail command", function () {
    it("should return the given file last 5 characters for input existsSync, reader and args.c=5", function () {
      let args = { files: ["bigAlphabets"], option:"c", count: 5 };
      assert.deepEqual(organizeCommandResult( args, "tail", existsSync, reader), "I\nJ\nK");
    });

    it("should return every file last line for input existsSync, reader and args.n = 1", function () {
      let args = { files: ["bigAlphabets", "smallAlphabets"], option:"n", count: 1 };
      let expectedOutput = "==> bigAlphabets <==\nK\n==> smallAlphabets <==\nk"
      assert.deepEqual(organizeCommandResult( args, "tail", existsSync, reader), expectedOutput);
    });

    it("should throw error for arg.files having missing file", function () {
      let args = { files: ["numbers"], option:"c", count: 5 };
      let expectedOutput = "tail: numbers: No such file or directory";
      assert.deepEqual(organizeCommandResult( args, "tail", existsSync, reader), expectedOutput);
    });

    it("should throw no arguments error for option having -n and undefined count", function () {
      let args = { files: ["bigAlphabets", "smallAlphabets"], option:"n", count: undefined };
      let expectedOutput = "tail: option requires an argument -- n\n";
      expectedOutput += "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
      assert.deepEqual(organizeCommandResult( args, "tail", existsSync, reader), expectedOutput);
    });

    it("should throw no arguments error for option having -c and undefined count", function () {
      let args = { files: ["bigAlphabets", "smallAlphabets"], option:"c", count: undefined };
      let expectedOutput = "tail: option requires an argument -- c\n";
      expectedOutput += "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
      assert.deepEqual(organizeCommandResult( args, "tail", existsSync, reader), expectedOutput);
    });
  });
});

describe("extractTailLines", function () {
  let elevenAlphabets;
  let oneToFifteen;
  let vowels;
  beforeEach('', function () {
    elevenAlphabets = "A\nB\nC\nD\nE\nF\nG\nH\nI\nJ\nK";
    oneToFifteen = "1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15";
    vowels = "a\ne\ni\no\nu";
  });

  it("should return last line of files elevenAlphabets, oneToFifteen and vowels in an array for inputs numberOfLine = 1", function () {
    let expectedOutput = [];
    expectedOutput[0] = "K";
    expectedOutput[1] = "15";
    expectedOutput[2] = "u";
    assert.deepEqual(extractTailLines([elevenAlphabets, oneToFifteen, vowels], 1), expectedOutput);
  });

  it("should return last 2 lines of both files elevenAlphabets and oneToFifteen in an array for inputs numberOfLine = 2", function () {
    let expectedOutput = [];
    expectedOutput[0] = "J\nK";
    expectedOutput[1] = "14\n15";
    assert.deepEqual(extractTailLines([elevenAlphabets, oneToFifteen], 2), expectedOutput);
  });
});

describe("extractTailCharacters", function () {
  let file1;
  let file2;
  let file3;
  beforeEach('', function () {
    file1 = "The coins\n"
    file2 = "The coins were\n"
    file3 = "Something is something";
  });

  it("should return last character of files file1, file2 and file3 in an array for inputs numberOfBytes = 1", function () {
    let expectedOutput = [];
    expectedOutput[0] = "\n";
    expectedOutput[1] = "\n";
    expectedOutput[2] = "g";
    assert.deepEqual(extractTailCharacters([file1, file2, file3], 1), expectedOutput);
  });

  it("should return last 2 characters of both files file1 and file2 in an array for inputs numberOfBytes = 2", function () {
    let expectedOutput = [];
    expectedOutput[0] = "s\n";
    expectedOutput[1] = "e\n";
    assert.deepEqual(extractTailCharacters([file1, file2], 2), expectedOutput);
  });

  it("should return last 10 characters of both files file1 and file2 with \\n in an array for inputs numberOfBytes = 10", function () {
    let expectedOutput = [];
    expectedOutput[0] = file1;
    expectedOutput[1] = "oins were\n";
    assert.deepEqual(extractTailCharacters([file1, file2], 10), expectedOutput);
  });
});