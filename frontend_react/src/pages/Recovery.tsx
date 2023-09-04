import { Container } from "@mui/material";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import RecoveryForm from "../components/RecoveryForm";
import TitlePage from "../components/TitlePage";
import NewPassForm from "../components/NewPassForm";

export default function Recovery() {
  const [loading, setLoading] = useState(false);
  
  const urlParams = new URLSearchParams(useLocation().search);
  const code = urlParams.get("code");

  return (
    <Container sx={{ p: 5 }}>
      <TitlePage title="Password Recovery" />
      {code ? (
        <NewPassForm setLoading={setLoading} code={code} />
      ) : (
        <RecoveryForm setLoading={setLoading}/>
      )}
      <Loading loading={loading} />
    </Container>
  );
}
