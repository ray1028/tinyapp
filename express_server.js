const express = require("express");
const app = express();
const PORT = 8080;
const bodyParser = require("body-parser");
const users = require("./users");
const bcrypt = require("bcrypt");
const cookieSession = require("cookie-session");

const urlDatabase = {
  b6UTxQ: { longURL: "https://www.tsn.ca", userID: "aJ48lW", totVisits: 0},
  i3BoGr: { longURL: "https://www.google.ca", userID: "aJ48lW", totVisits: 0 }
};

app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cookieSession({
    name: "session",
    keys: ["cookie monster"],
    // Cookie Options
    // maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

app.set("view engine", "ejs");

const findUserByUrl = url => {
  let result = "";
  for (let item in urlDatabase) {
    if (url === item) {
      result = urlDatabase[item].userID;
    }
  }
  return result;
};

app.get("/", (req, res) => {
  res.redirect("/urls");
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.get("/urls", (req, res) => {

  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    let templateVars = {
      urls: urlDatabase,
      user: users.all()[req.session.user_id],
      currentUser: req.session.user_id,
    };
  
    res.render("urls_index", templateVars);
  }
});

app.get("/urls/new", (req, res) => {
  // checking if a user is logged in from cookie user_id
  if (!req.session.user_id) {
    res.redirect("/login");
  }
  let templateVars = {
    urls: urlDatabase,
    user: users.all()[req.session.user_id]
  };
  res.render("urls_new", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {

  if (!req.session.user_id) {
    res.redirect('/login');
  } else {
    let templateVars = {
      shortURL: req.params.shortURL,
      longURL: req.session.user_id
        ? urlDatabase[req.params.shortURL].longURL
        : "",
      user: users.all()[req.session.user_id],
    };
    res.render("urls_show", templateVars);
  }
});

app.post("/urls", (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  urlDatabase[shortURL] = {
    longURL,
    userID: req.session.user_id,
    createDate: new Date()
  };

  res.redirect("/urls/" + shortURL);
});

app.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  if (urlDatabase[shortURL]) {
    // console.log('click now')
    console.log('******');
    console.log(urlDatabase[shortURL]);
    console.log(shortURL);
    urlDatabase[shortURL].totVisits += 1;
    console.log(urlDatabase[shortURL].totVisits);

    res.redirect(urlDatabase[shortURL].longURL);
  } else {
    res.status(404).redirect("/urls_error");
  }
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  const userID = findUserByUrl(shortURL);
  if (req.session.user_id && req.session.user_id === userID) {
    delete urlDatabase[shortURL];
    res.redirect("/urls");
  } else {
    res
      .status(403)
      .render("urls_error", { error: "403 Forbidden error", user: undefined });
  }
});

app.post("/urls/:id", (req, res) => {
  const newURL = req.body.newURL;
  if (
    req.session.user_id &&
    req.session.user_id === urlDatabase[req.params.id].userID
  ) {
    urlDatabase[req.params.id].longURL = newURL;
    res.redirect("/urls");
  } else {
    res
      .status(403)
      .render("urls_error", { error: "403 Forbidden error", user: undefined });
  }
});

app.post("/login", (req, res) => {
  let userID = "";
  const email = req.body.email;
  const password = req.body.password;
  if (users.isValidUser(email, password)) {
    userID = users.findUserByEmail(email).id;
    req.session.user_id = userID;
    res.redirect("/urls");
  } else {
    res
      .status(403)
      .render("urls_error", { error: "403 Forbidden error", user: undefined });
  }
});

app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/urls");
});

app.get("/register", (req, res) => {
  let templateVars = { user: users.all()[req.session["user_id"]] };
  res.render("urls_registration", templateVars);
});

app.post("/register", (req, res) => {
  let obj = {};
  let id = generateRandomString();
  let email = req.body.email;
  let password = req.body.password;

  if (
    req.body.email !== "" &&
    req.body.password !== "" &&
    !users.existed(email)
  ) {
    password = bcrypt.hashSync(password, 10);
    obj[id] = { id, email, password };
    users.add(obj);
    req.session.user_id = id;
    res.redirect("/urls");
  } else {
    res
      .status(400)
      .render("urls_error", {
        error: "400 Bad Request error",
        user: undefined
      });
  }
});

app.get("/login", (req, res) => {
  res.render("urls_login", { user: users.all()[req.session.user_id] });
});

app.get("/*", (req, res) => {
  res.status(404);
  res.render("urls_error", { error: "404 Page Not Found", user: undefined });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

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