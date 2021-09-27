// Assignment Code
var generateBtn = document.querySelector("#generate");

// special chars
var specialChars = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
var alpha = "abcdefghijklmnopqrstuvwxyz";
var numeric = "0123456789";

var password = {
  hasLowerCase : 'false',
  hasUpperCase : 'false',
  hasNumeric : 'false',
  hasSpecial : 'false',
  setOfChars : '',
  len : 8,
  genPass : function() {
    if (this.hasLowerCase) {
      this.setOfChars = this.setOfChars + alpha;
    }
    if (this.hasUpperCase) {
      this.setOfChars = this.setOfChars + alpha.toUpperCase();
    }
    if (this.hasNumeric) {
      this.setOfChars = this.setOfChars + numeric;
    }
    if (this.hasSpecial) {
      this.setOfChars = this.setOfChars + specialChars;
    }
    var pass = '';
    for (var i = 0, n = this.setOfChars.length; i < this.len; i++) {
      // generate a random char out to the requested length
      pass = pass + this.setOfChars.charAt(Math.floor(Math.random()*n));
      // how to make sure we took at least one of each?
    }
    return pass;
  }
}

function getRandomSpecialChar() {
  // length should be 32 - must check on last char if its possible or not
  var specialChar = specialChars.charAt(Math.floor(Math.random() * specialChars.length));
  return specialChar;
}

var getPassLenMessage = 'Please enter password length (8 - 128)';

function getPassLen(message) {
  var len = window.prompt(message);
  if (parseInt(len) == len) {
    if (parseInt(len) < 8 || parseInt(len) > 128) {
      getPassLen('Error: length must be between 8 and 128\n' + getPassLenMessage);
    } else {
      return parseInt(len);
    }
  } else {
    getPassLen('Error: not a number\n' + getPassLenMessage);
  }
}

// Generate password
function generatePassword() {
  // request password length
  // veify password length input
  password.len = getPassLen(getPassLenMessage);
  console.log(password.len);

  // ask whether to include lower case
  password.hasLowerCase = window.confirm("Include lower case letters?");
  // ask whether to include upper case
  password.hasUpperCase = window.confirm("Include upper case letters?");
  // ask whether to include numeric
  password.hasNumeric = window.confirm("Include numerics characters?");
  // ask whether to include special chars
  password.hasSpecial = window.confirm("Include special characters?");
  // generate the password
  var pass = password.genPass();
  console.log(password);
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
