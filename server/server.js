const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
const bodyParser = require('body-parser')
const ownersRouter = require('./routes/owners.router')
const petsRouter = require('./routes/pets.router')

app.use(bodyParser.json());
app.use(express.static('build'));

//ROUTES
app.use('/api/owners' , ownersRouter);
app.use('/api/pets', petsRouter);

app.listen(PORT, () => {
  console.log(`App is running on port: ${PORT}`)
})