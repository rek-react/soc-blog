import { Suspense } from "react";
import { Container } from "@mui/system";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Loader } from "./Loader";

const Layout = () => {
  return (
    <>
      <Header />
      <Container
        sx={{
          mb: "30px",
          mt: {
            sm: "95px",
            xs: "70px",
          },
        }}
      >
        <Suspense fallback={<Loader />}>
          <Outlet />
        </Suspense>
      </Container>
    </>
  );
};
export default Layout;
