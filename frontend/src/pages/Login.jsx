import React from "react";
import {
  Container,
  Box,
  Grid2,
  Paper,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function Login() {
  const [showPassword, setShowPassword] = React.useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Grid2 container direction="column" spacing={3}>
          <Box display="flex" justifyContent="center" width="100%" gap={2}>
            <Button variant="outlined">
              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                Sign Up
              </Link>
            </Button>
            <Button variant="contained">Login</Button>
          </Box>
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
            <FormControlLabel control={<Checkbox />} label="Remember me" />
            <Button variant="text">Forgot password?</Button>
          </Grid2>
          <Grid2 item>
            <Button variant="contained" fullWidth>
              Log In
            </Button>
          </Grid2>
          <Grid2 item>
            <Button variant="outlined" fullWidth>
              Login with Google
            </Button>
          </Grid2>
        </Grid2>
      </Paper>
    </Container>
  );
}
