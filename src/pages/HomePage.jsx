import React from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ComplaintSearch from "../components/Search";


const categories = [
  { name: "Theft", color: "#D0E6FF", imageUrl: "https://via.placeholder.com/200?text=Theft", route: "/theft" },
  { name: "Bullying and Harassment", color: "#DFFFD6", imageUrl: "https://via.placeholder.com/200?text=Bullying", route: "/bullying" },
  { name: "Parking Issues", color: "#FFD6D6", imageUrl: "https://via.placeholder.com/200?text=Parking", route: "/parking" },
  { name: "Property Damage", color: "#00274D", imageUrl: "https://via.placeholder.com/200?text=Damage", route: "/damage", textColor: "#FFFFFF" },
  { name: "Food Issues", color: "#DFF9FF", imageUrl: "https://via.placeholder.com/200?text=Food", route: "/food" },
];

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F8F9FA",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
      }}
    >
      {/* Welcome Header */}
      <Box sx={{ marginBottom: 6, textAlign: "center" }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to the Complaint Management System
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Your platform for efficient and transparent complaint handling.
        </Typography>
      </Box>

      {/* Categories Section */}
      <Box sx={{ width: "100%", marginBottom: 6 }}>
        <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: "center" }}>
          Select Complaint Category
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {categories.map((category, index) => (
            <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
              <CardActionArea onClick={() => navigate(category.route)}>
                <Card
                  sx={{
                    backgroundColor: category.color,
                    color: category.textColor || "#000000",
                    textAlign: "center",
                    borderRadius: "12px",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={category.imageUrl}
                    alt={`${category.name} image`}
                  />
                  <CardContent>
                    <Typography variant="h6" component="div">
                      {category.name}
                    </Typography>
                  </CardContent>
                </Card>
              </CardActionArea>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Complaint Search Section */}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <ComplaintSearch />
      </Box>
    </Box>
  );
};

export default HomePage;
