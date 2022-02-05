import React, { Fragment } from "react";
import { Route } from "react-router";
import NavbarHome from "../../components/NavbarHome";
import Footer from "../../components/Footer";
import { Redirect } from "react-router-dom";

function LayoutHome(props) {
  return (
    <Fragment>
      <NavbarHome />
      {props.children}
      <Footer />
    </Fragment>
  );
}

export default function HomeTemplate({ Component, ...props }) {
  let isLogin = false;
  if (localStorage.getItem("User")) {
    isLogin = true;
  }

  return (
    <Route
      {...props}
      render={(propsComponent) => {
        if (isLogin) {
          return (
            <LayoutHome>
              <Component {...propsComponent} />
            </LayoutHome>
          );
        } else {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: propsComponent.location },
              }}
            />
          );
        }
      }}
    />
  );
}
