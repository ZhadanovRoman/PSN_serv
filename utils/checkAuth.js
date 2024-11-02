import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '').replace(/['"]+/g, '').trim();
  console.log(token);
  if (token) {
    try {

      const decoded = jwt.verify(token, 'secret1728');
      req.userId = decoded._id; // Установка userId в req
      console.log(res)
      next();// Передача управления следующему middleware
    } catch (e) {

      return res.status(403).json({
        message: 'No access1',
        error: e.message,
      });
    }
  } else {
    console.log('req.headers');
    console.log(token);
    return res.status(403).json({
      message: 'No access2',
    });
  }
};