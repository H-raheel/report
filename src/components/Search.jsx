import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ComplaintSearch = () => {
  const [complaintNumber, setComplaintNumber] = useState("");
  const [complaintDetails, setComplaintDetails] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFetchComplaint = async () => {
    if (!complaintNumber) {
      toast.error("Please enter a valid complaint number.");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(
        "https://prod-13.northcentralus.logic.azure.com:443/workflows/ad9a11d329ec42a2976bd94412312897/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=NrP6FY-uJiMqab6cOVrluuobwI8SR_9OZdV8ZRb3AsU",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ complaintNumber }),
        }
      );

      const data = await response.json();

      const formatDateTime = (dateString) => {
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Karachi", 
        };
      
        return new Intl.DateTimeFormat("en-US", options).format(new Date(dateString));
      };
      

      if (response.ok) {
        setComplaintDetails({
          ComplaintNumber: data.ComplaintNumber,
          Name: data.Name,
          Email: data.Email,
          Category: data.Category,
    Date: formatDateTime(data.Date), // Format date and time
          Status: data.Status,
          Description: data.Description.replace(/<[^>]+>/g, ""), // Stripping HTML tags
          Location: data.Location,
          Priority: data.Priority,
          LastModified: formatDateTime(data.Modified), // Format date and time
        });
      } else {
        toast.error(data.error || "An error occurred while fetching the complaint.");
        setComplaintDetails(null);
      }
    } catch (err) {
      toast.error("An unexpected error occurred.");
      setComplaintDetails(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 700,
        backgroundColor: "#f8f9fa",
        padding: 4,
        borderRadius: 2,
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
      }}
    >
      <ToastContainer />
      <Typography
        variant="h5"
        component="h2"
        gutterBottom
        sx={{
          textAlign: "center",
          color: "#700f1a", // Updated color
          fontWeight: "bold",
        }}
      >
        Check Complaint Status
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          color: "#555555",
          marginBottom: 3,
        }}
      >
        Thank you for reporting the incident. We value your contribution to maintaining a safe university environment.
        Please enter your complaint number below to view the status and details of your report.
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Complaint Number"
          value={complaintNumber}
          onChange={(e) => setComplaintNumber(e.target.value)}
          sx={{
            marginBottom: 2,
            backgroundColor: "#ffffff",
            borderRadius: "4px",
            maxWidth: 500,
          }}
        />
        <Button
          variant="contained"
          onClick={handleFetchComplaint}
          sx={{
            width: "50%",
            maxWidth: 200,
            backgroundColor: "#700f1a", // Updated color
            color: "#ffffff",
            marginBottom: 3,
            ":hover": {
              backgroundColor: "#5a0c14",
            },
          }}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : "View Status"}
        </Button>
      </Box>

      {/* Complaint Details */}
      <Collapse in={!!complaintDetails}>
        {complaintDetails && (
          <Box sx={{ marginTop: 3 }}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                color: "#700f1a", // Updated color
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              Complaint Details
            </Typography>
            <TableContainer
              component={Paper}
              sx={{
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#700f1a" }}>
                    <TableCell
                      sx={{
                        color: "#ffffff",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Field
                    </TableCell>
                    <TableCell
                      sx={{
                        color: "#ffffff",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Value
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Object.entries(complaintDetails).map(([key, value]) => (
                    <TableRow
                      key={key}
                      sx={{
                        ":hover": {
                          backgroundColor: "#f1f3f5",
                        },
                      }}
                    >
                      <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                        {key}
                      </TableCell>
                      <TableCell sx={{ textAlign: "center" }}>{value}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}
      </Collapse>
    </Box>
  );
};

export default ComplaintSearch;
