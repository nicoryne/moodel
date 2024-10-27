import React from "react";
import {
  Box,
  Grid2,
  Paper,
  Typography,
  Button,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Home, MenuBook, Settings, AccountCircle } from "@mui/icons-material";

export default function TeacherDashboard() {
  return (
    <Box display="flex" height="100vh">
      {/* Sidebar */}
      <Box width="15%" bgcolor="grey.100" p={2}>
        <List>
          <ListItem button>
            <ListItemIcon>
              <Home />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <MenuBook />
            </ListItemIcon>
            <ListItemText primary="My Courses" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <Settings />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </List>
      </Box>

      {/* Main Dashboard Content */}
      <Box flex={1} p={2}>
        <Typography variant="h4" gutterBottom>
          Teacher Dashboard
        </Typography>
        <Box mb={2}>
          <Button variant="contained" color="primary">
            My Classes
          </Button>
          <Button variant="outlined" style={{ marginLeft: "10px" }}>
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Log Out
            </Link>
          </Button>
        </Box>
        <Grid2 container spacing={2}>
          <Grid2 xs={12}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h6">Course Name</Typography>
              <Typography variant="subtitle1"># of Students</Typography>
            </Paper>
          </Grid2>
          <Grid2 xs={12}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h6">Course Name</Typography>
              <Typography variant="subtitle1"># of Students</Typography>
            </Paper>
          </Grid2>
          <Grid2 xs={12}>
            <Paper elevation={3} style={{ padding: "20px" }}>
              <Typography variant="h6">Course Name</Typography>
              <Typography variant="subtitle1"># of Students</Typography>
            </Paper>
          </Grid2>
        </Grid2>
      </Box>

      {/* Teacher Details Section */}
      <Box width="25%" bgcolor="grey.100" p={2}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">Teacher Details</Typography>
          <IconButton>
            <Settings />
          </IconButton>
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center" mt={2}>
          <Avatar style={{ width: 80, height: 80 }}>
            <AccountCircle style={{ fontSize: 60 }} />
          </Avatar>
          <Typography variant="h6" mt={1}>
            Name
          </Typography>
          <Box mt={2}>
            <Button variant="outlined" fullWidth>
              Account
            </Button>
            <Button variant="outlined" fullWidth style={{ marginTop: "10px" }}>
              Grades
            </Button>
            <Button variant="outlined" fullWidth style={{ marginTop: "10px" }}>
              Class Management
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
