import { Box, Card, CardActionArea, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

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
      <Typography variant="h3" component="h1" gutterBottom>
        Welcome to the Complaint Management System
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 4 }}>
        Please select the type of complaint you wish to report:
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
  );
};

export default HomePage;
