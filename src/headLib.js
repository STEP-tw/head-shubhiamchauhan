const applyHeader = function(header, stringList, file) {
  stringList.push(header(file, "utf8"));
  return stringList;
}

const getHead = function(header, InputData) {
  let type = InputData.type;
  let file = InputData.file;
  let head = applyHeader.bind(null, header);
  let result = file.reduce(head,[]);
  return result.join("");
}

exports.getHead = getHead;
