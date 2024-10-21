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
    <Box sx={{ backgroundColor: "transparent", paddingY: 4 }}>
      {/* Outer Container */}
      <Container maxWidth="xl">
        {/* Inner Stack */}
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Logo and Navlink Stack */}
          <Stack direction="row" spacing={8}>
            {/* Logo Section */}
            <Box>
              <img src={logo} alt="Logo" style={{ height: "50px" }} />
            </Box>

            {/* Navigation Links */}
            <Stack direction="row" spacing={3}>
              {navLinks.map((navlink) => (
                <Button key={navlink.text}>
                  <Link
                    to={navlink.href}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    {navlink.text}
                  </Link>
                </Button>
              ))}
            </Stack>
          </Stack>

          {/* Login Button */}
          <Button>
            <Link
              to="/login"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Login
            </Link>
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
