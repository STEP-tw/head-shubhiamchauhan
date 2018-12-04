const assert = require('assert');
const { getHead, extractHeadArgs } = require('../src/headLib.js');

const getString = function(string){
  return string;
};

describe('getHead', function() {
  let string;
  beforeEach('',function(){
    string = "The coins entered circulation\nAfter legal maneuvering\nthe government\nThe coins were\nCongress called in the coins\nAfter legal maneuvering\nthe government\nThe coins were\nCongress called in the coins\nThe coins were\nCongress called in the coins\nreplacing them with US currency";
  });

  it('should return the same string which is given as input', function() {
    assert.deepEqual(getHead(getString,{file:[string]}),string);
  });
});


describe("extractHeadArgs", function() {
  describe("for array holding -n[numberOfLines] as 2 index", function() {
    it("should return an object with n as key holding number of lines and files key holding a list of strings", function() {
      let array = [,,"-n10","file1","file2"];
      let result = { files: [ 'file1', 'file2' ], n: '10' }; 
      assert.deepEqual(extractHeadArgs(array), result);
    });
  });

  describe("for array holding -c[numberOfbytes] as 2 index", function() {
    it("should return an object with c as key holding number of bytes and files key holding a list of strings", function() {
      let array = [,,"-c10","file1","file2"];
      let result = { files: [ 'file1', 'file2' ], c: '10' }; 
      assert.deepEqual(extractHeadArgs(array), result);
    });
  });

  describe("for array holding only number as 2 index", function() {
    it("should return an object with n as key holding that number and files key holding a list of strings", function() {
      let array = [,,"-10","file1","file2","file3"];
      let result = { files: [ 'file1', 'file2', 'file3' ], n: '10' }; 
      assert.deepEqual(extractHeadArgs(array), result);
    });
  });

  describe("for array holding non of above as 2 index", function() {
    it("should return an object with n as key holding 10 and files key holding a list of strings", function() {
      let array = [,,"file1","file2","file3"];
      let result = { files: [ 'file1', 'file2', 'file3' ], n: '10' }; 
      assert.deepEqual(extractHeadArgs(array), result);
    });
  });
});
