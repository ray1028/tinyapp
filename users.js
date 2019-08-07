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
  all: () => users,
  add: obj => (users = { ...users, ...obj }),
  existed: email => {
    for (let user in users) {
      if (users[user].email === email) {
        return true;
      }
    }
    return false;
  },
  isValidUser: (email , password) => {
    for(let user in users){
      if(users[user].email === email && users[user].password === password){
        return true;
      }
    }
    return false;
  },
  findUserByEmail: (email) => {
    for(let user in users){
      if(users[user].email === email){
        return users[user];
      }
    }
    return null;
  },
  urlsForUser: (id) => {
    let movieList = [];
    for(let user in users){
      if(user === id){
        movieList.push(users[user].longURL);
      }
    }
    return movieList;
  }
};

