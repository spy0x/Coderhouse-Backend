import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Stack, Typography } from "@mui/material";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ maxWidth: 445, height: "100%", mx: 'auto' }}>
        <Stack justifyContent="space-between" height="100%">
          <Box>
            <CardMedia
              component="img"
              alt={product.title}
              height="140"
              image={product.thumbnail && product.thumbnail.length > 0 ? product.thumbnail[0] : "/assets/img/product_sample.png"}
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
            <Button variant='outlined' size="large" sx={{display: 'block', marginLeft: 'auto'}}>Add to Cart</Button>
          </CardActions>
        </Stack>
      </Card>
    </Grid>
  );
}
