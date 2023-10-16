import {
  CircularProgress,
  Container,
  Stack,
  Grid,
  Pagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useLocation } from "react-router-dom";
import TitlePage from "../components/TitlePage";

export default function Products() {
  const urlParams = new URLSearchParams(useLocation().search);
  const [products, setProducts] = useState<ProductsQuery>();
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [category, setCategory] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [sort, setSort] = useState(urlParams.get("sort") ? `&sort=${urlParams.get("sort")}` : "");
  const [query, setQuery] = useState(urlParams.get("query") ? `&query=${urlParams.get("query")}` : "");
  const categories = ["Characters", "Environment", "Props", "Vehicles"];
  const limit = urlParams.get("limit") || "4";
  const page = urlParams.get("page") || "1";

  const getProducts = async (pag: string = page) => {
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

  useEffect(() => {
    getProducts();
  },[query, sort]);

  const handleChangeCategory = (event: SelectChangeEvent<string>) => {
    setCategory(event.target.value as string);
    setQuery(`&query=${event.target.value}`);
  };

  const handleChangeSort = (event: SelectChangeEvent<string>) => {
    setSortPrice(event.target.value as string);
    setSort(`&sort=${event.target.value}`);
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
      <Stack direction="row" justifyContent="end" alignItems="center" spacing={2} marginX={3} mt={3}>
        <FormControl>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            sx={{ width: { xs: "150px", md: "200px" } }}
            labelId="category-label"
            id="category"
            value={category}
            label="Category"
            onChange={handleChangeCategory}
          >
            <MenuItem value={""}>All</MenuItem>
            {categories.map((category) => (
              <MenuItem value={category}>{category}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="sort-label">Price</InputLabel>
          <Select
            sx={{ width: { xs: "150px", md: "200px" } }}
            labelId="sort-label"
            id="sort-price"
            value={sortPrice}
            label="Price"
            onChange={handleChangeSort}
          >
            <MenuItem value={""}>None</MenuItem>
            <MenuItem value={"asc"}>Low to High</MenuItem>
            <MenuItem value={"desc"}>High to Low</MenuItem>
          </Select>
        </FormControl>
      </Stack>
      <Grid p={3} container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
        {products && products.payload.map((product) => <ProductCard key={product._id} product={product} />)}
      </Grid>
      {products && (
        <Stack my={2} spacing={2} alignItems="center">
          <Pagination count={products?.totalPages} page={products?.page} onChange={handleChangePage} />
        </Stack>
      )}
    </Container>
  );
}
