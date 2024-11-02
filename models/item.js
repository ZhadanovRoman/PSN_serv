import mongoose from "mongoose";

const ItemType = new mongoose.Schema({
    date: {
        type: String,
        required: true, //обязательно
    },
    time: {
        type: String,
        required: true,
       
    },
    procedure: {
        type: String,
    },
    reserv: {
        type: String,
        required: true
    },
    clientName: {
        type: String,
    }
},{
timestamps: true, // время создания объекта
}
);

export default mongoose.model('Item', ItemType)