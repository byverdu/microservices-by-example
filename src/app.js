import express from "express";

const app = express();

app.get('/', async (req, res) => {
    res.send('hello world')
});

export {app};