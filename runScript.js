const { exec } = require("child_process");
const express = require('express')
const app = express()
const port = 3000;

//create a server object:
app.post('/', (req, res) => {
  res.setHeader("Content-Type", "application/json");
  exec(`cat ./test.scss | sass --load-path=node_modules --stdin`, (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    res.send(`${stdout}`);
  });
});
app.get('/', (req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.send('<form method="post">' +
    '<textarea name="style"></textarea><input type="submit" value="get it"/>' +
    '</form>');
});

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`server is listening on http://${host}:${port}`)
});
