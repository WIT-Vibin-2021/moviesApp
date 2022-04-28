import React, { useState,useContext  } from "react";
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
import { AuthContext } from "../../contexts/authContext";
const useStyles = makeStyles((theme) => ({
  root: {      
    backgroundColor:"#FFFFFF",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "rgb(3,37,65)",
    fontFamily:"sans-serif",
    fontWeight:"bold",
  },
  logo:{
    width:200 
  },
  offset: theme.mixins.toolbar,  
  input: {
    color: "#28BAD2",    
  },
  searchButton: {        
    color: "#28BAD2",    
  },  
}));

const SiteHeader = () => {  
  const classes = useStyles();
  const  history = useHistory()
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorTVEl, setAnchorTVEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const authcontext = useContext(AuthContext)

  
  const open = Boolean(anchorEl);
  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Fantasy Movies", path: "/fantasymovies" },  
    { label: "Populat Tv Shows", path: "/tvshows/popular" },          
    { label: "Login", path: "/login" },          
  ];

  const handleMenuSelect = (pageURL) => {
    history.push(pageURL);
  };
    
  function handleClick(event) {
    if (anchorEl !== event.currentTarget) {
      setAnchorEl(event.currentTarget);
    }
  }

  function handleTVClick(event) {
    if (anchorTVEl !== event.currentTarget) {
      setAnchorTVEl(event.currentTarget);
    }
  }

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTVClose = () => {
    setAnchorTVEl(null);
  };

  const logoutFunction= (e) =>{  
    console.log(authcontext)
    if(authcontext != null) {
      if (authcontext.isAuthenticated === true) {
          authcontext.signout();          
      }
    }
  }
  const LogoutButtonVisibility = () => {
    if(authcontext != null)    
      if(authcontext.isAuthenticated)
      {
          return  <><Button id="logoutBtn" color="inherit"
                    aria-owns={anchorEl ? "simple-menu3" : undefined}
                    aria-haspopup="true"
                    onClick={() => logoutFunction()}                      
                  >
                  <b>LogOut</b>
                  </Button> Welcome ! {authcontext.userName}</>            
      }    
  }
  const LoginButtonVisibility = () => {
    if(authcontext != null)    
      if(!authcontext.isAuthenticated)
      {
        return  <Button  id="loginBtn" color="inherit"
                  aria-owns={anchorEl ? "simple-menu3" : undefined}
                  aria-haspopup="true"
                  onClick={() => handleMenuSelect( "/login")}             
                >
                <b>Login</b>
                </Button>
      }    
  }  
  const routeChange = () =>{ 
    var name = document.getElementById("search").value
    let path = `/search/` +name; 
    history.push(path);
  }
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      var name = document.getElementById("search").value
      let path = `/search/` +name; 
      history.push(path);
    }
  }

  return (     
    <div>
      <AppBar className={classes.root}
      position="fixed" elevation={0} color='primary'> 
        <Toolbar className={classes.root}>
          <Typography variant="h4" >           
            <div className={classes.logo}>
              <img src={tmdbLogo} alt="React Logo" onClick={() => handleMenuSelect( "/")}/>
            </div>
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
              <div>                                              
                <Button  color="inherit"
                      id="fade-buttonHome"
                      onClick={() => handleMenuSelect( "/")}
                >
                  <b>Home</b>
                </Button>


                <Button  color="inherit"
                  aria-owns={anchorEl ? "simple-menu" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                  onMouseOver={handleClick}
                >
                <b> Movies</b>
                </Button>                
                <Menu   
                  disableScrollLock={true}
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  MenuListProps={{ onMouseLeave: handleClose }}
                >
                  <MenuItem onClick={() => handleMenuSelect( "/movies/upcoming")}>Upcoming</MenuItem>
                  <MenuItem onClick={() => handleMenuSelect( "/movies/favourites")}>Favorites</MenuItem>
                  <MenuItem onClick={() => handleMenuSelect( "/movies/toprated")}>Top-Rated</MenuItem>                                 
                  <MenuItem onClick={() => handleMenuSelect( "/fantasymovies")}>Fantasy Movie Making</MenuItem>
                </Menu> 
                
                {/* ------------------------  */}
                <Button  color="inherit"
                  aria-owns={anchorEl ? "simple-menu2" : undefined}
                  aria-haspopup="true"
                  onClick={handleTVClick}
                  onMouseOver={handleTVClick}
                >
                <b> TV Shows</b>
                </Button>            
                <Menu   
                  disableScrollLock={true}
                  id="simple-menu2"
                  anchorEl={anchorTVEl}
                  open={Boolean(anchorTVEl)}
                  onClose={handleTVClose}
                  MenuListProps={{ onMouseLeave: handleTVClose }}                  
                >
                  <MenuItem onClick={() => handleMenuSelect( "/tvshows/popular")}>Popular</MenuItem>                                                 
                </Menu>                 
                {/* ------------------------  */}
                {/* <Button  id="loginBtn" color="inherit"
                  aria-owns={anchorEl ? "simple-menu3" : undefined}
                  aria-haspopup="true"
                  onClick={() => handleMenuSelect( "/login")}             
                >
                <b>Login</b>
                </Button> 
                <Button id="logoutBtn" color="inherit"
                  aria-owns={anchorEl ? "simple-menu3" : undefined}
                  aria-haspopup="true"
                  onClick={() => logoutFunction()}                      
                >
                <b>LogOut</b>
                </Button>    */}
                {LogoutButtonVisibility()}
                {LoginButtonVisibility()}
              </div>
            </>
          )}
          <Typography  variant="h6" className={classes.search}>             
            <Input id ="search" className={classes.input}  placeholder="Movies Search" onKeyDown={handleKeyDown} />
            <IconButton className={classes.searchButton} type="submit" sx={{ p: '5px' }} aria-label="search"
            onClick={routeChange}>   
              <SearchIcon />            
            </IconButton>      
            {/* <Button className={classes.searchButton} variant="outlined" startIcon={<SearchIcon />} onClick={routeChange}/> */}
          </Typography>

        </Toolbar>       
      </AppBar>      
    </div>
  );
};

export default SiteHeader;