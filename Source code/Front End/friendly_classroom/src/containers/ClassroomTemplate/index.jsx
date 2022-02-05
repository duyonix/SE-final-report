import React from "react";
import { Route } from "react-router";
import Footer from "../../components/Footer";
import NavbarClassroom from "../../components/NavbarClassroom";
import { Redirect } from "react-router-dom";

function LayoutClassroom(props) {
  return (
    <React.Fragment>
      <NavbarClassroom />
      {props.children}
      <Footer />
    </React.Fragment>
  );
}

export default function ClassroomTemplate({ Component, ...props }) {
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
            <LayoutClassroom>
              <Component {...propsComponent} />
            </LayoutClassroom>
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
