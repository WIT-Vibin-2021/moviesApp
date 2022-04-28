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

const SignUpPage = props => {
  const classes = useStyles();
  const context = useContext(AuthContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [registered, setRegistered] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const register = () => {
    if (password.length > 0 && password === passwordAgain) {
      console.log("reg")
      context.register(email, password, firstName, lastName);
      setRegistered(true);
    }
  }

   //const { from } = props.location.state || { from: { pathname: "/" } };
   if (registered === true) {
    return <Redirect to="./login" />;
  }
  
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
            id="email"
            value={email}
            label="E-Mail"
            type="email"
            onChange={e => {
              setEmail(e.target.value);
            }} 
            required                             
          />     <br/>    
        <TextField                      
            id="firstName"
            value={firstName}
            label="First Name"
            type="Name"  
            onChange={e => {
              setFirstName(e.target.value);
            }} 
            required                           
          /><br/>
          <TextField                      
            id="lastName" value={lastName}
            label="Last Name"
            type="Name"
            onChange={e => {
              setLastName(e.target.value);
            }} 
            required                             
          />  
           </FormControl>
        <FormControl className={classes.formControl}>                             
          <TextField                      
            id="password" type="password" value={password} onChange={e => {
              setPassword(e.target.value);
            }} required 
            label="Password"            
          /> <br/>
          <TextField                      
            id="passwordagain" type="password" value={passwordAgain} onChange={e => {
              setPasswordAgain(e.target.value);
            }} required
            label="Re- Enter Password"            
          />    
          
        </FormControl>             
        <br/>     
        <Fab className={classes.formbutton}
        color="secondary"
        variant="extended"
        onClick={register}
        >        
          Sign Up
        </Fab>
      </CardContent>   
    </div>
</div>
</> 
  );
};

export default SignUpPage;