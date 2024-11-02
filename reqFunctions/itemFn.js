import { validationResult } from "express-validator";
import ItemType from "../models/item.js";
import UserType from "../models/user.js";

export const getAllItems = async (req,res) => {
  try {
    const items = await ItemType.find(); // Получаем все объекты из коллекции
    res.json(items);
} catch (err) {
    console.error('Error fetching items:', err);
    res.status(500).json({ message: 'Error fetching items' });
}
}


export const itemFn = async (req, res) => {
  try {
    const { date, time } = req.body;
    const itemUniq = await ItemType.findOne({ date: date, time: time });
    if (itemUniq) {
      return res.status(400).send({ message: 'Запись с такой датой и временем уже существует' });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const doc = new ItemType({
      date: req.body.date,
      time: req.body.time,
      reserv: req.body.reserv
    })

    const user = await doc.save(); //документ сохраненный в бд

    res.send('дата и время внесены в бд');

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "дата не зарегестрирована" })
  }
};

export const itemReservFn = async (req, res) => {

  try {
    const { _id, time, date, clientName, procedure } = req.body;

    
    const result = await ItemType.findOneAndUpdate(

      { _id: _id },
      { $set: { reserv: 'занято', clientName: clientName, procedure: procedure } },
      { new: true }
    );

    if (!result) {
      res.status(404).send('Что-то пошло не так');
    } else {
      res.send(`Клиент ${clientName} записан на время ${time}, дату ${date}`);
    }

  } catch (err) {

    res.status(400).send(`беда в запросе ${err}`);
  }
};

export const itemDelete = async (req, res) => {
  console.log('попытка удалить')
  try {
    const { _id } = req.body;

    if (!_id) {
      return res.status(400).send('ID is required');
    }
    const result = await ItemType.findByIdAndDelete(_id);
    if (!result) {
      res.status(404).send('Запись не найдена');
    } else {
      res.send('Запись удалена');
    }

  } catch (err) {
    console.error(err);
    res.status(500).send(`Internal server error: ${err.message}`);
  }
};
