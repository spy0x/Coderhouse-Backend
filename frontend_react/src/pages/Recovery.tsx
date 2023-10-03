import { Container } from "@mui/material";
import { useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import RecoveryForm from "../components/RecoveryForm";
import TitlePage from "../components/TitlePage";
import NewPassForm from "../components/NewPassForm";
import Swal from "sweetalert2";

export default function Recovery() {
  const [loading, setLoading] = useState(false);
  const [codeExists, setCodeExists] = useState(false);

  const urlParams = new URLSearchParams(useLocation().search);
  const code = urlParams.get("code") as string;

  useLayoutEffect(() => {
    const ticketExists = async () => {
      setLoading(true);
      const apiUrl = import.meta.env.VITE_URL;
      const response = await fetch(`${apiUrl}/api/users/recovery`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });
      setLoading(false);
      if (response.status != 200) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "The recovery link is invalid or has expired. Please enter your email again to receive a new link.",
          customClass: {
            popup: "swal-background", // Apply your custom class here
          },
        });
      } else {
        setCodeExists(true);
      }
    };
    if (code) ticketExists();
  }, []);

  return (
    <Container sx={{ p: 5 }}>
      <TitlePage title="Password Recovery" />
      {codeExists ? <NewPassForm setLoading={setLoading} code={code} /> : <RecoveryForm setLoading={setLoading} />}
      <Loading loading={loading} />
    </Container>
  );
}
