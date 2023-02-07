const express = require('express');
const bodyParser = require('body-parser');
const sass = require('sass');
const port = 80;

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));

//create a server object:
app.post('/', (req, res) => {
  res.setHeader("Content-Type", "application/json");
  sass.compileStringAsync(req.body.style, {
    loadPaths: ['node_modules']
  }).then((compileResult) => {
    res.send(`${compileResult.css}`);
  }, (reportError) => {
    res.send(`Error: ${JSON.stringify(req.body)}
    ReportError: ${JSON.stringify(reportError)}
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
