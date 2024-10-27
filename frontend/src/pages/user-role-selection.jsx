import React from "react";
import { Container, Box, Paper, Button, Typography } from "@mui/material";
import { Person, School } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function UserRoleSelection() {
  return (
    <Container maxWidth="sm" style={{ marginTop: "40px" }}>
      <Paper elevation={3} style={{ padding: "30px", textAlign: "center" }}>
        <Typography variant="h5" gutterBottom>
          Are you a
        </Typography>
        <Box display="flex" justifyContent="space-around" mt={3}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Person />}
            component={Link}
            to="/teacher/login"
            style={{ minWidth: "120px" }}
          >
            Teacher
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<School />}
            component={Link}
            to="/student/login"
            style={{ minWidth: "120px" }}
          >
            Student
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
