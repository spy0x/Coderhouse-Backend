import { CircularProgress, Container, Stack, Grid, Pagination } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import TitlePage from "../components/TitlePage";

export default function Products() {
  const [products, setProducts] = useState<ProductsQuery>();
  const [loadingProducts, setLoadingProducts] = useState(false);
  const urlParams = new URLSearchParams(useLocation().search);
  const limit = urlParams.get("limit") || "4";
  const page = urlParams.get("page") || "1";
  const query = urlParams.get("query") ? `&query=${urlParams.get("query")}` : "";
  const sort = urlParams.get("sort") ? `&sort=${urlParams.get("sort")}` : "";

  const getProducts = async (pag: string = page ) => {
    setLoadingProducts(true);
    const apiUrl = import.meta.env.VITE_URL;
    const response = await fetch(`${apiUrl}/api/products?limit=${limit}&page=${pag}${sort}${query}`);
    const data = await response.json();
    setLoadingProducts(false);
    setProducts(data);
  };

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    // @ts-ignore
    const target = event.target;

    if (value == products?.page) return;
    getProducts(value.toString());
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
    <Container maxWidth={false} sx={{ p: { xs: 1, sm: 1, md: 5 } }}>
      <TitlePage title="Products" />
      <Grid p={3} container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
        {products && products.payload.map((product) => <ProductCard key={product._id} product={product} />)}
      </Grid>
      {products && (
        <Stack my={2} spacing={2} alignItems='center'>
          <Pagination count={products?.totalPages} page={products?.page} onChange={handleChangePage}/>
        </Stack>
      )}
    </Container>
  );
}
