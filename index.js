const express = require('express')
const app = express();
const port = 80;
var cors = require('cors')
const path = require('path')
var json = require('./data_file.json');
const { maxHeaderSize } = require('http');
var pool = require('./sql_details');
const rateLimit = require("express-rate-limit");

const {
  performance,
  PerformanceObserver
} = require('perf_hooks');

const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 40,
  keyGenerator: function(req, res) {
    return req.headers['x-forwarded-for'];
  }
});

app.use(limiter);
app.use(cors());

app.listen(port, () => {
  console.log('Listening on port '+port)
});

app.get('/', async(req, res) => {
  const t0 = performance.now();
  let toReturn = [];
  json.forEach(element => {
    index = element["script"].toLowerCase().indexOf(req.query.quote.toLowerCase());
    if(index!=-1)
    {
      toReturn.push({
        title:element["title"].substring(0,element["title"].length-4),
        script:lastCoupleWords(element["script"],index,req.query.quote),
        time:timeCalc(index,element["script"])
      });
    }
  });
  const time = performance.now() - t0;

  await pool.query("INSERT INTO LOGGING (IP,RES_TIME) VALUES (?,?)",[req.headers['x-forwarded-for'],time]);
  res.setHeader('content-type', 'text/json');
  res.send(JSON.stringify(toReturn));
});

function timeCalc(index,script)
{
  let percent = index / script.length;
  let seconds = parseInt(percent *21*60); //minutes times episodes
  minutes = parseInt(seconds / 60);
  seconds = seconds % 60;
  return minutes+":"+("0" + seconds).slice(-2);
}

function lastCoupleWords(script,index,quote)
{
  let startIndex = Math.max(0,index-100);
  let endIndex = Math.min(script.length-1,index+100);
  while (script[startIndex]!= '.' && startIndex < script.length)
  {
    startIndex++;
  }
  startIndex += 2;
  while (script[endIndex]!= '.' && endIndex > 0)
  {
    endIndex--;
  }
  endIndex++;

  return script.substring(Math.min(startIndex,index),Math.max(endIndex,index+quote.length));
}
