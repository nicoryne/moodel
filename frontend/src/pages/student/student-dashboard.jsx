import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  Home,
  MenuBook,
  Settings,
  AccountCircle,
  Person,
} from "@mui/icons-material";

export default function StudentDashboard() {
  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Box
        width="80px"
        bgcolor="#3f51b5"
        display="flex"
        flexDirection="column"
        alignItems="center"
        py={3}
        borderRadius="0 15px 15px 0"
      >
        <IconButton>
          <Home style={{ color: "white" }} />
        </IconButton>
        <IconButton>
          <MenuBook style={{ color: "white" }} />
        </IconButton>
        <IconButton>
          <Settings style={{ color: "white" }} />
        </IconButton>
        <IconButton style={{ marginTop: "auto" }}>
          <Person style={{ color: "white" }} />
        </IconButton>
      </Box>

      {/* Main Dashboard Content */}
      <Box flex={1} p={3}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Box mb={2} display="flex" gap={2}>
          <Button variant="contained" color="primary">
            My Courses
          </Button>
          <Button variant="outlined">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Logout
            </Link>
          </Button>
        </Box>
        <Box display="flex" flexDirection="column" gap={2}>
          <Paper
            elevation={3}
            style={{
              padding: "15px",
              backgroundColor: "#3f51b5",
              color: "white",
            }}
          >
            <Typography variant="h6">Course Name</Typography>
            <Typography variant="subtitle2">Instructor</Typography>
          </Paper>
          <Paper elevation={3} style={{ padding: "15px" }}>
            <Typography variant="h6">Course Name</Typography>
            <Typography variant="subtitle2">Instructor</Typography>
          </Paper>
          <Paper
            elevation={3}
            style={{
              padding: "15px",
              backgroundColor: "#3f51b5",
              color: "white",
            }}
          >
            <Typography variant="h6">Course Name</Typography>
            <Typography variant="subtitle2">Instructor</Typography>
          </Paper>
        </Box>
      </Box>

      {/* Student Details Section */}
      <Box
        width="300px"
        bgcolor="#3f51b5"
        p={3}
        display="flex"
        flexDirection="column"
        alignItems="center"
        borderRadius="15px"
        color="white"
        margin={2}
      >
        <Box display="flex" justifyContent="space-between" width="100%">
          <Typography variant="h6">Student Details</Typography>
          <IconButton>
            <Settings style={{ color: "white" }} />
          </IconButton>
        </Box>
        <Avatar style={{ width: 80, height: 80, marginTop: 10 }}>
          <AccountCircle style={{ fontSize: 60 }} />
        </Avatar>
        <Typography variant="h6" mt={1}>
          User
        </Typography>
        <Box mt={2} width="100%">
          <Button
            variant="outlined"
            fullWidth
            style={{ color: "white", borderColor: "white" }}
          >
            Account
          </Button>
          <Button
            variant="outlined"
            fullWidth
            style={{ marginTop: "10px", color: "white", borderColor: "white" }}
          >
            Courses
          </Button>
          <Button
            variant="outlined"
            fullWidth
            style={{ marginTop: "10px", color: "white", borderColor: "white" }}
          >
            My Projects
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
