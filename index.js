const app = require('express')();
const consign = require('consign');
const db = require('./config/db');

app.db = db;

consign()
  .include('./config/passport.js')
  .then('./config/middlewares.js')
  .then('./api/validation.js')
  .then('./api')
  .then('./config/routes.js')
  .into(app);

const port = normalizaPort(process.env.PORT || '3000');
function normalizaPort(val) {
  const port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

app.listen(port, () => {
  console.log(`Crud - Backend Sendo Executando, na porta ${port}.`);
});
