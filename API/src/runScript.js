const express = require('express');
const bodyParser = require('body-parser');
const sass = require('sass');
const port = 80;

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

//create a server object:
app.post('/', (req, res) => {
  res.setHeader("Content-Type", "application/json");

  sass.compileStringAsync(JSON.parse(req.body).style, {
    loadPaths: ['node_modules']
  }).then((compileResult) => {
    res.send(`${compileResult.css}`);
  }, (reportError) => {
    res.send(`
    Error: ${JSON.stringify(req.body)}\n\n
    styles: ${req.body.style}\n\n
    ReportError: ${reportError}
    `)
  });

});
app.get('/', (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send('<form method="post" target="testFrame">' +
    '<textarea style="width: 100%; height: 70%;" name="style"></textarea><br/>' +
    '<input type="submit" value="get it"/>' +
    '</form>' +
    '<iframe style="width: 100%; height: calc(30% - 3rem);" name="testFrame"></iframe>');
});

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`server is listening on http://${host}:${port}`)
});
