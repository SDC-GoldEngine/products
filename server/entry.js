const app = require('./index');

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(
  `Listening on http://${process.env.HOST}:${port}`,
));
