const express = require('express');
const path = require('path');
const itemsRoute = require('./routes/items_routes');
const mongoose = require("mongoose");

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
app.get('/', (req, res) => {
    // res.send('Hello, World!')
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.use(express.json());

app.use('/api/items', itemsRoute)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));