require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const urlParser = bodyParser.urlencoded({extended: false});
const jsonParser = bodyParser.json();
const request = require('request');

const sendTextToDB = require('../controllers/dbController');

const articles = require('./database/controllers/articlesController');
const sources = require('./database/controllers/sourcesController');
const users = require('./database/controllers/usersController');
// const parserKey = process.env.PARSER_KEY // NOT WORKING; JERRY CHECKED; NEED TO ASK JOHN M
// console.log('process.env = ', process.env);
const parserKey = 'KmjXDnLR5Dmtn2IPHQCwONFAFUlaJQpObfJq0AM6';

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, './client')));

// receive POST req of URL user wants to hear; send GET req to Mercury & receive obj w/ parsed data; send to dbController; (will refactor to pull out routes at least)
app.post('/requrl', function(req, res) {
  console.log('server.js, POST to /requrl. l. 20: req received. body = ', req.body);
  let requrl = req.body.requrl;
  console.log('server.js POST to requrl. l. 14. requrl = ', requrl);

  const objToSaveToDB = {
    requrl: requrl
  };
  // console.log('objToSaveToDB w/ initial value (requrl) = ', objToSaveToDB);

  const parserOptions = { method: 'GET',
  url: 'https://mercury.postlight.com/parser?url=' + requrl,
  // qs: { url: 'requrl' },
  headers:
   {
     'x-api-key': parserKey,
     'content-type': 'application/json' }
   };

  request(parserOptions, function (error, response, body) {
    if (error) {console.log('server.js, GET req to Mercury. error! = ',
      console.error);
      res.status(400).send('Dang; error retrieving parsed text of url from Mercury...');
    };
    var parsedBody = JSON.parse(body);
    console.log('server.js GET req to Mercury, l. 43. body received = ',
      body, 'END OF BODY ###########\n\n');
    console.log('server.js GET req to Mercury, l. 45. Response JSON.parse(body) = ', parsedBody);

    objToSaveToDB.title = parsedBody.title;
    objToSaveToDB.domain = parsedBody.domain;
    objToSaveToDB.author = parsedBody.author;
    objToSaveToDB.date_published = parsedBody.date_published;
    objToSaveToDB.lead_image_url = parsedBody.lead_image_url;
    objToSaveToDB.excerpt = parsedBody.excerpt;
    objToSaveToDB.word_count = parsedBody.word_count;
    objToSaveToDB.text = parsedBody.content;

    console.log('server.js after GET req to Mercury, l. 55. completed objToSaveToDB = ', objToSaveToDB);

    sendTextToDB.saveTextToDB(objToSaveToDB);

    res.status(200).send('Got your request. Text of article = ' + objToSaveToDB.text);
  });
});

// to test; will update with the actual endpoint in next user story
app.get('/', function(req, res) {
  console.log('server.js received GET req at / . Readcastly is on its way to fame & fortune!');
  res.send('We heard your GET req and the diligent Readcastly hamsters are fast at work. All your wildest dreams will soon come true. Stay tuned for more exciting endpoints coming soon to a Postman near you.');
});

// to test urlParser; will update to add authentication route when we get to that story
// app.post('/login', urlParser, function(req, res) {
//   console.log('server.js l. 16: received POST to /login. Will read it now...');
//   if(req.body === {}) {
//     console.log('server.js l. 18 - urlParser says body is empty on this request: ', req);
//     return res.sendStatus(400);
//   }
//   console.log('server.js l. 21. req.body = ', req.body);
//   console.log('server.js l. 22. req.body.username = ', req.body.username);
//   res.send('Welcome to Readcastly, ' + req.body.username + '! Nice to have you on board.');
// });

// to test bodyParser for json;
app.post('/jsonTest', jsonParser, function(req, res) {
  console.log('server.js l. 28: received POST to /jsonTest. Will read it now...');
  console.log(req.body);
  if(req.body === {}) {
    console.log('server.js l. 30: jsonTest did not get an object to parse');
    return res.sendStatus(400);
  }
  console.log('server.js l. 33: req.body should be an obj. body = ', req.body);
  res.sendStatus(200);
});

const port = process.env.PORT || 8080; // NB: Jerry said we don't want PORT in the .env file, as it will be supplied by deployment platform

app.listen(port, function() {
  console.log("Readcastly server listening intently on port: ", port);
})

module.exports = app;

// sample response from Mercury:
// {
//   "title": "Building Awesome CMS",
//   "content": "<div><div><div class=\"section-content\"><div.... more content",
//   "author": "Jeremy Mack",
//   "date_published": "2016-10-03T12:48:58.385Z",
//   "lead_image_url": "https://cdn-images-1.medium.com/max/1200/1*zo51eqdjJ_XSU0D8Vm8P9A.png",
//   "dek": null,
//   "next_page_url": null,
//   "url": "https://trackchanges.postlight.com/building-awesome-cms-f034344d8ed",
//   "domain": "trackchanges.postlight.com",
//   "excerpt": "Awesome CMS is…an awesome list of awesome CMSes. It’s on GitHub, so anyone can add to it via a pull request.",
//   "word_count": 397,
//   "direction": "ltr",
//   "total_pages": 1,
//   "rendered_pages": 1
// }
