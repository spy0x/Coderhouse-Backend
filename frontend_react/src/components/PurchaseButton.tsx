import { Button } from "@mui/material";
import Loading from "./Loading";
import { useState } from "react";
import Swal from "sweetalert2";

export default function PurchaseButton({ currentUser }: { currentUser: User }) {
  const [loading, setLoading] = useState(false);

  const handlePurchase = () => {
    setLoading(true);
    fetch(`/api/carts/${currentUser.cartId._id}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setLoading(false);
        if (result.status === "nostock" || result.status === "empty") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: result.message,
            customClass: {
              popup: "swal-background", // Apply your custom class here
            },
          });
        } else if (result.status === "success") {
          Swal.fire({
            icon: "success",
            timer: 2500,
            title: "Redirecting to Products Page...",
            text: "Purchase successful!",
            allowOutsideClick: false,
            timerProgressBar: true,
            customClass: {
              popup: "swal-background", // Apply your custom class here
            },
            didOpen: () => {
              Swal.showLoading();
            },
            willClose: () => {
              // Redirect to another URL after the specified time
              window.location.href = "/products";
            },
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Couldn't purchase items. Try again later!",
            customClass: {
              popup: "swal-background", // Apply your custom class here
            },
          });
        }
      })
      .catch(() => {
        setLoading(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          customClass: {
            popup: "swal-background", // Apply your custom class here
          },
        });
      });
  };

  return (
    <>
      <Button variant="contained" onClick={handlePurchase}>
        Purchase
      </Button>
      <Loading loading={loading} />
    </>
  );
}
