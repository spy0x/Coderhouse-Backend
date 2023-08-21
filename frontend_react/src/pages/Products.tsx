import { CircularProgress, Container, Stack, Grid } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import TitlePage from "../components/TitlePage";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const urlParams = new URLSearchParams(useLocation().search);
  const limit = urlParams.get("limit") || 10;
  const page = urlParams.get("page") || 1;
  const query = urlParams.get("query") ? `&query=${urlParams.get("query")}` : "";
  const sort = urlParams.get("sort") ? `&sort=${urlParams.get("sort")}` : "";


  const getProducts = async () => {
    setLoadingProducts(true);
    const apiUrl = import.meta.env.VITE_URL;
    const response = await fetch(`${apiUrl}/api/products?limit=${limit}&page=${page}${sort}${query}`);
    const data = await response.json();
    setLoadingProducts(false);
    setProducts(data.payload);
    console.log(data);
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
    <Container disableGutters maxWidth={false} sx={{p:5}}>
      <TitlePage title="Products"/>
      <Grid p={3} container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
        {products && products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </Grid>
    </Container>
  );
}
