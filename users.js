const bcrypt = require("bcrypt");

let users = {
  userRandomID: {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  user2RandomID: {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
};

module.exports = {
  // return all users
  all: () => users,
  // add single user
  add: obj => (users = { ...users, ...obj }),
  // check if an email is existed in db
  existed: email => {
    for (let user in users) {
      if (users[user].email === email) {
        return true;
      }
    }
    return false;
  },
  // check if its a valid user credentials
  isValidUser: (email, password) => {
    for (let user in users) {
      console.log(users[user].password)
      if (
        users[user].email === email &&
        bcrypt.compareSync(password, users[user].password)
      ) {
        return true;
      }
    }
    return false;
  },
  // return a single user by email
  findUserByEmail: email => {
    for (let user in users) {
      if (users[user].email === email) {
        return users[user];
      }
    }
    return null;
  },
  // return a list of url for users by user_ID
  urlsForUser: id => {
    let urlList = [];
    for (let user in users) {
      if (user === id) {
        urlList.push(users[user].longURL);
      }
    }
    return urlList;
  },
  // return userID by an given url
  findUserByUrl: url => {
    let result = "";
    for (let item in urlDatabase) {
      if (url === item) {
        result = urlDatabase[item].userID;
      }
    }
    return result;
  }
};
