const assert = require('assert');
const { applyFunc,
  extractHeadArgs,
  extractLines,
  extractContents} = require('../src/headLib.js');

const getString = function(string){
  return string;
};

describe('applyFunc', function() {
  let string;
  beforeEach('',function(){
    string = "The coins entered circulation\nAfter legal maneuvering\nthe government\nThe coins were\nCongress called in the coins";
  });

  it('should return the same string which is given as input', function() {
    assert.deepEqual(applyFunc(getString,[string]),[string]);
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

describe("extractContents", function() {
  it("should return \'\' for inputs 0, \"\" and \"shubham\"", function() {
    assert.deepEqual(extractContents(0, "", "shubham"), "");
  });
  it("should return \'shu\' for inputs 3, \"\" and \"shubham\"", function() {
    assert.deepEqual(extractContents(3, "", "shubham"), "shu");
  });
});

describe("extractLines", function() {
  let string1;
  let string2;
  let fileName;
  beforeEach('',function(){
    fileName = ["file1","file2"];
    string1 = "The coins entered circulation\nAfter legal maneuvering\nthe government\nThe coins were\nCongress called in the coins";
    string2 = "The coins were\nCongress called in the coins";
  });

  it("should return \'\' for inputs numberOfLine = 0", function() {
    assert.deepEqual(extractLines(fileName, [string1], 0), "");
  });

  it("should return 2 lines of both files string1 and string2 for inputs numberOfLine = 2", function() {
    let result = "==> " + "file1" + " <==" + "\n";
    result += "The coins entered circulation\nAfter legal maneuvering";
    result += "\n\n";
    result += "==> " + "file2" + " <==" + "\n";
    result += string2;
    assert.deepEqual(extractLines(fileName, [string1, string2], 2), result);
  });
});

