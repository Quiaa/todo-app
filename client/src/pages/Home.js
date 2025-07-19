// client/src/pages/Home.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api'; // axios yerine yeni api dosyamızı import ediyoruz
import TodoItem from '../components/TodoItem';
import { Box, TextField, Button, List, Typography, Paper } from '@mui/material';

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodoText, setNewTodoText] = useState('');
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const res = await api.get('/todos');
        setTodos(res.data);
      } catch (err) {
        console.error("Veri çekerken hata oluştu:", err);
      }
    };

    if (user) {
      fetchTodos();
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newTodoText.trim()) return;
    try {
      const res = await api.post('/todos/add', { text: newTodoText });
      setTodos([...todos, res.data]);
      setNewTodoText('');
    } catch (err) {
      console.error("Todo eklerken hata oluştu:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error("Todo silerken hata oluştu:", err);
    }
  };

  const handleToggle = async (id) => {
    try {
      const res = await api.post(`/todos/update/${id}`);
      setTodos(todos.map(todo => (todo._id === id ? res.data : todo)));
    } catch (err) {
      console.error("Todo güncellerken hata oluştu:", err);
    }
  };

  return (
    <Paper elevation={3} sx={{ padding: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Yapılacaklar Listen
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField label="Yeni bir görev ekle..." variant="outlined" fullWidth value={newTodoText} onChange={(e) => setNewTodoText(e.target.value)} />
        <Button type="submit" variant="contained" size="large">Ekle</Button>
      </Box>
      <List>
        {todos.map(todo => (
          <TodoItem key={todo._id} todo={todo} onToggle={handleToggle} onDelete={handleDelete} />
        ))}
      </List>
    </Paper>
  );
}

export default Home;