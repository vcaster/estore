const express = require('express');

const app = express();

const port = process.env.port || 3002;

app.listen(port,() => {
    console.log(`server running at ${port}`)
})