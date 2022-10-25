const express = require('express');
const cors = require('cors')
const AppRoute = require('./Routes');

const app = express();

// allow us to reseive information from front end in JSON format
app.use(express.json());
app.use(cors());


app.use('/', AppRoute);

app.listen(3001, () => {
    console.log("server running on port 3001");
});