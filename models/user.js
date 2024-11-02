import mongoose from "mongoose";

const UserType = new mongoose.Schema({
    fullName: {
        type: String,
        required: true, //обязательно
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true, // не может повторяться
    },
    passwordHash: {
        type: String,
        
    },
    master:  String,
    avatarUrl: String,
},{
timestamps: true, // время создания объекта
}
);

export default mongoose.model('User', UserType)