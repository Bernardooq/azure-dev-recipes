const app = require('./app');
const port = process.env.PORT || 3005;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log("Running in port " + port);
  });
}
