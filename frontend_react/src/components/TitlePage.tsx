import { Typography, Paper } from "@mui/material";

export default function TitlePage({ title }: { title: string }) {
  return (
    <Paper sx={{ p: 2, borderRadius: 4, mx: "auto", border: "solid 1px rgba(255, 165, 0, 0.2)" }}>
      <Typography fontFamily="'Lato', sans-serif" fontSize={54} align="center" variant="h1">
        {title}
      </Typography>
    </Paper>
  );
}
