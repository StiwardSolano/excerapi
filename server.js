const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;
// const path = require('path');


app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI || 'mongodb+srv://usertst:usertst@cluster0-mwkmh.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

/* app.use(express.static(path.join(__dirname, 'build')));
*/
app.get('/*', function(req, res) {
  res.send('Estas haciendo GET');
}); 

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
