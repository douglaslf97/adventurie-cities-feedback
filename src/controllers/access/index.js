const routes = require('express').Router();
const { isAfter, isEqual } = require('date-fns');
routes.get('/', async (req, res)=>{
  const today = Date.now();
  const expiration = new Date('2019-11-28', 'yyyy-MM-dd');
  const valid = !isAfter(today, expiration) || !isEqual(today, expiration);
  return res.status(200).send({access: valid});
})

module.exports = app => app.use('/verification', routes);