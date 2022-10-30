import "./App.css";
import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AssessmentIcon from "@material-ui/icons/Assessment";
import ReceiptIcon from "@material-ui/icons/Receipt";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useNavigate, NavLink } from "react-router-dom";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import Router from "./components/Router";
import { Avatar } from "@material-ui/core";
import apis from "./apis";

const useStyles = makeStyles((theme) => {
  return {
    root: { display: "flex", flexGrow: 1 },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    },
    list: {
      width: 250
    },
    fullList: {
      width: "auto"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 101
    },
    drawer: {
      width: 250,
      flexShrink: 0
    },
    drawerPaper: {
      width: 250
    },
    drawerContainer: {
      overflow: "auto"
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    navLink: {
      textDecoration: "none",
      color: "inherit"
    },
    icon: {
      width: theme.spacing(4),
      height: theme.spacing(4),
      backgroundColor: "inherit"
    }
  };
});

function App() {
  const isScreenSmall = useMediaQuery("(max-width:1024px)");
  const [selectedNavLink, setSelectedNavLink] = useState("");
  const [greeting, setGreeting] = useState("");
  const classes = useStyles();
  const navigate = useNavigate();
  const [state, setState] = useState({
    left: false
  });

  const myDate = new Date();
  const hrs = myDate.getHours();

  useEffect(() => {
    const authenticate = async () => {
      try {
        const res = await fetch("/api/auth");
        if (!res.ok) {
          navigate("/signin");
        } else if (res.ok) {
          const jsonRes = await res.json();
          greet(jsonRes.user);
        }
      } catch (error) {
        console.log(error);
      }
    };
    authenticate();
  });

  const greet = (user) => {
    if (hrs < 12) setGreeting(`Good Morning, ${user.username}`);
    else if (hrs >= 12 && hrs <= 17)
      setGreeting(`Good Afternoon, ${user.username}`);
    else if (hrs >= 17 && hrs <= 24)
      setGreeting(`Good Evening, ${user.username}`);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <>
      <div
        className={clsx(classes.list, {
          [classes.fullList]: anchor === "top" || anchor === "bottom"
        })}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <Toolbar />
        {drawerItems()}
        <Divider />
      </div>
    </>
  );

  const drawerItems = () => (
    <List>
      <NavLink
        to="receipts"
        onClick={() => {
          setSelectedNavLink("receipts");
        }}
        className={classes.navLink}
      >
        <ListItem
          button
          key="Receipts"
          selected={selectedNavLink === "receipts"}
        >
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>
          <ListItemText primary="Receipts" />
        </ListItem>
      </NavLink>
      <NavLink
        to="sales"
        onClick={() => {
          setSelectedNavLink("sales");
        }}
        className={classes.navLink}
      >
        <ListItem button key="Sales" selected={selectedNavLink === "sales"}>
          <ListItemIcon>
            <MonetizationOnIcon />
          </ListItemIcon>
          <ListItemText primary="Sales" />
        </ListItem>
      </NavLink>
      <NavLink
        to="reports"
        onClick={() => {
          setSelectedNavLink("reports");
        }}
        className={classes.navLink}
      >
        <ListItem button key="Reports" selected={selectedNavLink === "reports"}>
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Reports" />
        </ListItem>
      </NavLink>
    </List>
  );

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {isScreenSmall ? (
            <IconButton
              onClick={toggleDrawer("left", !state["left"])}
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <Avatar className={classes.icon}>
                <LibraryBooksOutlinedIcon />
              </Avatar>
            </IconButton>
          )}
          <Typography variant="h6" className={classes.title}>
            Accounting In
          </Typography>

          {!isScreenSmall ? (
            <Typography variant="subtitle1">
              <div style={{ margin: "0px 20px" }}>{greeting}</div>
            </Typography>
          ) : null}
          <Button
            onClick={() => {
              fetch(apis.auth.logout).then((res) => {
                if (res.ok) {
                  navigate("/signin");
                }
              });
            }}
            variant="contained"
            color="default"
            size="small"
          >
            Log Out
          </Button>
        </Toolbar>
      </AppBar>
      {isScreenSmall ? (
        <SwipeableDrawer
          anchor={"left"}
          open={state["left"]}
          onClose={toggleDrawer("left", false)}
          onOpen={toggleDrawer("left", true)}
        >
          {list("left")}
        </SwipeableDrawer>
      ) : (
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <Toolbar />
          {drawerItems()}
          <Divider />
        </Drawer>
      )}

      <main className={classes.content}>
        <Toolbar />
        <Router />
      </main>
    </div>
  );
}

export default App;
