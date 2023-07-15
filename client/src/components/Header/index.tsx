import { useState, MouseEvent } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import { useAuth } from "../../hooks/useAuth";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { ButtonsHeader } from "./components/Buttons";
import { LogoHeader } from "./components/Logo";

export const Header = () => {
  const isAuth = useAuth();

  const [open, setOpen] = useState(false);
  const { userData } = useTypedSelector((state) => state.user);
  const toggleDrawer =
    (open: boolean) => (e: MouseEvent<HTMLButtonElement | SVGSVGElement>) => {
      if (e.type === "keydown" && (e.altKey || e.shiftKey)) return;
      setOpen(open);
    };
  const buttons = <ButtonsHeader toggleDrawer={toggleDrawer} />;

  return (
    <AppBar position="fixed">
      <Container maxWidth="lg" disableGutters={true}>
        <Toolbar sx={{ justifyContent: "flex-end" }}>
          {userData && isAuth && (
            <LogoHeader text={userData.fullName} toggleDrawer={toggleDrawer} />
          )}
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              columnGap: "10px",
            }}
          >
            {buttons}
          </Box>
          <IconButton
            sx={{
              display: {
                xs: "block",
                sm: "none",
              },
            }}
            onClick={toggleDrawer(true)}
            aria-label="open drawer"
          >
            <MenuIcon sx={{ color: "#fff" }} />
          </IconButton>
          <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
            <Box
              sx={{
                p: 2,
                height: 1,
                backgroundColor: "#dbc8ff",
              }}
            >
              <IconButton
                onClick={toggleDrawer(false)}
                sx={{ mb: 2, backgroundColor: "inherit" }}
              >
                <CloseIcon />
              </IconButton>
              <Divider sx={{ mb: 2 }} />
              <Box
                sx={{
                  display: "flex",
                  rowGap: "10px",
                  flexDirection: "column",
                }}
              >
                {buttons}
              </Box>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
