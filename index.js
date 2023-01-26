const express = require("express");
const app = express();
const port = 3034;

const secure = (req, res, next) => {
  const token = req.query;

  if (token.name && token.value) {
    // userQuery is a new custom key
    req.userQuery = { name: token.name, value: token.value };
    next();
  } else {
    res.status(400).send("Bad Request");
  }
};

app.use(secure, (req, res, next) => {
  try {
    res.send("succesfullylogged");
    next();
  } catch {
    res.status(403).send("forbidden");
  }
});

app.get("/", (req, res, next) => {
  console.log("Hello World!");
  next();
});

app.get("/", (req, res) => {
  console.log("Hello world");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
