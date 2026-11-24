import express from 'express';
import fetch from "node-fetch";
import 'dotenv/config';

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get('/', (req, res) => {
    res.send('Hello Express app!')
});

app.listen(3000, () => {
    console.log('server started');
});