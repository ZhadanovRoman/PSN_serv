import express from "express";

import mongoose from "mongoose";
import { itemValid, logValid, regValid } from "./validations/auth.js";
import dotenv from 'dotenv';
import checkAuth from "./utils/checkAuth.js";
import passSmsValidate from "./utils/passSmsValidate.js";
import passSmsGenerate from "./utils/passSmsGenerate.js";
import { registrFn, loginFn } from "./reqFunctions/userFn.js";
import { itemFn, itemReservFn, itemDelete, getAllItems } from "./reqFunctions/itemFn.js";


import cors from 'cors';
dotenv.config();// нода читает env

mongoose.connect(`mongodb+srv://romanoff198928:${process.env.SMS_PASS}@cluster0.mvd97ti.mongodb.net/first?retryWrites=true&w=majority&appName=Cluster0`)
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err))
const PORT = 5000;
const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions))


app.use(express.json()); // сервер распознает json



app.get('/', (req, res) => {
    console.log(res)
    res.send(res.body)
});

app.get('/items', getAllItems);

app.post('/auth/login', logValid, loginFn);

app.post('/auth/registr', regValid, registrFn);

app.post('/generateSmsPass', passSmsGenerate);
app.post('/validateSmsPass', passSmsValidate);

app.post('/item/create', itemValid, itemFn);

app.put('/item/create', itemReservFn);

app.delete('/item/delete', itemDelete)

app.listen(PORT, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('server OK')
})