import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Tooltip, Typography, useMediaQuery } from "@mui/material";
import AddToCartButton from "./AddToCartButton";
import { motion } from "framer-motion";
import ProductPopUp from "./ProductPopUp";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  const setButtonSize = () => {
    const isXs = useMediaQuery('(max-width: 1536px)');
    return isXs ? 'small' : 'large';
  };

  return (
    <>
      <Grid item xs={12} sm={6} lg={3}>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          style={{ height: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Card sx={{ border: "solid 1px rgba(255, 165, 0, 0.2)", maxWidth: 445, height: "100%", mx: "auto" }}>
            <Stack justifyContent="space-between" height="100%">
              <Box>
                <Box position='relative'>
                  <Tooltip title="Click to View 3D Sample" followCursor>
                    <CardMedia
                      sx={{ cursor: "pointer" }}
                      component="img"
                      alt={product.title}
                      height="140"
                      onClick={() => setOpen(true)}
                      image={
                        product.thumbnail && product.thumbnail.length > 0
                          ? product.thumbnail[0]
                          : "/assets/img/product_sample.png"
                      }
                    />
                  </Tooltip>
                  <Button
                    variant="contained"
                    size={setButtonSize()}
                    color="error"
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      margin: 1,
                    }}
                    onClick={() => setOpen(true)}
                  >
                    View Demo
                  </Button>
                </Box>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.description}
                  </Typography>
                </CardContent>
              </Box>
              <CardActions>
                <Stack direction="row" justifyContent="space-between" alignItems="center" width="100%">
                  <Typography ml={2} color="whitesmoke" variant="h4" fontWeight="bold">
                    ${product.price}
                    <Typography ml={1} color="whitesmoke" variant="caption" fontWeight="bold" component="span">
                      USD
                    </Typography>
                  </Typography>
                  <AddToCartButton product={product} />
                </Stack>
              </CardActions>
            </Stack>
          </Card>
        </motion.div>
      </Grid>
      <ProductPopUp product={product} open={open} setOpen={setOpen} />
    </>
  );
}
