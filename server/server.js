const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Endpoint GET /words
app.get('/words', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:4200');

  const filePath = path.join(__dirname, 'words.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send({ error: 'Unable to read words file.' });
    }

    try {
      const words = JSON.parse(data);
      res.status(200).send(words);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).send({ error: 'Invalid JSON format in words file.' });
    }
  });
});

// Uruchomienie serwera
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
