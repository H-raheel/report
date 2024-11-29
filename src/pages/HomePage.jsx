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
import theftImage from "../images/locker.jpg";
import bullyImage from "../images/bully.jpg";
import parkingImage from "../images/parking.jpg";
import foodImage from "../images/food.jpg";
import socketImage from "../images/socket.jpg"; // If needed


const categories = [
  { name: "Theft", color: "#D0E6FF", imageUrl: theftImage, route: "/theft" },
  { name: "Bullying and Harassment", color: "#DFFFD6", imageUrl: bullyImage, route: "/bullying" },
  { name: "Parking Issues", color: "#FFD6D6", imageUrl:parkingImage, route: "/parking" },
  { name: "Property Damage", color: "#00274D", imageUrl: socketImage, route: "/damage", textColor: "#FFFFFF" },
  { name: "Food Issues", color: "#DFF9FF", imageUrl: foodImage, route: "/food" },
];

const HomePage = () => {
  const navigate = useNavigate();


return (
  <Box
    sx={{
      minHeight: "100vh",
      backgroundColor: "#F8F9FA",
      padding: 4,
    }}
  >
    {/* Welcome Header */}
    <Box sx={{ textAlign: "center", marginBottom: 6 }}>
      <Typography
        variant="h4"
        component="h1"
        sx={{
          color: "#700F1A",
          fontWeight: "bold",
          marginBottom: 2,
        }}
      >
        Incident Reporting System
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "1rem",
          color: "#555",
          maxWidth: 700,
          margin: "0 auto",
        }}
      >
        Efficiently report incidents and track the status of your complaints
        on this platform. Select a category to file a new complaint or use
        the search section below to check your complaint status.
      </Typography>
    </Box>

    {/* Categories Section */}
    <Box sx={{ marginBottom: 6 }}>
      <Typography
        variant="h6"
        component="h2"
        sx={{
          textAlign: "center",
          color: "#700F1A",
          fontWeight: "bold",
          marginBottom: 3,
        }}
      >
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {categories.map((category, index) => (
          <Grid item key={index} xs={6} sm={4} md={3}>
            <CardActionArea onClick={() => navigate(category.route)}>
              <Card
                sx={{
                  backgroundColor: "#700F1A",
                  color: "#FFFFFF",
                  textAlign: "center",
                  borderRadius: "8px",
                  boxShadow: "0 3px 8px rgba(0, 0, 0, 0.1)",
                  transition: "transform 0.2s",
                  ":hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.2)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="120"
                  image={category.imageUrl}
                  alt={`${category.name} image`}
                />
                <CardContent>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
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