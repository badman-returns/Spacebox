import React, { useEffect, useState} from 'react';
import { Route } from 'react-router-dom'
import * as jwt from "jsonwebtoken";
import { useHistory } from "react-router-dom";

const Protector = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  const history = useHistory();
  useEffect(() => {
    let token = sessionStorage.getItem('token')
        if(token){
          let tokenData = jwt.decode(token)
          let tokenExpiration = tokenData.exp;
          let dateNow = new Date();
            if(token.active === true && tokenExpiration < dateNow.getTime()/1000){
                setIsAuthenticated(false)
            }else{
                setIsAuthenticated(true)
            }
        } else {
           setIsAuthenticated(false)
        }
  }, [])

  if(isAuthenticated === null){
    return <></>
  }

  const redirectToLogin = () =>{
     history.push('/login');
      window.location.reload();
  }

  return(
    <>
    {!isAuthenticated?(
      <>{
     redirectToLogin()
      }</>
    ) : <Route exact={props.exact} path={props.path}> {props.children}</Route>}
    </>
  )
};

export default Protector;