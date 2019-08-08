const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW" },
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW" }
};

const findUserByUrl = url => {
  let result = "";
  for (let item in urlDatabase) {
    if (url === item) {
      result = urlDatabase[item].userID;
    }
  }
  return result;
};

module.exports = {urlDatabase, findUserByUrl};
