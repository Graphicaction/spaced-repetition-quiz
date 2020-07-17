const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('./routes');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// // Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("../client/build"));
// }

// If it's production environment!
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  // console.log('YOU ARE IN THE PRODUCTION ENV');
  app.use(
    '/static',
    express.static(path.join(__dirname, '../client/build/static'))
  );
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/'));
  });
}

// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/questions",
  { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);

// Use apiRoutes
app.use(routes);

// Error handler
app.use(function (err, req, res, next) {
  console.log('====== ERROR =======');
  console.error(err.stack);
  res.status(500);
});
// // Send every request to the React app
// // Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "../client/build/index.html"));
// });

app.listen(PORT, function() {
  console.log(`==> API server now on port ${PORT}!`);
});
