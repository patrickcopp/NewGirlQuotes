const express = require('express')
const app = express();
const port = 8000;
var cors = require('cors')
const path = require('path')
var json = require('./data_file.json');
app.use(cors())

app.get('/', (req, res) => {
  console.log(req.query.quote);
  let toReturn = [];
  json.forEach(element => {
    if(element["script"].toLowerCase().includes(req.query.quote.toLowerCase()))
    {
      toReturn.push(element["title"].substring(0,element["title"].length-4));
    }
  });
  res.send(JSON.stringify(toReturn));
});

app.listen(port, () => {
  console.log('Listening on port '+port)
});
