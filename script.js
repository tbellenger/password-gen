// Assignment Code
var generateBtn = document.querySelector("#generate");

// char sets as options
var specialChars = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var alpha = "abcdefghijklmnopqrstuvwxyz";
var numeric = "0123456789";

// password object with req. chars and functions to generate password
var password = {
  hasLowerCase : 'false',
  hasUpperCase : 'false',
  hasNumeric : 'false',
  hasSpecial : 'false',
  regexSearch: '',
  setOfChars : '',
  len : 8,
  genPass : function() {
    // reset set of chars and regex to nothing
    this.setOfChars = '';
    this.regexSearch = '';
    // add the set of chars we should pick random chars from 
    // and add regex to verify if at least one of those chars is present
    if (this.hasLowerCase) {
      this.setOfChars = this.setOfChars + alpha;
      this.regexSearch = this.regexSearch + '(?=.*[a-z])';
    }
    if (this.hasUpperCase) {
      this.setOfChars = this.setOfChars + alpha.toUpperCase();
      this.regexSearch = this.regexSearch + '(?=.*[A-Z])';
    }
    if (this.hasNumeric) {
      this.setOfChars = this.setOfChars + numeric;
      this.regexSearch = this.regexSearch + '(?=.*[0-9])';
    }
    if (this.hasSpecial) {
      this.setOfChars = this.setOfChars + specialChars;
      this.regexSearch = this.regexSearch + '(?=.*[' + specialChars + '])';
    }

    var pass = '';
    for (var i = 0, n = this.setOfChars.length; i < this.len; i++) {
      // generate a random char out to the requested length
      pass = pass + this.setOfChars.charAt(Math.floor(Math.random()*n));
    }
    
    return pass;
  }, 
  // remove all the config of requested chars
  reset : function() {
    this.hasLowerCase = false;
    this.hasUpperCase = false;
    this.hasNumeric = false;
    this.hasSpecial = false;
    this.len = 8;
  }
}

var getPassLenMessage = 'Please enter password length (8 - 128)';

// recursive function to prompt until valid input data is entered
function getPassLen(message) {
  var len = window.prompt(message);
  if (parseInt(len) == len) {
    if (parseInt(len) < 8 || parseInt(len) > 128) {
      // recursive call
      return getPassLen('Error: length must be between 8 and 128\n' + getPassLenMessage);
    } else {
      return parseInt(len);
    }
  } else {
    // recursive call
    return getPassLen('Error: not a number\n' + getPassLenMessage);
  }
}

// Generate password
function generatePassword() {
  password.reset();
  // request password length
  // veify password length input
  password.len = getPassLen(getPassLenMessage);

  // force at least one char type to be selected
  while (!password.hasLowerCase && 
    !password.hasUpperCase &&
    !password.hasSpecial &&
    !password.hasNumeric) {
    // ask whether to include lower case
    password.hasLowerCase = window.confirm("Click OK to include lower case letters?");
    // ask whether to include upper case
    password.hasUpperCase = window.confirm("Click OK to include upper case letters?");
    // ask whether to include numeric
    password.hasNumeric = window.confirm("Click OK to include numbers?");
    // ask whether to include special chars
    password.hasSpecial = window.confirm("Click OK to include special characters?");
    if (!password.hasLowerCase &&
      !password.hasUpperCase &&
      !password.hasNumeric &&
      !password.hasSpecial) {
        window.alert("At least one character type must be selected");
      }
  }
  // generate the password
  // make sure that all requested char are present
  // by checking if the regex text passes
  var pass = '';
  var regexGood = false;
  console.log('generating password');
  while (!regexGood) {
    pass = password.genPass();
    var regex = new RegExp('^' + password.regexSearch + '.*$');
    console.log(pass);
    console.log('^' + password.regexSearch + '.*$');
    regexGood = regex.test(pass);
    console.log('passes regex ' + regexGood);
  }
  
  return pass;
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
