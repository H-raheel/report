import {
    Button,
    CircularProgress,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";

// A utility function to clean HTML content
const cleanHTML = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const TablePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    // Fetching the data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://prod-25.northeurope.logic.azure.com:443/workflows/d3240b47dae04aa8b96bcd04d3dfe819/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=xwDygb3ga0yLBjQFE254fcfSwbe6OFN3GL2KhajvSbo"
        ); // Replace with your API endpoint
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle status change request
  const handleStatusChange = (id) => {
    setCurrentComplaint(id);
    setOpenModal(true);
    setNewStatus("Resolved"); // You can change this to "Pending" or "In Progress" as needed
  };

  // Close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentComplaint(null);
    setNewStatus(""); // Reset the status after closing modal
  };

  // Handle confirmation of status change
  const handleConfirmStatusChange = async () => {
    setApiLoading(true);

    const apiUrl =
      "https://prod-61.northeurope.logic.azure.com:443/workflows/a107e4dc63734c19aaf9dc433dc2863f/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=fVraJDPpLFM1D2MSDufCM-zRado6UH9lXfXCUGB3OwA";

    const body = JSON.stringify({
      ComplaintId: currentComplaint,
      Status: newStatus,
    });

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });

      if (response.ok) {
        alert("Status updated successfully!");
        setData((prevData) =>
          prevData.map((item) =>
            item.ID === currentComplaint
              ? { ...item, Status: newStatus }
              : item
          )
        );
      } else {
        alert("Failed to update status.");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("An error occurred.");
    } finally {
      setApiLoading(false);
      setOpenModal(false);
      setCurrentComplaint(null);
      setNewStatus(""); // Reset status after the API call
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
        <Typography variant="h6" style={{ marginTop: "10px" }}>
          Loading...
        </Typography>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Complaints
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.ID}>
                <TableCell>{item.ID}</TableCell>
                <TableCell>{item.Name || "N/A"}</TableCell>
                <TableCell>{item.Email || "N/A"}</TableCell>
                <TableCell>
                  {new Date(item.Date).toLocaleString() || "N/A"}
                </TableCell>
                <TableCell>{item.Status}</TableCell>
                <TableCell>{item.Category || "Not specified"}</TableCell>
                <TableCell>{item.Location || "Not specified"}</TableCell>
                <TableCell>
                  {cleanHTML(item.Description) || "No description provided"}
                </TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color={item.Status === "Resolved" ? "success" : "primary"}
                    onClick={() => handleStatusChange(item.ID)}
                    disabled={item.Status === "Resolved"}
                  >
                    {item.Status === "Resolved" ? "Resolved" : "Mark as Resolved"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
            width: "300px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6">Are you sure you want to mark this as resolved?</Typography>
          {apiLoading ? (
            <CircularProgress />
          ) : (
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleConfirmStatusChange}
                style={{ margin: "10px" }}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={handleCloseModal}
                style={{ margin: "10px" }}
              >
                No
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default TablePage;
