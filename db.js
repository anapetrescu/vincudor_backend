var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'vincudor'
});

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})

//connection.end()

module.exports = connection;