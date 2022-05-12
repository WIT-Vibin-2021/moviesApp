import React, { useState, createContext } from "react";
import { login, signup,getAccountByEmail, postFantasyMovie } from "../api/movie-api";

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const existingToken = localStorage.getItem("token");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(existingToken);
  const [email, setEmail] = useState("");
  const [userId, setAccUserId] = useState("");
  const [userName, setAccUserName] = useState("");

  //Function to put JWT token in local storage.
  const setToken = (data) => {
    localStorage.setItem("token", data);
    setAuthToken(data);
  }

  const authenticate = async (email, password) => {
    const result = await login(email, password);
    if (result.token) {
      setToken(result.token)
      setIsAuthenticated(true);
      setEmail(email); 

      const accountUserId = await getAccountByEmail(email);
      setAccUserId(accountUserId.id);
      setAccUserName(accountUserId.firstName);
    }
  };
 
  const register = async (email, password, firstName, lastName) => {
    const result = await signup(email, password, firstName,lastName);
    console.log(result.code);
    return (result.code === 201) ? true : false;
  };

  const fantasyMoviePost = async (title, genre, language, release, time, overview) => {
    const result = await postFantasyMovie(title, genre, language, release, time, overview);
    console.log(result.id);
    return (result.code === 201) ? true : false;
  };

  const signout = () => {
    setTimeout(() => setIsAuthenticated(false), 100);
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authenticate,
        register,
        fantasyMoviePost,
        signout,
        email,
        userId,
        userName      
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;