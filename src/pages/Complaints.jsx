import FilterAltIcon from "@mui/icons-material/FilterAlt";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Utility function to clean HTML content
const cleanHTML = (html) => {
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || "";
};

const TablePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [currentComplaint, setCurrentComplaint] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [newStatus, setNewStatus] = useState("");

  // New state variables for Image Modal
  const [openImageModal, setOpenImageModal] = useState(false);
  const [currentImageUrl, setCurrentImageUrl] = useState("");

  // Filters
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  useEffect(() => {
    // Fetching data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://prod-25.northeurope.logic.azure.com:443/workflows/d3240b47dae04aa8b96bcd04d3dfe819/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=xwDygb3ga0yLBjQFE254fcfSwbe6OFN3GL2KhajvSbo"
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        toast.error("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtered Data
  const filteredData = data.filter((item) => {
    return (
      (statusFilter === "" || item.Status === statusFilter) &&
      (categoryFilter === "" || item.Category === categoryFilter) &&
      (priorityFilter === "" || item.Priority === priorityFilter)
    );
  });

  // Handle status change request
  const handleStatusChange = (id) => {
    setCurrentComplaint(id);
    setOpenStatusModal(true);
    setNewStatus("Resolved");
  };

  // Close the status modal
  const handleCloseStatusModal = () => {
    setOpenStatusModal(false);
    setCurrentComplaint(null);
    setNewStatus("");
  };

  // Handle view picture button click
  const handleViewPicture = (imageUrl) => {
    setCurrentImageUrl(imageUrl);
    console.log(imageUrl)

    setOpenImageModal(true);
  };

  // Close the image modal
  const handleCloseImageModal = () => {
    setOpenImageModal(false);
    setCurrentImageUrl("");
  };

  // Confirm status change
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
        toast.success("Status updated successfully!");
        setData((prevData) =>
          prevData.map((item) =>
            item.ID === currentComplaint
              ? { ...item, Status: newStatus }
              : item
          )
        );
      } else {
        toast.error("Failed to update status.");
      }
    } catch (error) {
      toast.error("An error occurred.");
    } finally {
      setApiLoading(false);
      handleCloseStatusModal();
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
      <ToastContainer />
      <Typography
        variant="h4"
        gutterBottom
        style={{
          textAlign: "center",
          color: "#700f1a",
          fontWeight: "bold",
        }}
      >
        Admin Board - Incident Management
      </Typography>
      <Typography
        variant="subtitle1"
        style={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#555555",
        }}
      >
        Manage, Filter, and Resolve Reported Incidents
      </Typography>

      {/* Filter Pane */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#f8f9fa", // Subtle light background
          padding: "8px 15px", // Reduced padding
          borderRadius: "8px", // Slightly smaller border radius
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)", // Subtle shadow
          marginBottom: "15px", // Reduced margin
        }}
      >
        {/* Filter Heading with Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h6"
            style={{
              color: "#700f1a", // Consistent color
              fontWeight: "bold",
            }}
          >
            <FilterAltIcon style={{ marginRight: "5px" }} />
            Filters
          </Typography>
        </div>

        {/* Filter Inputs */}
        <div style={{ display: "flex", gap: "15px" }}> {/* Reduced gap */}
          <FormControl style={{ minWidth: "100px" }}> {/* Reduced width */}
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Resolved">Resolved</MenuItem>
              <MenuItem value="Pending">Pending</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ minWidth: "100px" }}> {/* Reduced width */}
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Parking Issues">Parking Issues</MenuItem>
              <MenuItem value="Bullying">Bullying</MenuItem>
              <MenuItem value="Theft">Theft</MenuItem>
              <MenuItem value="Food Issues">Food Issues</MenuItem>
              <MenuItem value="Property Damage">Property Damage</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ minWidth: "100px" }}> {/* Reduced width */}
            <InputLabel>Priority</InputLabel>
            <Select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Low">Low</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {/* Table */}
      <TableContainer
        component={Paper}
        style={{
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: "#700f1a" }}>
              {[
                "ID",
                "Name",
                "Email",
                "Date",
                "Status",
                "Category",
                "Priority",
                "Location",
                "Description",
                "Actions",
                "View Picture", // New header
              ].map((header) => (
                <TableCell
                  key={header}
                  style={{
                    color: "#ffffff",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((item) => (
              <TableRow key={item.ID}>
                <TableCell style={{ textAlign: "center" }}>{item.ID}</TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {item.Name || "N/A"}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {item.Email || "N/A"}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {new Date(item.Date).toLocaleString() || "N/A"}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {item.Status}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {item.Category || "Not specified"}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {item.Priority || "Not specified"}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {item.Location || "Not specified"}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {cleanHTML(item.Description) || "No description provided"}
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    style={{
                      background:
                        item.Status === "Pending"
                          ? "linear-gradient(to right, #700f1a, #9a1f2b)" // Red gradient for Pending
                          : "linear-gradient(to right, #4caf50, #81c784)", // Green gradient for Resolved
                      color: "#ffffff",
                      borderRadius: "20px",
                      padding: "5px 15px",
                    }}
                    onClick={() => handleStatusChange(item.ID)}
                    disabled={item.Status === "Resolved"}
                  >
                    {item.Status === "Resolved" ? "Resolved" : "Pending"}
                  </Button>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  {item.Picture ? (
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleViewPicture(item.Picture)}
                      style={{
                        borderColor: "#700f1a",
                        color: "#700f1a",
                        padding: "5px 10px",
                        borderRadius: "20px",
                      }}
                    >
                      View Picture
                    </Button>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Confirmation Modal for Status Change */}
      <Modal open={openStatusModal} onClose={handleCloseStatusModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
            width: "400px",
            textAlign: "center",
          }}
        >
          <Typography variant="h6" style={{ marginBottom: "20px" }}>
            Are you sure you want to mark this as resolved?
          </Typography>
          {apiLoading ? (
            <CircularProgress />
          ) : (
            <div>
              <Button
                variant="contained"
                style={{
                  backgroundColor: "#700f1a",
                  color: "#ffffff",
                  margin: "10px",
                }}
                onClick={handleConfirmStatusChange}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                style={{
                  color: "#700f1a",
                  borderColor: "#700f1a",
                  margin: "10px",
                }}
                onClick={handleCloseStatusModal}
              >
                No
              </Button>
            </div>
          )}
        </div>
      </Modal>

      {/* Image Modal */}
      <Modal open={openImageModal} onClose={handleCloseImageModal}>
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#ffffff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 5px 15px rgba(0, 0, 0, 0.3)",
            maxWidth: "90%",
            maxHeight: "90%",
            overflow: "auto",
          }}
        >
          <Typography variant="h6" style={{ marginBottom: "20px", textAlign: "center" }}>
            Complaint Picture
          </Typography>
          {currentImageUrl ? (
            <img
              src={currentImageUrl}
              alt="Complaint"
              style={{
                width: "100%",
                height: "auto",
                borderRadius: "10px",
              }}
            />
          ) : (
            <Typography>No image available.</Typography>
          )}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button
              variant="contained"
              style={{
                backgroundColor: "#700f1a",
                color: "#ffffff",
                padding: "5px 15px",
              }}
              onClick={handleCloseImageModal}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TablePage;
