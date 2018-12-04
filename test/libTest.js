const assert = require('assert');
const { getHead } = require('../src/headLib.js');

const getString = function(string){
  return string;
};

describe('', function() {
  let string;
  beforeEach('',function(){
    string = "The coins entered circulation\n";
    string += "After legal maneuvering";
    string += "the government";
    string += "The coins were";
    string += "Congress called in the coins";
    string += "After legal maneuvering";
    string += "the government";
    string += "The coins were";
    string += "Congress called in the coins";
    string += "The coins were";
    string += "Congress called in the coins";
    string += "replacing them with US currency";
  });

  it('should return the same string which is given as input', function() {
    assert.deepEqual(getHead(getString,{file:[string]}),string);
  });
});
