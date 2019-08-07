// function which will generate a key with 6 characters & numbers
function generateRandomString() {
  let result = "";
  let alphabets =
    "123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < 6; i++) {
    result += alphabets.charAt(
      Math.floor(Math.random() * Math.floor(alphabets.length))
    );
  }
  return result;
}

module.exports = generateRandomString;