import { Button } from "@mui/material";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext";
import Swal from "sweetalert2";
import Loading from "./Loading";

export default function AddToCartButton({ product }: { product: Product }) {
  const { currentUser } = useContext(UserContext) as UserContextType;
  const [loading, setLoading] = useState(false);
  const [cartId] = useState(currentUser?.cartId._id);

  const handleClick = async () => {
    try {
      if (!currentUser) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You must be logged in to add products to cart!",
          cancelButtonText: "Close",
          customClass: {
            popup: "swal-background",
          },
        });
        return;
      }
      setLoading(true);
      const response = await fetch(`/api/carts/${cartId}/product/${product._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      setLoading(false);
      const result = await Swal.fire({
        icon: response.status == 202 ? "success" : "error",
        title: response.status == 202 ? "Success!" : "Oops...",
        text: response.status == 202 ? "Product added to cart!" : "Something went wrong!",
        showCancelButton: true,
        confirmButtonText: response.status == 202 ? "View Cart" : undefined,
        cancelButtonText: "Close",
        customClass: {
          popup: "swal-background", // Apply your custom class here
        },
      });
      if (result.isConfirmed) {
        // Redirect to the cart URL
        window.location.href = `/carts/${cartId}`;
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        customClass: {
          popup: "swal-background", // Apply your custom class here
        },
      });
    }
  };
  return (
    <>
      <Button onClick={handleClick} variant="outlined" size="large" sx={{ display: "block", marginLeft: "auto" }}>
        Add to Cart
      </Button>
      <Loading loading={loading} />
    </>
  );
}
