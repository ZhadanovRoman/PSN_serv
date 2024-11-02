import fetch from 'node-fetch'; 
import jwt from 'jsonwebtoken';

export default async (req, res) => {
    const tokenKey = process.env.TOKEN_SMS_KEY
    try {
        const { phone } = req.body;
        
        const randomNumber = Math.floor(1000 + Math.random() * 9000); 
        const token = jwt.sign({ code: randomNumber }, tokenKey, { expiresIn: '5m' });

        const smsSend = await fetch(`https://smsc.ru/sys/send.php?login=prostudio&psw=${process.env.SMS_PASS}&phones=${phone.replace(/[^\d+]/g, '')}&mes=${randomNumber}`);

        if (smsSend.ok) {
            res.json({ token }); 
        } else {
            res.status(500).json({ error: 'Failed to send SMS' });
        }
    } catch (error) {
        console.error('Error generating code or sending SMS:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

