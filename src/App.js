import React, { useEffect } from "react";
import {
  useTheme,
  useMediaQuery,
  Dialog,
  Divider,
  Link,
} from "@material-ui/core";
import MapViewDesktop from "./components/MapViewDesktop";
import { Alert, AlertTitle } from "@material-ui/lab";
import { fetchAllRegionsRequested } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import { DesktopLayout, MobileLayout } from "./layouts";

import Loader from "./components/Loader";
import Error from "./components/Error";

const App = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { loading, error } = useSelector((state) => state.allRegions);

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(fetchAllRegionsRequested());
  }, [dispatch]);

  return (
    <React.Fragment>
      <div style={{ width: "100vw", height: "100vh" }}>
        {loading ? (
          <Loader />
        ) : error !== "" ? (
          <Error />
        ) : isMobile ? (
          <MobileLayout>
            <MapViewDesktop />
          </MobileLayout>
        ) : (
          <DesktopLayout>
            <MapViewDesktop />
          </DesktopLayout>
        )}
      </div>
      <Dialog maxWidth="sm" fullWidth open={open} onClose={handleClose}>
        <Alert severity="warning" closeText="Cerrar" onClose={handleClose}>
          <AlertTitle>
            <strong>Sin mantenimiento</strong>
          </AlertTitle>
          Esta página ya no se encuentra actualizada debido a que la{" "}
          <strong>API oficial del Gobierno del Perú</strong> ha sido cerrada.
          <Divider style={{ margin: "10px 0" }} />
          <p>
            <strong>Source code:</strong> front, back
          </p>
          <p>
            <strong>Developers:</strong>{" "}
            <Link target="_blank" href="https://github.com/BryanVe">
              @BryanVe
            </Link>
            ,{" "}
            <Link target="_blank" href="https://github.com/AnthonyLzq">
              @AnthonyLzq
            </Link>
          </p>
        </Alert>
      </Dialog>
    </React.Fragment>
  );
};

export default App;
