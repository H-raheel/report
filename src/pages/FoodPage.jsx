import { Box, Typography } from "@mui/material";
import React from "react";
import ComplaintForm from "../components/Form";
const FoodPage = () => {
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
        Report Food Issues
      </Typography>
      <div>
      <ComplaintForm selectedCategory="Food Issues" />
    </div>
    </Box>
  );
};

export default FoodPage;
