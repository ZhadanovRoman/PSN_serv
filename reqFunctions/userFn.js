import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";
import UserType from "../models/user.js";

export const loginFn = async (req, res) => {
    try {
        const user = await UserType.findOne({ phone: req.body.phone });
        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash) //сравниваем введенный пароль с хэшированным паролем из бд и возвр bollean 
       
        const salt = await bcrypt.genSalt(7);
        const masterCrypt = await bcrypt.hash(user.master, salt);

        if (!user || !isValidPass) {
            return res.status(404).json({
                message: 'Неверный телефон или пароль'
            });
        }
        const token = jwt.sign({
            _id: user._id,
            clientName: user.fullName, 
        },
            'secret1728',
            {
                expiresIn: '300d',
            },
        );
        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
            masterCrypt
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "авторизация не прошла" })
    }
}

export const registrFn = async (req, res) => {
    try {
        const err = validationResult(req); //проверяет запрос на ошибки

        if (!err.isEmpty()) {
            return res.status(400).json(err.array());
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserType({
            phone: req.body.phone,
            fullName: req.body.fullName,
            passwordHash: hash,
            master: req.body.master,
            avatarUrl: req.body.avatarUrl

        })

        const user = await doc.save(); //документ сохраненный в бд

        const token = jwt.sign({
            _id: user._id,
        },
            'secret1728',
            {
                expiresIn: '300d',
            },
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            return res.status(409)
        }
        res.status(500).json({ message: "регистрация не прошла" })
    }
}

export const authMeFn =  async (req, res) => {
    try { 
        const user = await UserType.findById(req.userId)
        if(!user){
           return res.status(404).json({
            message: 'Пользователь не найден'
           })
        }

        const { passwordHash, ...userData } = user._doc;

        res.json( userData );
 
    } catch (err) { 
        console.log(err, "next midlewar Don't have token")
    }
}