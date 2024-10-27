import React from "react";
import {
  Container,
  Grid2,
  Paper,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function StudentSignUp() {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Grid2 container direction="column" spacing={3}>
          <Box display="flex" justifyContent="center" width="100%" gap={2}>
            <Button variant="contained">Sign Up</Button>
            <Button variant="outlined" component={Link} to="/student/login">
              Login
            </Button>
          </Box>
          <Grid2 item>
            <TextField label="Name" fullWidth variant="outlined" />
          </Grid2>
          <Grid2 item>
            <TextField label="Email" fullWidth variant="outlined" />
          </Grid2>
          <Grid2 item>
            <TextField
              label="Password"
              fullWidth
              variant="outlined"
              type={showPassword ? "text" : "password"}
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </Grid2>
          <Grid2
            item
            container
            justifyContent="space-between"
            alignItems="center"
          >
            <FormControlLabel
              control={<Checkbox />}
              label="I agree to the terms and conditions"
            />
          </Grid2>
          <Grid2 item>
            <Button variant="contained" fullWidth>
              Sign Up
            </Button>
          </Grid2>
          <Grid2 item>
            <Button variant="outlined" fullWidth>
              Sign Up with Google
            </Button>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
}
