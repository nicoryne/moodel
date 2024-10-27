import { Stack, Container, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo192.png";

const navLinks = [
  { text: "Home", href: "/" },
  { text: "About", href: "/about" },
  { text: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <Box
      sx={{
        backgroundColor: "#3f51b5", // Set the navbar background to blue
        paddingY: 2,
      }}
    >
      {/* Outer Container */}
      <Container maxWidth="xl">
        {/* Inner Stack */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Logo and Navigation Links Section */}
          <Stack direction="row" spacing={8} alignItems="center">
            {/* Logo Section */}
            <Box>
              <img src={logo} alt="Logo" style={{ height: "50px" }} />
            </Box>

            {/* Navigation Links */}
            <Stack direction="row" spacing={3}>
              {navLinks.map((navlink) => (
                <Button key={navlink.text} sx={{ color: "white" }}>
                  <Link
                    to={navlink.href}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      fontWeight: "bold",
                    }}
                  >
                    {navlink.text}
                  </Link>
                </Button>
              ))}
            </Stack>
          </Stack>

          {/* Login Button */}
          <Button
            variant="contained"
            color="secondary"
            sx={{
              borderRadius: 3,
              paddingX: 4,
              textTransform: "none",
            }}
          >
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}
            >
              Login
            </Link>
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
