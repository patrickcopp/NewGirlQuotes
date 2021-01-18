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
      toReturn.push({
        title:element["title"].substring(0,element["title"].length-4),
        script:"THIS IS THE SCRIPT",
        time:timeCalc(req.query.quote,element["script"])
      });
    }
  });
  res.send(JSON.stringify(toReturn));
});

app.listen(port, () => {
  console.log('Listening on port '+port)
});

function timeCalc(quote,script)
{
  let position = script.indexOf(quote);
  let percent = position / script.length;
  let seconds = parseInt(percent *21*60); //minutes times episodes
  minutes = parseInt(seconds / 60);
  seconds = seconds % 60;
  return minutes+":"+("0" + seconds).slice(-2);
}