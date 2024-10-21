import { Container, Box, Grid2 } from "@mui/material";

export default function Home() {
  return (
    <Container>
      <Grid2 container spacing={4} columns={2}>
        <Grid2 size={4}></Grid2>
        <Grid2 size={6}>
          <Box sx={{ backgroundColor: "black" }}></Box>
        </Grid2>
      </Grid2>
    </Container>
  );
}
