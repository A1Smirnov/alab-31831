const express = require('express');
const app = express();
const PORT = 3000; // Задайте значение порта по умолчанию
const usersRouter = require("./routes/users.js");
const postsRouter = require("./routes/posts.js");
const error = require('./utilities/error.js');
const path = require('path');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 

// Logging middleware
app.use((req, res, next) => {
  const time = new Date();
  console.log(`-----\n${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`);
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

// Уберите API-KEY Middleware
// app.use('/api', (req, res, next) => {
//   const key = req.query["api-key"];
//   if (!key) {
//     res.status(400).json({ error: "API Key Required" });
//     return;
//   }
//   if (apiKeys.indexOf(key) === -1) {
//     res.status(401).json({ error: "Invalid API Key" });
//     return;
//   }
//   req.key = key;
//   next();
// });

// Router Set Up
app.use("/api/users", usersRouter);
app.use("/api/posts", postsRouter);

// New User form
app.get("/users/new", (req, res) => {
  res.send(`
    <div>
      <h1>Create a User</h1>
      <form action="/api/users" method="POST">
        Name: <input type="text" name="name" required />
        <br />
        Username: <input type="text" name="username" required />
        <br />
        Email: <input type="email" name="email" required />
        <br />
        <input type="submit" value="Create User" />
      </form>
    </div>
  `);
});

// Download Example
app.use(express.static('./data'));

app.get("/get-data", (req, res) => {
  res.send(`
    <div>
      <h1>Download Data</h1>
      <form action="/download/users.js">
        <button>Download Users data</button>
      </form>
      <form action="/download/posts.js">
        <button>Download Posts data</button>
      </form>
    </div>
  `);
});

app.get("/download/:filename", (req, res) => {
  res.download(path.join(__dirname, 'data', req.params.filename));
});

// HATEOAS links
app.get("/api", (req, res) => {
  res.json({
    links: [
      { href: "/api/users", rel: "users", type: "GET" },
      { href: "/api/users", rel: "users", type: "POST" },
      { href: "/api/posts", rel: "posts", type: "GET" },
      { href: "/api/posts", rel: "posts", type: "POST" },
    ],
  });
});

app.get("/", (req, res) => {
  res.send("Work in progress!");
});

// 404 Error Handling Middleware
app.use((req, res, next) => {
  next(error(404, "Resource Not Found"));
});

// Custom error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
