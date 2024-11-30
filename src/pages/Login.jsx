import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "admin@gmail.com",
    password: "admin123",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    // Hardcoded credentials
    const validUsername = "admin";
    const validPassword = "password123";

    if (formData.username === validUsername && formData.password === validPassword) {
      navigate("/admin/complaints");
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f8f9fa", // Gray background
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: 600,
          width: "100%",
          padding: 4,
          backgroundColor: "#f8f9fa",
          boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
          borderRadius: "12px",
          marginTop: "50px",
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{
            color: "#700f1a",
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          Admin Login
        </Typography>
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            marginBottom: "20px",
            color: "#555",
          }}
        >
          Please enter your credentials to log in.
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
            }}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "8px",
            }}
          />
          {error && (
            <Typography
              variant="body2"
              sx={{
                color: "#700f1a",
                textAlign: "center",
                marginTop: "10px",
              }}
            >
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#700f1a",
              color: "#ffffff",
              padding: "10px 20px",
              borderRadius: "20px",
              fontSize: "16px",
              width: "100%",
              marginTop: "20px",
              ":hover": {
                backgroundColor: "#9a1f2b",
              },
            }}
          >
            Login
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
