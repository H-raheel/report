import { Box, Typography } from "@mui/material";
import React from "react";
import ComplaintForm from "../components/Form";
const ParkingPage = () => {
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
        Report Parking Issues
      </Typography>
      <div>
      <ComplaintForm selectedCategory="Parking Issue" />
    </div>
    </Box>
  );
};

export default ParkingPage;
