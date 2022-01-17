const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    // res.send('Hello, World!')
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));