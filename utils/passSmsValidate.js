import jwt from 'jsonwebtoken';

export default async (req, res) => {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.TOKEN_SMS_KEY);
  
    try {

        if (req.body.pass == decoded.code) {
            res.json({ message: 'Code valid' });
        } else {
            res.status(500).json({ error: 'Code invalid' });
        }
    } catch (error) {
        console.error('Error generating code or sending SMS:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

