const express = require('express');
const path = require('path');
const itemsRoute = require('./routes/items_routes');
const groupsRoute = require('./routes/groups_routes');
const mongoose = require("mongoose");
const cors = require('cors');
const dotenv = require("dotenv");
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((res) => {
        console.log("db Connected");
    })
    .catch((err) => {
        console.log("Connection failed! \n", err);
    });
// postgres server listens on 5433
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({
    extended: true
  }));
app.use(express.json());

app.use('/api/items', itemsRoute)
app.use('/api/groups', groupsRoute)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));