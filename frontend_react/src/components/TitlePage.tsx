import { Typography, Paper } from "@mui/material";
import { motion } from "framer-motion";

export default function TitlePage({ title }: { title: string }) {
  return (
    <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ type: "spring", stiffness: 500, damping: 50, duration: 1}}>
      <Paper sx={{ p: 2, borderRadius: 4, mx: "auto", border: "solid 1px rgba(255, 165, 0, 0.2)" }}>
        <Typography fontFamily="'Lato', sans-serif" fontSize={54} align="center" variant="h1">
          {title}
        </Typography>
      </Paper>
    </motion.div>
  );
}
