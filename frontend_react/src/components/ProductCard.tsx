import { Box, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";
import AddToCartButton from "./AddToCartButton";
import { motion } from "framer-motion";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <motion.div initial={{ opacity: 0, y: 100 }} style={{height: '100%'}} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
        <Card sx={{ border: "solid 1px rgba(255, 165, 0, 0.2)", maxWidth: 445, height: "100%", mx: "auto" }}>
          <Stack justifyContent="space-between" height="100%">
            <Box>
              <CardMedia
                component="img"
                alt={product.title}
                height="140"
                image={
                  product.thumbnail && product.thumbnail.length > 0 ? product.thumbnail[0] : "/assets/img/product_sample.png"
                }
              />
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
                </Typography>
                <AddToCartButton product={product} />
              </Stack>
            </CardActions>
          </Stack>
        </Card>
      </motion.div>
    </Grid>
  );
}