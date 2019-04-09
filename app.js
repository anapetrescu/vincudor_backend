const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const port = 3000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4201");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.use(require('./controllers/userController'))
app.use(require('./controllers/wineController'))
app.use(require('./controllers/cartController'))
app.listen(port, () => console.log(`App listening on port ${port}!`))