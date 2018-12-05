const assert = require('assert');
const { applyFunc,
  extractHeadArgs,
  getHead,
  extractLines,
  extractContents,
  extractCharacters } = require('../src/headLib.js');

const getString = function(string){
  return string;
};

const doubleString = function(string) {
  return string + "\n" + string;
}

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

  describe("for array holding none of above as 2 index", function() {
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
  let string3;
  let fileName1;
  let fileName2;
  beforeEach('',function(){
    fileName1 = ["file1","file2","file3"];
    fileName2 = ["file1","file2"];
    string1 = "The coins entered circulation\nAfter legal maneuvering\nthe government\nThe coins were\nCongress called in the coins";
    string2 = "The coins were\nCongress called in the coins";
    string3 = "The coins entered circulation";
  });

  it("should return 1 lines of files string1, string2 and string3 for inputs numberOfLine = 1", function() {
    let result = "==> " + "file1" + " <==" + "\n";
    result += "The coins entered circulation";
    result += "\n\n";
    result += "==> " + "file2" + " <==" + "\n";
    result += "The coins were" + "\n\n";
    result += "==> " + "file3" + " <==" + "\n";
    result += string3;
    assert.deepEqual(extractLines(fileName1, [string1, string2, string3], 1), result);
  });

  it("should return 2 lines of both files string1 and string2 for inputs numberOfLine = 2", function() {
    let result = "==> " + "file1" + " <==" + "\n";
    result += "The coins entered circulation\nAfter legal maneuvering";
    result += "\n\n";
    result += "==> " + "file2" + " <==" + "\n";
    result += string2;
    assert.deepEqual(extractLines(fileName2, [string1, string2], 2), result);
  });
});

describe("getHead", function() {
  let string1;
  let string2;
  let fileName;
  beforeEach('',function(){
    fileName = ["string1","string2"];
    string1 = "string1";
    string2 = "string2";
  });

  it("should return 1 lines of both files string1 and string2 for inputs n = 1", function() {
    let result = "==> " + "string1" + " <==" + "\n";
    result += string1;
    result += "\n\n";
    result += "==> " + "string2" + " <==" + "\n";
    result += string2;
    let input = {files:[string1, string2], n:1};
    assert.deepEqual(getHead(getString, input), result);
  });

  it("should return 2 lines of both files string1 and string2 for inputs n = 2", function() {
    let result = "==> " + "string1" + " <==" + "\n";
    result += string1 + "\n" + string1;
    result += "\n\n";
    result += "==> " + "string2" + " <==" + "\n";
    result += string2 + "\n" + string2;
    let input = { files:[string1, string2], n:2};
    assert.deepEqual(getHead(doubleString, input), result);
  });

  it("should return 1 character of both files string1 and string2 for inputs c = 1", function() {
    let result = "==> " + "string1" + " <==" + "\n";
    result += "s";
    result += "\n";
    result += "==> " + "string2" + " <==" + "\n";
    result += "s";
    let input = {files:[string1, string2], c:1};
    assert.deepEqual(getHead(getString, input), result);
  });

  it("should return 8 characters of both files string1 and string2 for inputs c = 8", function() {
    let result = "==> " + "string1" + " <==" + "\n";
    result += string1 + "\n";
    result += "\n";
    result += "==> " + "string2" + " <==" + "\n";
    result += string2 + "\n";
    let input = { files:[string1, string2], c:8};
    assert.deepEqual(getHead(doubleString, input), result);
  });
});

describe("extractCharacters", function() {
  let string1;
  let string2;
  let string3;
  let fileName1;
  let fileName2;
  beforeEach('',function(){
    fileName1 = ["file1","file2","file3"];
    fileName2 = ["file1","file2"];
    string1 = "The coins\n"
    string2 = "The coins were\n"
    string3 = "Something is something";
  });

  it("should return 1 character of files string1, string2 and string3 for inputs numberOfBytes = 1", function() {
    let result = "==> " + "file1" + " <==" + "\n";
    result += "T";
    result += "\n";
    result += "==> " + "file2" + " <==" + "\n";
    result += "T" + "\n";
    result += "==> " + "file3" + " <==" + "\n";
    result += "S";
    assert.deepEqual(extractCharacters(fileName1, [string1, string2, string3], 1), result);
  });

  it("should return 2 characters of both files string1 and string2 for inputs numberOfBytes = 2", function() {
    let result = "==> " + "file1" + " <==" + "\n";
    result += "Th";
    result += "\n";
    result += "==> " + "file2" + " <==" + "\n";
    result += "Th";
    assert.deepEqual(extractCharacters(fileName2, [string1, string2], 2), result);
  });

  it("should return 10 characters of both files string1 and string2 with also \\n for inputs numberOfBytes = 10", function() {
    let result = "==> " + "file1" + " <==" + "\n";
    result += string1;
    result += "\n";
    result += "==> " + "file2" + " <==" + "\n";
    result += "The coins ";
    assert.deepEqual(extractCharacters(fileName2, [string1, string2], 10), result);
  });
});
