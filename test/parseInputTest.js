const assert = require('assert');
const { extractUserArgs } = require('../src/parseInput.js');

describe("extractUserArgs", function () {
  describe("for array holding only file's names", function () {
    it("should return an object with n as key holding 10 and files key holding a list of strings", function () {
      let userArgs = ["file1", "file2", "file3"];
      let expectedOutput = { files: ['file1', 'file2', 'file3'], n: '10' };
      assert.deepEqual(extractUserArgs(userArgs), expectedOutput);
    });
  });

  describe("for array holding only number with - as 0 index", function () {
    it("should return an object with n as key holding that number and files key holding a list of strings", function () {
      let userArgs = ["-10", "file1", "file2", "file3"];
      let expectedOutput = { files: ['file1', 'file2', 'file3'], n: '10' };
      assert.deepEqual(extractUserArgs(userArgs), expectedOutput);
    });
  });

  describe("for array holding -n[numberOfLines] as 0 index", function () {
    it("should return an object with n as key holding number of lines and files key holding a list of strings", function () {
      let userArgs = ["-n10", "file1", "file2"];
      let expectedOutput = { files: ['file1', 'file2'], n: '10' };
      assert.deepEqual(extractUserArgs(userArgs), expectedOutput);
    });
  });

  describe("for array holding -c[numberOfbytes] as 0 index", function () {
    it("should return an object with c as key holding number of bytes and files key holding a list of strings", function () {
      let userArgs = ["-c10", "file1", "file2"];
      let expectedOutput = { files: ['file1', 'file2'], c: '10' };
      assert.deepEqual(extractUserArgs(userArgs), expectedOutput);
    });
  });

  describe("for array holding only -- as 0 index", function () {
    it("should return an object with n as key holding 10 and files key holding a list of strings", function () {
      let userArgs = ["--", "file1", "file2", "file3"];
      let expectedOutput = { files: ['file1', 'file2', 'file3'], n: '10' };
      assert.deepEqual(extractUserArgs(userArgs), expectedOutput);
    });
  });

  describe("for array holding only -n as 0 index and a count as 1 index", function () {
    it("should return an object with n as key holding number of lines and files key holding a list of strings", function () {
      let userArgs = ["-n", "1", "file1", "file2"];
      let expectedOutput = { files: ['file1', 'file2'], n: '1' };
      assert.deepEqual(extractUserArgs(userArgs), expectedOutput);
    });
  });
});