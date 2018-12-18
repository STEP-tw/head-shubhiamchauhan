const assert = require('assert');
const { findOptionError } = require('../src/errorLib.js');

describe("findOptionError", function () {
  describe("for head command", function () {
    it("should throw an error for invalid option", function () {
      let input = { files: ["file1", "file2"], option: "v", count: 10 };
      let expectedOutput = "head: illegal option -- v\nusage: head [-n lines | -c bytes] [file ...]";
      assert.deepEqual(findOptionError(input, "head"), expectedOutput);
    });

    it("should throw an error for invalid option", function () {
      let input = { files: ["file1", "file2"], option: "-", count: 10 };
      let expectedOutput = "head: illegal option -- -\nusage: head [-n lines | -c bytes] [file ...]";
      assert.deepEqual(findOptionError(input, "head"), expectedOutput);
    });

    it("should throw a line count error for line count -n0", function () {
      let input = { files: ["file1", "file2"], option: "n", count: 0 };
      let expectedOutput = "head: illegal line count -- 0";
      assert.deepEqual(findOptionError(input, "head"), expectedOutput);
    });

    it("should throw a byte count error for byte count -c0", function () {
      let input = { files: ["file1", "file2"], option: "c", count: 0 };
      let expectedOutput = "head: illegal byte count -- 0";
      assert.deepEqual(findOptionError(input, "head"), expectedOutput);
    });

    it("should throw a line count error for count -0", function () {
      let input = { files: ["file1", "file2"], option: "n", count: 0 };
      let expectedOutput = "head: illegal line count -- 0";
      assert.deepEqual(findOptionError(input, "head"), expectedOutput);
    });

    it("should throw a line count error for option having -n and an alphanumeric count", function () {
      let input = { files: ["file1", "file2"], option: "n", count: "5r" };
      let expectedOutput = "head: illegal line count -- 5r";
      assert.deepEqual(findOptionError(input, "head"), expectedOutput);
    });

    it("should throw a byte count error for option having -c and an alphanumeric count", function () {
      let input = { files: ["file1", "file2"], option: "c", count: "6g" };
      let expectedOutput = "head: illegal byte count -- 6g";
      assert.deepEqual(findOptionError(input, "head"), expectedOutput);
    });

    it("should throw a line count error for option having - and an alphanumeric count", function () {
      let input = { files: ["file1", "file2"], option: "n", count: "7n" };
      let expectedOutput = "head: illegal line count -- 7n";
      assert.deepEqual(findOptionError(input, "head"), expectedOutput);
    });

    it("should throw a line count error for option having -n and undefined count", function () {
      let input = { files: ["file1", "file2"], option: "n", count: undefined };
      let expectedOutput = "head: option requires an argument -- n\nusage: head [-n lines | -c bytes] [file ...]";
      assert.deepEqual(findOptionError(input, "head"), expectedOutput);
    });

    it("should throw a byte count error for option having -c and undefined count", function () {
      let input = { files: ["file1", "file2"], option: "c", count: undefined };
      let expectedOutput = "head: option requires an argument -- c\nusage: head [-n lines | -c bytes] [file ...]";
      assert.deepEqual(findOptionError(input, "head"), expectedOutput);
    });

    it("should return an empty string for valid counts and option", function () {
      let input = { files: ["file1", "file2"], option: "c", count: 10 };
      let expectedOutput = "";
      assert.deepEqual(findOptionError(input, "head"), expectedOutput);
    });
  });

  describe("for tail command", function () {
    it("should throw an error for invalid option", function () {
      let input = { files: ["file1", "file2"], option: "v", count: 10 };
      let expectedOutput = "tail: illegal option -- v\n"
      expectedOutput += "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
      assert.deepEqual(findOptionError(input, "tail"), expectedOutput);
    });

    it("should throw an error for invalid option", function () {
      let input = { files: ["file1", "file2"], option: "-", count: 10 };
      let expectedOutput = "tail: illegal option -- -\n";
      expectedOutput += "usage: tail [-F | -f | -r] [-q] [-b # | -c # | -n #] [file ...]";
      assert.deepEqual(findOptionError(input, "tail"), expectedOutput);
    });

    it("should throw an offset error for option having -n and an alphanumeric count", function () {
      let input = { files: ["file1", "file2"], option: "n", count: "5r" };
      let expectedOutput = "tail: illegal offset -- 5r";
      assert.deepEqual(findOptionError(input, "tail"), expectedOutput);
    });

    it("should throw an offset error for option having -c and an alphanumeric count", function () {
      let input = { files: ["file1", "file2"], option: "c", count: "6g" };
      let expectedOutput = "tail: illegal offset -- 6g";
      assert.deepEqual(findOptionError(input, "tail"), expectedOutput);
    });
  });
});
