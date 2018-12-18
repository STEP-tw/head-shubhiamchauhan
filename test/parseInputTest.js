const assert = require('assert');
const { extractUserArgs } = require('../src/parseInput.js');

describe("extractUserArgs", function () {
  describe("for array holding only file's names", function () {
    it("should return '{ files: ['file1', 'file2', 'file3'], option: n, count: '10' }'", function () {
      let userArgs = ["file1", "file2", "file3"];
      let expectedOutput = { files: ['file1', 'file2', 'file3'], option:"n", count: '10' };
      assert.deepEqual(extractUserArgs(userArgs), expectedOutput);
    });
  });

  describe("for array holding only number with - as 0 index", function () {
    it("should return { files: ['file1', 'file2', 'file3'], option:n, count: '10' }", function () {
      let userArgs = ["-10", "file1", "file2", "file3"];
      let expectedOutput = { files: ['file1', 'file2', 'file3'], option:"n", count: '10' };
      assert.deepEqual(extractUserArgs(userArgs), expectedOutput);
    });
  });

  describe("for array holding -n[numberOfLines] as 0 index", function () {
    it("should return '{ files: ['file1', 'file2'], option:n, count: '10' }'", function () {
      let userArgs = ["-n10", "file1", "file2"];
      let expectedOutput = { files: ['file1', 'file2'], option:"n", count: '10' };
      assert.deepEqual(extractUserArgs(userArgs), expectedOutput);
    });
  });

  describe("for array holding -c[numberOfbytes] as 0 index", function () {
    it("should return '{ files: ['file1', 'file2'], option:c, count: '10' }'", function () {
      let userArgs = ["-c10", "file1", "file2"];
      let expectedOutput = { files: ['file1', 'file2'], option:"c", count: '10' };
      assert.deepEqual(extractUserArgs(userArgs), expectedOutput);
    });
  });

  describe("for array holding only -- as 0 index", function () {
    it("should return { files: ['file1', 'file2', 'file3'], option:n, count: '10' }", function () {
      let userArgs = ["--", "file1", "file2", "file3"];
      let expectedOutput = { files: ['file1', 'file2', 'file3'], option:"n", count: '10' };
      assert.deepEqual(extractUserArgs(userArgs), expectedOutput);
    });
  });

  describe("for array holding only -n as 0 index and a count as 1 index", function () {
    it("should return { files: ['file1', 'file2'], option:n, count: '1' }", function () {
      let userArgs = ["-n", "1", "file1", "file2"];
      let expectedOutput = { files: ['file1', 'file2'], option:"n", count: '1' };
      assert.deepEqual(extractUserArgs(userArgs), expectedOutput);
    });
  });
});