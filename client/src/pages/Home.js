// client/src/pages/Home.js
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import TodoItem from '../components/TodoItem';
import { Box, TextField, Button, List, Typography, Paper } from '@mui/material';

function Home() {
    // ... (Home.js'teki mevcut state ve fonksiyonlarınız aynı kalacak)
    // Sadece JSX kısmını aşağıdaki gibi güncelleyin.
    // useState, useEffect, handle... fonksiyonları önceki adımdaki gibi kalabilir.
    const [todos, setTodos] = useState([]);
    const [newTodoText, setNewTodoText] = useState('');
    const { user, token } = useContext(AuthContext);

    const api = axios.create({
        baseURL: 'http://localhost:5000',
        headers: { 'x-auth-token': token },
    });

    const fetchTodos = async () => { /* ... aynı kalacak ... */ 
        try { const res = await api.get('/todos'); setTodos(res.data); } catch (err) { console.error(err); }
    };
    useEffect(() => { if (user) fetchTodos(); }, [user]);
    const handleSubmit = async (e) => { /* ... aynı kalacak ... */ 
        e.preventDefault(); if (!newTodoText.trim()) return;
        try { const res = await api.post('/todos/add', { text: newTodoText }); setTodos([...todos, res.data]); setNewTodoText(''); } catch (err) { console.error(err); }
    };
    const handleDelete = async (id) => { /* ... aynı kalacak ... */ 
        try { await api.delete(`/todos/${id}`); setTodos(todos.filter(todo => todo._id !== id)); } catch (err) { console.error(err); }
    };
    const handleToggle = async (id) => { /* ... aynı kalacak ... */ 
        try { const res = await api.post(`/todos/update/${id}`); setTodos(todos.map(todo => todo._id === id ? res.data : todo)); } catch (err) { console.error(err); }
    };

    return (
        <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Yapılacaklar Listen
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                    label="Yeni bir görev ekle..."
                    variant="outlined"
                    fullWidth
                    value={newTodoText}
                    onChange={(e) => setNewTodoText(e.target.value)}
                />
                <Button type="submit" variant="contained" size="large">Ekle</Button>
            </Box>
            <List>
                {todos.map(todo => (
                    <TodoItem
                        key={todo._id}
                        todo={todo}
                        onToggle={handleToggle}
                        onDelete={handleDelete}
                    />
                ))}
            </List>
        </Paper>
    );
}

export default Home;