import React from "react";
import {
  Container,
  Box,
  Grid2,
  Typography,
  Button,
  Avatar,
} from "@mui/material";

export default function Home() {
  return (
    <Box>
      <Container sx={{ paddingTop: 5 }}>
        <Grid2 container spacing={4} alignItems="center">
          {/* Left Side: Header and Text */}
          <Grid2 item xs={12} md={6}>
            <Typography variant="h2" gutterBottom>
              I AM HEADER
            </Typography>
            <Typography variant="body1" component="paragraph">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum."
            </Typography>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Get Started
            </Button>
          </Grid2>

          {/* Right Side: Profile Picture */}
          <Grid2 item xs={12} md={6} display="flex" justifyContent="center">
            <Avatar
              alt="Profile Picture"
              src="/path/" // Replace with the actual path
              sx={{ width: 200, height: 200, borderRadius: "15px" }}
            />
          </Grid2>
        </Grid2>
      </Container>
    </Box>
  );
}
