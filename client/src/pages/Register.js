// client/src/pages/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Box, TextField, Button, Typography, Paper } from '@mui/material';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // API endpoint'ini register olarak değiştiriyoruz
      await axios.post('http://localhost:5000/api/users/register', { username, password });
      // Kayıt başarılı olduğunda kullanıcıyı giriş sayfasına yönlendiriyoruz
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.msg || 'Kayıt sırasında bir hata oluştu.');
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={6} sx={{ marginTop: 8, padding: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Kayıt Ol
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Kullanıcı Adı"
            name="username"
            autoFocus
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Şifre (min. 6 karakter)"
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Kayıt Ol
          </Button>
          <Link to="/login" style={{ textDecoration: 'none' }}>
            <Typography variant="body2">
              Zaten bir hesabınız var mı? Giriş Yapın
            </Typography>
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;