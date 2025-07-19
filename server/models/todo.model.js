// server/models/todo.model.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  completed: {
    type: Boolean,
    default: false
  },
  // YENİ ALAN: Bu görevi oluşturan kullanıcının ID'sini saklayacak.
  userId: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;