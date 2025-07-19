// server/routes/todos.js
const router = require('express').Router();
let Todo = require('../models/todo.model');
const auth = require('../middleware/auth'); // Auth middleware'ini import et

// ÖNEMLİ: Artık tüm rotalara ikinci argüman olarak 'auth' ekliyoruz.
// Bu, bu rotalara erişilmeden önce auth middleware'inin çalışmasını sağlar.

// 1. Sadece giriş yapmış kullanıcının "yapılacaklarını" getiren endpoint
router.get('/', auth, async (req, res) => {
  // auth middleware'i bize req.user içinde kullanıcı ID'sini verdi.
  const todos = await Todo.find({ userId: req.user });
  res.json(todos);
});

// 2. Giriş yapmış kullanıcı için yeni "yapılacak" ekleyen endpoint
router.post('/add', auth, async (req, res) => {
  try {
    const { text } = req.body;
    const newTodo = new Todo({
      text,
      userId: req.user // Kullanıcı ID'sini göreve ekle
    });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. "Yapılacak" silen endpoint (korumalı)
router.delete('/:id', auth, async (req, res) => {
  // Güvenliği artırmak için: Silmeden önce bu görevin gerçekten bu kullanıcıya ait olup olmadığı kontrol edilebilir.
  // const todo = await Todo.findOne({ _id: req.params.id, userId: req.user });
  // if (!todo) return res.status(404).json({ msg: "Görev bulunamadı veya size ait değil." });
  
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Yapılacak silindi.' });
});

// 4. "Yapılacak" güncelleyen endpoint (korumalı)
router.post('/update/:id', auth, async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  // Burada da görev sahipliği kontrolü eklenebilir.
  
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
});

module.exports = router;