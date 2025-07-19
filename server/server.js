// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // .env dosyasını yükler

const app = express();
const port = process.env.PORT || 5000;

// Middleware'ler
app.use(cors()); // Farklı portlardan gelen isteklere izin verir
app.use(express.json()); // Gelen isteklerin body'sini JSON olarak parse eder

// Veritabanı Bağlantısı
const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB veritabanı bağlantısı başarıyla kuruldu.");
});

// Temel bir route (yol)
app.get('/', (req, res) => {
  res.send('Todo App API Çalışıyor!');
});


const todosRouter = require('./routes/todos');
app.use('/todos', todosRouter); // /todos adresine gelen istekleri todosRouter'a yönlendir

const usersRouter = require('./routes/users');
app.use('/api/users', usersRouter); // /api/users adresine gelen istekleri usersRouter'a yönlendir

app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} adresinde başlatıldı.`);
});