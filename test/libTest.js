const assert = require('assert');
const { applyFunc,
  extractHeadArgs,
  getHead,
  extractLines,
  extractContents,
  extractCharacters,
  findOptionError } = require('../src/headLib.js');

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

  it('should return the same array which is given as input', function() {
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
  beforeEach('', function(){
    fileName1 = ["file1","file2","file3"];
    fileName2 = ["file1","file2"];

    string1 = "The coins entered circulation\n"
    string1 += "After legal maneuvering\nthe government\nThe coins were\nCongress called in the coins";

    string2 = "The coins were\nCongress called in the coins";
    string3 = "The coins entered circulation";
  });

  it("should return 1 lines of files string1, string2 and string3 in an array for inputs numberOfLine = 1", function() {
    let result = [];
    result[0] = "The coins entered circulation";
    result[1] ="The coins were";
    result[2]= string3;
    assert.deepEqual(extractLines(fileName1, [string1, string2, string3], 1), result);
  });

  it("should return 2 lines of both files string1 and string2 in an array for inputs numberOfLine = 2", function() {
    let result = [];
    result[0] = "The coins entered circulation\nAfter legal maneuvering";
    result[1] = string2;
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

  it("should return 1 lines of both files string1 and string2 in an array for input.n = 1", function() {
    let result = [];
    result[0] = string1;
    result[1] = string2;
    let input = {files:[string1, string2], n:1};
    assert.deepEqual(getHead(getString, input), result);
  });

  it("should return 2 lines of both files string1 and string2 in an array for input.n = 2", function() {
    let result = [];
    result[0] = string1 + "\n" + string1;
    result[1] = string2 + "\n" + string2;
    let input = { files:[string1, string2], n:2};
    assert.deepEqual(getHead(doubleString, input), result);
  });

  it("should return 1 character of both files string1 and string2 in an array for input.c = 1", function() {
    let result = [];
    result [0]= "s";
    result [1]= "s";
    let input = {files:[string1, string2], c:1};
    assert.deepEqual(getHead(getString, input), result);
  });

  it("should return 8 characters of both files string1 and string2 in an array for input.c = 8", function() {
    let result = [];
    result[0] = string1 + "\n";
    result[1] = string2 + "\n";
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

  it("should return 1 character of files string1, string2 and string3 in an array for inputs numberOfBytes = 1", function() {
    let result = [];
    result[0] = "T";
    result[1] = "T";
    result[2] = "S";
    assert.deepEqual(extractCharacters(fileName1, [string1, string2, string3], 1), result);
  });

  it("should return 2 characters of both files string1 and string2 in an array for inputs numberOfBytes = 2", function() {
    let result = [];
    result[0] = "Th";
    result[1] = "Th";
    assert.deepEqual(extractCharacters(fileName2, [string1, string2], 2), result);
  });

  it("should return 10 characters of both files string1 and string2 with \\n in an array for inputs numberOfBytes = 10", function() {
    let result = [];
    result[0] = string1;
    result[1] = "The coins ";
    assert.deepEqual(extractCharacters(fileName2, [string1, string2], 10), result);
  });
});

describe("findOptionError", function() {
  it("should throw an error for invalid option", function() {
    let input = {files:["file1","file2"],v:10};
    let result = "head: illegal option -- v\nusage: head [-n lines | -c bytes] [file ...]";
    assert.deepEqual(findOptionError(input), result);
  });

  it("should throw an error for invalid option", function() {
    let input = {files:["file1","file2"],"-":10};
    let result = "head: illegal option -- -\nusage: head [-n lines | -c bytes] [file ...]";
    assert.deepEqual(findOptionError(input), result);
  });

  it("should throw a line count error for line count -n0", function() {
    let input = {files:["file1","file2"],"n":0};
    let result = "head: illegal line count -- 0";
    assert.deepEqual(findOptionError(input), result);
  });

  it("should throw a byte count error for byte count -c0", function() {
    let input = {files:["file1","file2"],"c":0};
    let result = "head: illegal byte count -- 0";
    assert.deepEqual(findOptionError(input), result);
  });

  it("should throw a line count error for count -0", function() {
    let input = {files:["file1","file2"],"n":0};
    let result = "head: illegal line count -- 0";
    assert.deepEqual(findOptionError(input), result);
  });

  it("should throw a line count error for option having -n and an alphanumeric count", function() {
    let input = {files:["file1","file2"],"n":"5r"};
    let result = "head: illegal line count -- 5r";
    assert.deepEqual(findOptionError(input), result);
  });

  it("should throw a byte count error for option having -c and an alphanumeric count", function() {
    let input = {files:["file1","file2"],"c":"6g"};
    let result = "head: illegal byte count -- 6g";
    assert.deepEqual(findOptionError(input), result);
  });

  it("should throw a line count error for option having - and an alphanumeric count", function() {
    let input = {files:["file1","file2"],"n":"7n"};
    let result = "head: illegal line count -- 7n";
    assert.deepEqual(findOptionError(input), result);
  });

  it("should throw a line count error for option having -n and undefined count", function() {
    let input = {files:["file1","file2"],"n":undefined};
    let result = "head: option requires an argument -- n\nusage: head [-n lines | -c bytes] [file ...]";
    assert.deepEqual(findOptionError(input), result);
  });

  it("should throw a byte count error for option having -c and undefined count", function() {
    let input = {files:["file1","file2"],"c":undefined};
    let result = "head: option requires an argument -- c\nusage: head [-n lines | -c bytes] [file ...]";
    assert.deepEqual(findOptionError(input), result);
  });
});
