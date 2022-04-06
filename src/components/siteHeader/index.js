import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import { useHistory,Link } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import tmdbLogo from "../../images/tmdb.svg"
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1,    
  },
  logo:{
    width:200
  },
  appbar: {
    backgroundColor: "rgb(3,37,65)",
  },
  offset: theme.mixins.toolbar,  
  input: {
    //background: "white",
    color: "#28BAD2",
    width:"200px"
  },
  searchButton: {    
    color: "#28BAD2",    
  }
}));

const SiteHeader = () => {  
  const classes = useStyles();
  const  history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const open = Boolean(anchorEl);
  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Top-Rated", path: "/movies/toprated" },    
    { label: "Option 4", path: "/" },
  ];

  const handleMenuSelect = (pageURL) => {
    history.push(pageURL);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

const routeChange = () =>{ 
  var name = document.getElementById("search").value
  let path = `/search/` +name; 
  history.push(path);
}
  return (     
    <>
      <AppBar className={classes.appbar}
      position="fixed" elevation={0} color='primary'> 
        <Toolbar>
          <Typography variant="h4" className={classes.title}>           
            <div className={classes.logo}>
              <img src={tmdbLogo} alt="React Logo" />
            </div>
          </Typography>
          <Typography variant="h6" className={classes.title}>             
            <Input id ="search" className={classes.input}  placeholder="Movies Search" />
            <IconButton className={classes.searchButton} type="submit" sx={{ p: '5px' }} aria-label="search"
            onClick={routeChange}>   
              <SearchIcon />            
            </IconButton>      
            {/* <Button className={classes.searchButton} variant="outlined" startIcon={<SearchIcon />} onClick={routeChange}/> */}
          </Typography>
          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
              <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  color="inherit"
                  onClick={() => handleMenuSelect(opt.path)}
                >
                  {opt.label}
                </Button>
              ))}
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default SiteHeader;