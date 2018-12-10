const assert = require('assert');
const { extractUsrArgs } = require('../src/parseInput.js');

describe("extractUsrArgs", function() {
  describe("for array holding -n[numberOfLines] as 0 index", function() {
    it("should return an object with n as key holding number of lines and files key holding a list of strings", function() {
      let array = ["-n10","file1","file2"];
      let result = { files: [ 'file1', 'file2' ], n: '10' }; 
      assert.deepEqual(extractUsrArgs(array), result);
    });
  });

  describe("for array holding -c[numberOfbytes] as 0 index", function() {
    it("should return an object with c as key holding number of bytes and files key holding a list of strings", function() {
      let array = ["-c10","file1","file2"];
      let result = { files: [ 'file1', 'file2' ], c: '10' }; 
      assert.deepEqual(extractUsrArgs(array), result);
    });
  });

  describe("for array holding only number as 0 index", function() {
    it("should return an object with n as key holding that number and files key holding a list of strings", function() {
      let array = ["-10","file1","file2","file3"];
      let result = { files: [ 'file1', 'file2', 'file3' ], n: '10' }; 
      assert.deepEqual(extractUsrArgs(array), result);
    });
  });

  describe("for array holding only -- as 0 index", function() {
    it("should return an object with n as key holding 10 and files key holding a list of strings", function() {
      let array = ["--","file1","file2","file3"];
      let result = { files: [ 'file1', 'file2', 'file3' ], n: '10' }; 
      assert.deepEqual(extractUsrArgs(array), result);
    });
  });

  describe("for array holding none of above as 0 index", function() {
    it("should return an object with n as key holding 10 and files key holding a list of strings", function() {
      let array = ["file1","file2","file3"];
      let result = { files: [ 'file1', 'file2', 'file3' ], n: '10' }; 
      assert.deepEqual(extractUsrArgs(array), result);
    });
  });

  describe("for array holding only -n as 0 index and a count as 1 index", function() {
    it("should return an object with n as key holding number of lines and files key holding a list of strings", function() {
      let array = ["-n","1","file1","file2"];
      let result = { files: [ 'file1', 'file2' ], n: '1' }; 
      assert.deepEqual(extractUsrArgs(array), result);
    });
  });
});
