const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Middleware để đọc dữ liệu từ request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 1. Route GET /hello
app.get('/hello', (req, res) => {
  console.info('/hello call success');
  res.send('Welcome to Firebase Cloud Functions');
});

// 2. Route POST /emailValidate
app.post('/emailValidate', (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ status: false, message: 'Email là bắt buộc' });
  }

  // Kiểm tra định dạng email cơ bản
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) {
    return res.status(200).json({ status: true, message: 'Email hợp lệ', email });
  } else {
    return res.status(400).json({ status: false, message: 'Email không hợp lệ', email });
  }
});

// Cấu hình PORT động (Render sẽ tự cấp cổng qua process.env.PORT)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.info('Server is running on PORT:', PORT);
});