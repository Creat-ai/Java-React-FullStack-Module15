import { Container, CssBaseline, Box, Avatar, Typography, TextField, Button, Grid } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useState } from 'react';
import agent from "../../app/api/agent"; // Импортируйте agent

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await agent.Account.register(formData); // Отправка данных на сервер
      navigate("/login"); // Перенаправление на страницу входа
    } catch (error) {
      console.error("Registration error:", error);
      // Здесь можно добавить обработку ошибок, например, уведомление пользователя
    }
  };

  return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formData.username}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}