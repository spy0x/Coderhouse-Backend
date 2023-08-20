import { Container, Typography } from "@mui/material";

export default function Error({error}: {error: ErrorMessage}) {
  return (
    <Container sx={{p: 5}}>
      <Typography align="center" display='block' mx='auto' variant="h2">{error.status}</Typography>
      <Typography align="center" display='block' mx='auto' variant="h5">{error.message}</Typography>
    </Container>
  )
}
