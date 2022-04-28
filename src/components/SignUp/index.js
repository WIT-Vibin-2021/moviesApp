import React, { useContext, useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import Fab from "@material-ui/core/Fab";  

const useStyles = makeStyles((theme) => ({
  

  formControl: {     
    margin: theme.spacing(5),
    minWidth: 220,         
    backgroundColor: "rgb(232,232,232)",        
  },    
  formbutton: {     
    margin: theme.spacing(5),
    minWidth: 220,        
  },   
}));

const LoginPage = props => {
  const classes = useStyles();
  const context = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    context.authenticate(email, password);
  };

//   const { from } = props.location.state || { from: { pathname: "/" } };
  
  console.log(context)

//   if (context.isAuthenticated === true) {
//     return <Redirect to={"/"} />;
//   }
  return (
    <>                
    <div class="row">
    <div class="col s12 m6" >
      <CardContent className={classes.formControl}><br/>
        <Typography variant="h5" component="h1"className={classes.formControl}>            
        Sign Up Details
        </Typography>      
        <FormControl className={classes.formControl}>          
          <TextField                      
            id="firstName"
            label="First Name"
            type="Name"                            
          />    <br></br>
          <TextField                      
            id="E-mail"
            label="E-Mail"
            type="email"                            
          />   
        </FormControl> 
        <FormControl className={classes.formControl}>  
        <TextField                      
            id="LastName"
            label="Last Name"
            type="Name"                            
          />           <br></br>
          <TextField                      
            id="password"
            label="Password"
            type="password"                            
          />    
          
        </FormControl>             
        <br/>     
        <Fab className={classes.formbutton}
        color="secondary"
        variant="extended">        
          Sign Up
        </Fab>
      </CardContent>   
    </div>
</div>
</> 
  );
};

export default LoginPage;