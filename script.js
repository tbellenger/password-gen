// Assignment Code
var generateBtn = document.querySelector("#generate");

// special chars
var specialChars = " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

function getRandomSpecialChar() {
  // length should be 32 - must check on last char if its possible or not
  var specialChar = specialChars.charAt(Math.floor(Math.random() * specialChars.length));
  return specialChar;
}

var getPassLenMessage = 'Please enter password length (1 - 128)';

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
  var len = getPassLen(getPassLenMessage);
  console.log(len);
  // veify password length input

  // ask whether to include lower case

  // ask whether to include upper case

  // ask whether to include numeric

  // ask whether to include special chars

  // generate the password
  return data + getRandomSpecialChar();
}

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");

  passwordText.value = password;

}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
