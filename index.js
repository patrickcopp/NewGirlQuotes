const express = require('express')
const app = express();
const port = 8000;
var cors = require('cors')
const path = require('path')
var json = require('./data_file.json');
const { maxHeaderSize } = require('http');
app.use(cors())

app.get('/', (req, res) => {
  console.log(req.query.quote);
  let toReturn = [];
  json.forEach(element => {
    index = element["script"].toLowerCase().indexOf(req.query.quote.toLowerCase());
    if(index!=-1)
    {
      toReturn.push({
        title:element["title"].substring(0,element["title"].length-4),
        script:lastCoupleWords(element["script"],index),
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

function lastCoupleWords(script,index)
{
  let startIndex = Math.max(0,index-100);
  let endIndex = Math.min(script.length-1,index+100);
  while (script[startIndex]!= '.' && startIndex < script.length)
  {
    startIndex++;
  }
  startIndex++;
  while (script[endIndex]!= '.' && endIndex > 0)
  {
    endIndex--;
  }
  endIndex++;

  return script.substring(Math.min(startIndex,index),Math.max(endIndex));
}