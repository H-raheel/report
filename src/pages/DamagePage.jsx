import { Box, Typography } from "@mui/material";
import React from "react";
import ComplaintForm from "../components/Form";
const DamagePage = () => {
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
        Report Property Damage
      </Typography>
      <div>
      <ComplaintForm selectedCategory="Property Damage" />
    </div>
    </Box>
  );
};

export default DamagePage;
