// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date', (req, res, next) => {
  let date;
  if (Number(req.params.date)) {
    date = new Date(Number(req.params.date));
  } else {
    date = new Date(req.params.date)
  }
  req.unix = date.getTime();
  req.utc = date.toUTCString();
  next();
}, (req, res) => {
  if (!req.unix) {
    res.json({ "error": "Invalid Date"})
  } else {
    res.json({ "unix": req.unix, "utc": req.utc });
  }
});

app.get('/api', (req, res, next) => {
  req.utc = new Date().toUTCString();
  req.unix = Date.parse(req.utc);
  next();
}, (req, res) => {
  res.json({ "unix": req.unix, "utc": req.utc });
});

// listen for requests :)
app.listen(process.env.PORT || 3000, () => console.log("Listening on 3000"))

// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });
