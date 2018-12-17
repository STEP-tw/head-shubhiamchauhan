# parseInputTest.js

- [x] 1. Unnecessary abbreviation
       line : 2
- [x] 2. Poor variable name
    line : 7,15,23,...
    * Instead of 'array' you can use a name which will tell us what it is, i.e. input
    * Instead of 'result' --> expectedOutput
- [x] 3. Write tests in the order of increasing complexity

# libTest.js

- [x] 1. You can pull out some util functions like 
    * applyFunc
- [x] 2. Poor variable name everywhere like
    *string,list,fileList
- [x] 3. You can use small strings for testing
- [x] 4. Poor file names for testing , like
    * string1,string2,...
- [x] 5. Poor testing files for applyCommand
- [x] 6. You can add more test cases for findOptionError()
    * options like --
- [x] 7. You can group your tests

# parseInput.js

1. Poor variable names
    * argsList
2. You can pull out if conditions to util functions.

# lib.js

1. Tricky function name
    * organizeCommandResult()
2. Order of arguments in organizeCommandResult()
3. Poor variable names like 
    * commandCall (line :35)
    * files (lines : 39)
4. You can simply get rid of the for loop
    line :16-19