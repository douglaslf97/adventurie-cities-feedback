const express = require('express');
const cors = require('cors');

const app  = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}))




require('./controllers/feedback')(app);
require('./controllers/access')(app);

app.get('/', (req, res)=>{
  return res.send('Running!');
})

app.listen(process.env.PORT || 3333, ()=>{
  console.log('Server Running!');
})