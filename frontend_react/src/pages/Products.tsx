import { CircularProgress, Container, Stack, Typography, Grid } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const getProducts = async () => {
    setLoadingProducts(true);
    const apiUrl = import.meta.env.VITE_URL;
    const response = await fetch(`${apiUrl}/api/products`);
    const data = await response.json();
    setLoadingProducts(false);
    setProducts(data.payload);
    console.log(data.payload);
  };

  useLayoutEffect(() => {
    getProducts();
    document.title = "Products | Los Tres Primos";
  }, []);

  if (loadingProducts)
    return (
      <Stack height="50vh" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Stack>
    );
  return (
    <Container disableGutters maxWidth={false}>
      <Typography display="block" mx="auto" align="center" variant="h1">
        Products
      </Typography>
      <Grid p={3} container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
        {products && products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
    </Container>
  );
}
