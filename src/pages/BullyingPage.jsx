import React from "react";
import { Box, Typography } from "@mui/material";
import ComplaintForm from "../components/Form";
const BullyingPage = () => {
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
        Report Bullying or Harassment
      </Typography>
      <div>
      <ComplaintForm selectedCategory="Bullying and Harassment" />
      </div>
    </Box>
  );
};

export default BullyingPage;
