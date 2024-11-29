// import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
// import React, { useState } from "react";

// const categories = [
//   "Theft",
//   "Bullying and Harassment",
//   "Parking Issues",
//   "Property Damage",
//   "Food Issues",
// ];

// const ComplaintForm = ({ selectedCategory }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     category: selectedCategory || "",
//     date: new Date().toISOString().split("T")[0], // Autofill current date
//     description: "",
//     location: "",
//   });
// console.log(formData);
//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

  
// const handleSubmit = async (event) => {
//   event.preventDefault();

//   const formattedDate = new Date(formData.date).toISOString(); // Full ISO format

//   const payload = {
//     ...formData,
//     date: formattedDate, // Replace with properly formatted date
//   };

//   try {
//     const response = await fetch(
//       "https://prod-07.northcentralus.logic.azure.com:443/workflows/295900b5a8ba4175836831dbc0c1a220/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=wdky5dw7vZxSpV8h3tVBnuXHgDrdhnoZLRhFnOTHbbk",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       }
//     );

//     if (response.ok) {
//       const result = await response.json();
//       alert(
//         "Complaint submitted successfully! Reference ID: " +
//           result.complaintNumber
//       );
//     } else {
//       alert("Failed to submit complaint. Please try again.");
//     }
//   } catch (error) {
//     console.log(error)
//     alert("An error occurred. Please try again.");
//   }
// };


//   return (
//     <Box
//       sx={{
//         maxWidth: 600,
//         margin: "0 auto",
//         padding: 4,
//         backgroundColor: "#FFFFFF",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//         borderRadius: "8px",
//       }}
//     >
//       <Typography variant="h5" component="h1" gutterBottom>
//         Submit Your Complaint
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           label="Email"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           label="Category"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           select
//           fullWidth
//           margin="normal"
//           required
//           disabled
//         >
//           {categories.map((category) => (
//             <MenuItem key={category} value={category}>
//               {category}
//             </MenuItem>
//           ))}
//         </TextField>
//         <TextField
//           label="Date"
//           name="date"
//           type="date"
//           value={formData.date}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           required
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//         <TextField
//           label="Description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           multiline
//           rows={4}
//           required
//         />
//         <TextField
//           label="Location"
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           sx={{ marginTop: 2 }}
//           fullWidth
//         >
//           Submit
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default ComplaintForm;

// import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
// import React, { useState } from "react";

// const categories = [
//   "Theft",
//   "Bullying and Harassment",
//   "Parking Issues",
//   "Property Damage",
//   "Food Issues",
// ];

// const ComplaintForm = ({ selectedCategory }) => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     category: selectedCategory || "",
//     date: new Date().toISOString().split("T")[0], // Autofill current date
//     description: "",
//     location: "",
//   });

//   const [file, setFile] = useState(null); // To store the uploaded file

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]); // Store the uploaded file
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     const formattedDate = new Date(formData.date).toISOString(); // Full ISO format

//     const payload = new FormData(); // Use FormData to handle file upload
//     payload.append("name", formData.name);
//     payload.append("email", formData.email);
//     payload.append("category", formData.category);
//     payload.append("date", formattedDate);
//     payload.append("description", formData.description);
//     payload.append("location", formData.location);
//     if (file) {
//       payload.append("file", file); // Attach the file
//     }

//     try {
//       const response = await fetch(
//         "https://prod-07.northcentralus.logic.azure.com:443/workflows/295900b5a8ba4175836831dbc0c1a220/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=wdky5dw7vZxSpV8h3tVBnuXHgDrdhnoZLRhFnOTHbbk",
//         {
//           method: "POST",
//           body: payload, // Send FormData with file
//         }
//       );

//       if (response.ok) {
//         const result = await response.json();
//         alert(
//           "Complaint submitted successfully! Reference ID: " +
//             result.complaintNumber
//         );
//       } else {
//         alert("Failed to submit complaint. Please try again.");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("An error occurred. Please try again.");
//     }
//   };

//   return (
//     <Box
//       sx={{
//         maxWidth: 600,
//         margin: "0 auto",
//         padding: 4,
//         backgroundColor: "#FFFFFF",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//         borderRadius: "8px",
//       }}
//     >
//       <Typography variant="h5" component="h1" gutterBottom>
//         Submit Your Complaint
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           label="Email"
//           name="email"
//           type="email"
//           value={formData.email}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <TextField
//           label="Category"
//           name="category"
//           value={formData.category}
//           onChange={handleChange}
//           select
//           fullWidth
//           margin="normal"
//           required
//           disabled
//         >
//           {categories.map((category) => (
//             <MenuItem key={category} value={category}>
//               {category}
//             </MenuItem>
//           ))}
//         </TextField>
//         <TextField
//           label="Date"
//           name="date"
//           type="date"
//           value={formData.date}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           required
//           InputLabelProps={{
//             shrink: true,
//           }}
//         />
//         <TextField
//           label="Description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           multiline
//           rows={4}
//           required
//         />
//         <TextField
//           label="Location"
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//           fullWidth
//           margin="normal"
//           required
//         />
//         <input
//           type="file"
//           onChange={handleFileChange}
//           accept="image/*"
//           style={{ marginTop: "16px", marginBottom: "16px", display: "block" }}
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           sx={{ marginTop: 2 }}
//           fullWidth
//         >
//           Submit
//         </Button>
//       </form>
//     </Box>
//   );
// };

// export default ComplaintForm;

import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import React, { useState } from "react";

const categories = [
  "Theft",
  "Bullying and Harassment",
  "Parking Issues",
  "Property Damage",
  "Food Issues",
];

const ComplaintForm = ({ selectedCategory }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: selectedCategory || "",
    date: new Date().toISOString().split("T")[0], // Autofill current date
    description: "",
    location: "",
  });

  const [fileData, setFileData] = useState({ fileName: "", base64: "" }); // To store file details

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileData({
          fileName: file.name,
          base64: reader.result.split(",")[1], // Extract Base64 data
        });
      };
      reader.readAsDataURL(file); // Convert to Base64
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formattedDate = new Date(formData.date).toISOString(); // Full ISO format

    const payload = {
      ...formData,
      date: formattedDate,
      fileName: fileData.fileName,
      fileBase64: fileData.base64,
    };

    try {
      const response = await fetch(
        "https://prod-07.northcentralus.logic.azure.com:443/workflows/295900b5a8ba4175836831dbc0c1a220/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=wdky5dw7vZxSpV8h3tVBnuXHgDrdhnoZLRhFnOTHbbk",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert(
          "Complaint submitted successfully! Reference ID: " +
            result.complaintNumber
        );
      } else {
        alert("Failed to submit complaint. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 700,
        margin: "auto",
        padding: 4,
        backgroundColor: "#f8f9fa",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
        borderRadius: "12px",
        marginTop: "50px",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        gutterBottom
        sx={{
          color: "#700f1a",
          fontWeight: "bold",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        Submit a Complaint
      </Typography>
      <Typography
        variant="body1"
        sx={{
          textAlign: "center",
          marginBottom: "20px",
          color: "#555",
        }}
      >
        Please fill out the form below to report an incident. Ensure all required fields are completed.
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
          }}
        />
        <TextField
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
          }}
        />
        <TextField
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          select
          fullWidth
          margin="normal"
          required
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
          }}
          disabled
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Incident Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          label="Description of Incident"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
          multiline
          rows={4}
          required
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
          }}
        />
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
          sx={{
            backgroundColor: "#ffffff",
            borderRadius: "8px",
          }}
        />
        <Box
          sx={{
            textAlign: "center",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <Button
            variant="outlined"
            component="label"
            sx={{
              borderColor: "#700f1a",
              color: "#700f1a",
              padding: "10px 20px",
              borderRadius: "20px",
            }}
          >
            Upload Evidence (Image)
            <input
              type="file"
              hidden
              onChange={handleFileChange}
              accept="image/*"
            />
          </Button>
          {fileData.fileName && (
            <Typography
              variant="body2"
              sx={{
                marginTop: "10px",
                color: "#555",
              }}
            >
              Selected File: {fileData.fileName}
            </Typography>
          )}
        </Box>
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#700f1a",
            color: "#ffffff",
            padding: "10px 20px",
            borderRadius: "20px",
            fontSize: "16px",
            width: "100%",
            ":hover": {
              backgroundColor: "#9a1f2b",
            },
          }}
        >
          Submit Complaint
        </Button>
      </form>
    </Box>
  );
};

export default ComplaintForm;
