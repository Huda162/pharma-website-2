import { useEffect, useState } from "react";
import { useTheme } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Routers from "./Routers";
import i18n from "./i18n/i18n";
import ScrollToTop from "./components/ScrollToTop";
import { ToastContainer } from "react-toastify";
import { CartDrawerProvider } from "./context/CartDrawerContext";
// import '@coreui/coreui/dist/css/coreui.min.css'

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    marginTop: theme.spacing(4),
  },
  title: {
    marginBottom: theme.spacing(2),
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(2),
    marginTop: theme.spacing(4),
  },
}));

function LandingPage() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h4" className={classes.title}>
        Welcome to My Website
      </Typography>
      <Typography variant="body1">
        Please choose an option to get started:
      </Typography>
      <div className={classes.buttonContainer}>
        <Button
          variant="contained"
          color="primary"
          component="a"
          href="https://alanqa.ps/home-screen"
          target="_blank"
          rel="noopener noreferrer"
        >
          Go to Website
        </Button>
        <Button
          variant="contained"
          color="secondary"
          component="a"
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact WhatsApp
        </Button>
      </div>
    </div>
  );
}

function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);
  const theme = useTheme();
  document.body.dir = i18n.dir();
  const lng = localStorage.getItem("language");

  useEffect(() => {
    localStorage.setItem("i18nextLng", "ar");
    i18n.changeLanguage(lng);
    document.body.dir = i18n.dir();
    theme.direction = i18n.dir();
  }, [lng, theme]);

  // Conditionally render the landing page or the Routers component
  return (
    <>
      <ScrollToTop />
      <CartDrawerProvider>
        <Routers />
      </CartDrawerProvider>
      <ToastContainer />
    </>
  );
}

export default App;
