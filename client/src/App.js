// client/src/App.js
import React, { useContext } from 'react';
import { Routes, Route, Link as RouterLink, useNavigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';
import { AppBar, Toolbar, Typography, Button, Box, Container, CssBaseline } from '@mui/material';

function Navigation() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <RouterLink to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            TodoApp
          </RouterLink>
        </Typography>
        {user ? (
          <>
            <Typography sx={{ mr: 2 }}>Merhaba, {user.username}</Typography>
            <Button color="inherit" onClick={handleLogout}>Çıkış Yap</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/login">Giriş Yap</Button>
            <Button color="inherit" component={RouterLink} to="/register">Kayıt Ol</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

function App() {
  console.log("Vercel Ortam Değişkeni:", process.env.REACT_APP_API_URL);
  return (
    <AuthProvider>
      <CssBaseline /> {/* Tarayıcı stillerini sıfırlar */}
      <Box sx={{ flexGrow: 1 }}>
        <Navigation />
        <Container component="main" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Container>
      </Box>
    </AuthProvider>
  );
}

export default App;