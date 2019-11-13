const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname,'public')))


const teas = ['tea1','tea2','tea3'];

app.get('/api/teas', (req, res) => {
  // res.render('');
  res.json(teas)

});

app.post('/api/teas/add', (req, res) => {
  teas.push(req.body.teaName);
  res.json(teas)
})


app.listen(3000);
