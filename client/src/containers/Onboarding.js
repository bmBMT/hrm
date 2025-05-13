import { Box } from "@mui/material";
import React from "react";
import SetupCompanyPage from "../components/SetupCompanyMenu/SetupCompanyPage";
import LoginPage from '../components/LoginComponents/LoginPage';

function Onboarding() {
  const [page, setPage] = React.useState("signup");
  return (
    <Box>
      {page === "signup" &&  <LoginPage onSubmit={()=> setPage("company-setup")}/>}
      {page === "company-setup" && <SetupCompanyPage /> }
    </Box>
  );
}
export default Onboarding;
