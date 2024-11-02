import { body } from "express-validator";

export const regValid = [
    body('phone').isLength({ min: 11 }).withMessage('Введите номер в формате : +7'),
    body('password').isLength({ min: 5 }).withMessage('password_Danger'),
    body('fullName').isLength({ min: 3 }).withMessage('name_incorrect'),
    body('avatarUrl')
        .optional({ checkFalsy: true }).isURL({ require_protocol: true, protocols: ['http', 'https'] })
        .withMessage('Invalid URL format')

];

export const logValid = [
    body('phone').matches(/^\+7-\d{3}-\d{3}-\d{2}-\d{2}$/),
    body('password').isLength({ min: 5 }),
];

export const itemValid = [
    body('date')
        .isDate()
        .withMessage('Неверный формат даты. Введите данные в формате YYYY-MM-DD'),

    body('time')
        .matches(/^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/)
        .withMessage('Неверный формат времени. Ожидается HH:MM или HH:MM:SS.'),
];

