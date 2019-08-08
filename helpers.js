  const findUserByEmail = (email, users) => {
    for (let user in users) {
      if (users[user].email === email) {
        return users[user];
      }
    }
    return undefined;
  }

  const checkUniqVisitor = (userId, url, uniqUsers) => {
    if(!uniqUsers.find(user => user.userId === userId && user.url === url)){
      uniqUsers.push({userId, url});
    } 
    return;
  }

  const updateUniqVisits = (urls, userlist) => {
    for(let url in urls){
      for(let user of userlist){
        if(url.userId === userlist[user].userId){
          url.uniqTotVisits += 1;
        }
      }
    }
    return;
  }

  module.exports = { findUserByEmail, checkUniqVisitor, updateUniqVisits } ;