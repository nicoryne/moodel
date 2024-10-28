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
import { login } from "../api/auth";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

export default function StudentLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = () => {
    if (login(email, password)) {
      navigate("/teacher/home");
    }
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: "50px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Grid2 container direction="column" spacing={3}>
          <Box display="flex" justifyContent="center" width="100%" gap={2}>
            <Button variant="outlined" component={Link} to="/signup">
              Sign Up
            </Button>
            <Button variant="contained">Login</Button>
          </Box>
          <Grid2 item>
            <TextField
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              variant="outlined"
            />
          </Grid2>
          <Grid2 item>
            <TextField
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
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
            <Button variant="contained" fullWidth onClick={() => handleLogin()}>
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
