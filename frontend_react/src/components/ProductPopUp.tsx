import { Box, Dialog, DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

type ProductPopUpProps = {
  product: Product;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ProductPopUp({ product, open, setOpen }: ProductPopUpProps) {
  const handleClose = () => {
    setOpen(false);
  };

  const url = product.thumbnail ? product.thumbnail[1] : "";

  return (
    <Dialog onClose={handleClose} open={open} fullWidth>
      <DialogTitle>{product.title}</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <Box width="100%" height="100vh">
        <iframe
          height="100%"
          width="100%"
          title={product.title}
          allowFullScreen
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          src={url}
        ></iframe>
      </Box>
    </Dialog>
  );
}
