import React, { useContext } from "react";

import { Redirect, Route } from "react-router-dom";

import { UserContext} from '../AuthContext/AuthContext';

const ProtectedRoutes = ({ component: Component, path, exact }) => {

  const { user } = useContext(UserContext);

  return user ? <Route path={path} exact={exact} component={Component} /> : <Redirect to="/login" />;
};


export default ProtectedRoutes;
