const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
app.use(bodyParser.json(), cors());

const SECRET_KEY = 'your_secret_key';

const env = {
  port: 3001
}

// Przykładowe dane użytkownika
const user = {
  id: 1,
  username: 'eduuser',
  password: 'password'
};

// Endpoint do logowania, który zwróci token JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Sprawdzenie czy dane są poprawne
  if (username === user.username && password === user.password) {
    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Niepoprawne dane logowania' });
  }
});

// Middleware do weryfikacji tokenu JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'Token wymagany' });
  }

  jwt.verify(token.split(' ')[1], SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Nieprawidłowy token' });
    }
    req.user = decoded;
    next();
  });
};

// Endpoint chroniony autoryzacją JWT
app.get('/protected', verifyToken, (req, res) => {
  res.json({ message: 'Masz dostęp do chronionych danych', user: req.user });
});

app.listen(env.port, () => {
  console.log('JSON User Server is running on http://localhost:' + env.port + '/');
});
