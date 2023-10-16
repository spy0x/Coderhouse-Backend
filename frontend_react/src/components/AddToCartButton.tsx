import { Button, useMediaQuery } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import Swal from "sweetalert2";
import Loading from "./Loading";

export default function AddToCartButton({ product }: { product: Product }) {
  const { currentUser, updateCurrentUser } = useContext(UserContext) as UserContextType;
  const [loading, setLoading] = useState(false);
  const [cartId, setCartId] = useState(currentUser?.cartId._id);

  useEffect(() => {
    setCartId(currentUser?.cartId._id);
  }, [currentUser]);

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
      if (response.status == 202) {
        updateCurrentUser();
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Product added to cart!",
          showCancelButton: true,
          confirmButtonText: "View Cart",
          cancelButtonText: "Close",
          customClass: {
            popup: "swal-background", // Apply your custom class here
          },
        }).then((result) => {
          if (result.isConfirmed) {
            // Redirect to the cart URL
            window.location.href = `/carts/${cartId}`;
          }
        });
      } else if (response.status == 403) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You can't add your own product to cart!",
          cancelButtonText: "Close",
          customClass: {
            popup: "swal-background", // Apply your custom class here
          },
        });
      } else if (response.status == 404) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This product is already in your cart!",
          cancelButtonText: "Close",
          customClass: {
            popup: "swal-background", // Apply your custom class here
          },
        });
      } else if (response.status == 409) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "You've already purchased this before. Search in your orders!",
          cancelButtonText: "Close",
          customClass: {
            popup: "swal-background", // Apply your custom class here
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          cancelButtonText: "Close",
          customClass: {
            popup: "swal-background", // Apply your custom class here
          },
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Try again later!",
        customClass: {
          popup: "swal-background", // Apply your custom class here
        },
      });
    }
  };
  const setButtonSize = () => {
    const isXs = useMediaQuery("(max-width: 1536px)");
    return isXs ? "small" : "large";
  };
  return (
    <>
      <Button onClick={handleClick} variant="outlined" size={setButtonSize()} sx={{ display: "block", marginLeft: "auto" }}>
        Add to Cart
      </Button>
      <Loading loading={loading} />
    </>
  );
}
