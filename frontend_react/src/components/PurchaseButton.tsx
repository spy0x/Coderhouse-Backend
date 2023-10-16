import { Button } from "@mui/material";
import Swal from "sweetalert2";

type PurchaseButtonPropsType = {
  currentUser: User;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function PurchaseButton({ currentUser, setLoading }: PurchaseButtonPropsType) {
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
            title: "Purchase successful!",
            text: "Thank you!",
            showConfirmButton: true,
            confirmButtonText: "View Orders",
            showCancelButton: true,
            cancelButtonText: "Continue Shopping!",
            customClass: {
              popup: "swal-background", // Apply your custom class here
            },
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.href = "/orders";
            }
            else if (result.isDismissed) {
              window.location.href = "/products";
            }
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
    <Button variant="contained" onClick={handlePurchase}>
      Purchase
    </Button>
  );
}
