import React from "react";
import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  IconButton,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Home, MenuBook, Settings, AccountCircle } from "@mui/icons-material";
{
  /*CHANGE this to fit what design!*/
}
export default function TeacherDashboard() {
  return (
    <Box display="flex" height="100vh" bgcolor="#f5f5f5">
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

        {/* Push User Icon to the Bottom */}
        <Box flexGrow={1} />

        <IconButton>
          <AccountCircle style={{ color: "white" }} />
        </IconButton>
      </Box>

      {/* Main Dashboard Content */}
      <Box flex={1} p={3}>
        <Typography variant="h4" gutterBottom>
          Teacher Dashboard
        </Typography>
        <Box mb={2} display="flex" gap={2}>
          <Button variant="contained" color="primary">
            My Classes
          </Button>
          <Button variant="outlined">
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Log Out
            </Link>
          </Button>
        </Box>
        <Grid container spacing={2}>
          {Array.from({ length: 3 }).map((_, index) => (
            <Grid item xs={12} key={index}>
              <Paper
                elevation={3}
                sx={{
                  padding: "20px",
                  backgroundColor: index % 2 === 0 ? "#3f51b5" : "white",
                  color: index % 2 === 0 ? "white" : "black",
                }}
              >
                <Typography variant="h6">Course Name</Typography>
                <Typography variant="subtitle1"># of Students</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Teacher Details Section */}
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
          <Typography variant="h6">Teacher Details</Typography>
          <IconButton>
            <Settings style={{ color: "white" }} />
          </IconButton>
        </Box>
        <Avatar sx={{ width: 80, height: 80, marginTop: 2 }}>
          <AccountCircle sx={{ fontSize: 60 }} />
        </Avatar>
        <Typography variant="h6" mt={1}>
          Name
        </Typography>
        <Box mt={2} width="100%">
          <Button
            variant="outlined"
            fullWidth
            sx={{ color: "white", borderColor: "white" }}
          >
            Account
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{ marginTop: "10px", color: "white", borderColor: "white" }}
          >
            Grades
          </Button>
          <Button
            variant="outlined"
            fullWidth
            sx={{ marginTop: "10px", color: "white", borderColor: "white" }}
          >
            Class Management
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
