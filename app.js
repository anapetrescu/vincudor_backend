const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());
const port = 3000;

app.use(require('./controllers/userController'))
app.listen(port, () => console.log(`App listening on port ${port}!`))